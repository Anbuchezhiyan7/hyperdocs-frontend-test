'use client'

import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { BASE_URL } from '@/lib/definitions'
import { useGitSyncStore } from '@/lib/store/useGitSyncStore'

export function GitSyncWebSocket() {
  const userId = Cookies.get('hd_user_id')

  useEffect(() => {
    if (!userId) return

    let socket: WebSocket | null = null
    let reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null
    let isCleanup = false
    let reconnectDelay = 1000

    function connect() {
      if (isCleanup) return

      const wsProto = BASE_URL.startsWith('https') ? 'wss:' : 'ws:'
      const wsHost = BASE_URL.replace(/^https?:\/\//, '')
      const wsUrl = `${wsProto}//${wsHost}/api/v1/github/ws/${userId}`

      console.log('[WebSocket] Connecting to:', wsUrl)
      const ws = new WebSocket(wsUrl)
      socket = ws

      ws.onopen = () => {
        console.log('[WebSocket] Connected successfully to:', wsUrl)
        reconnectDelay = 1000 // Reset reconnect delay on success
      }

      ws.onmessage = (event) => {
        console.log('[WebSocket] Received message:', event.data)
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'github_changes_detected') {
            console.log('[WebSocket] Detected GitHub changes event:', data)
            useGitSyncStore.getState().setHasChangesDetected(true)
          }
        } catch (err) {
          console.error('[WebSocket] Error parsing message:', err)
        }
      }

      ws.onerror = (error) => {
        console.error('[WebSocket] Connection error:', error)
      }

      ws.onclose = (event) => {
        console.log(`[WebSocket] Connection closed (code: ${event.code}, reason: ${event.reason || 'none'})`)
        socket = null

        if (!isCleanup) {
          console.log(`[WebSocket] Reconnecting in ${reconnectDelay}ms...`)
          reconnectTimeoutId = setTimeout(() => {
            reconnectDelay = Math.min(reconnectDelay * 2, 10000) // Max 10 seconds backoff
            connect()
          }, reconnectDelay)
        }
      }
    }

    connect()

    return () => {
      console.log('[WebSocket] Cleaning up connection')
      isCleanup = true
      if (reconnectTimeoutId) {
        clearTimeout(reconnectTimeoutId)
      }
      if (socket) {
        socket.close()
      }
    }
  }, [userId])

  return null
}
