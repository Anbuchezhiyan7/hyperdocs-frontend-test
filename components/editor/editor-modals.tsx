'use client'

import React, { useEffect, useState } from 'react'
import { useEditorRef } from 'platejs/react'
import { insertImage, insertMediaEmbed } from '@platejs/media'
import { ImagePlugin } from '@platejs/media/react'
import { ImageModal } from './image-modal'
import { EmbedModal } from './embed-modal'
import { ButtonModal, ButtonModalValues } from './button-modal'
import { apiUploadImage } from '@/lib/api/settings'
import { toast } from 'react-toastify'

export const OPEN_IMAGE_MODAL_EVENT = 'hd:open-image-modal'
export const OPEN_EMBED_MODAL_EVENT = 'hd:open-embed-modal'
export const OPEN_BUTTON_MODAL_EVENT = 'hd:open-button-modal'

export function EditorModals() {
  const editor = useEditorRef()
  const [imageOpen, setImageOpen] = useState(false)
  const [embedOpen, setEmbedOpen] = useState(false)
  const [buttonOpen, setButtonOpen] = useState(false)

  useEffect(() => {
    const onImage = () => setImageOpen(true)
    const onEmbed = () => setEmbedOpen(true)
    const onButton = () => setButtonOpen(true)
    document.addEventListener(OPEN_IMAGE_MODAL_EVENT, onImage)
    document.addEventListener(OPEN_EMBED_MODAL_EVENT, onEmbed)
    document.addEventListener(OPEN_BUTTON_MODAL_EVENT, onButton)
    return () => {
      document.removeEventListener(OPEN_IMAGE_MODAL_EVENT, onImage)
      document.removeEventListener(OPEN_EMBED_MODAL_EVENT, onEmbed)
      document.removeEventListener(OPEN_BUTTON_MODAL_EVENT, onButton)
    }
  }, [])

  function handleInsertButton(values: ButtonModalValues) {
    editor.tf.insertNodes(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { type: 'button', label: values.label, url: values.url, textColor: values.textColor, bgColor: values.bgColor, children: [{ text: '' }] } as any
    )
    requestAnimationFrame(() => editor.tf.focus())
  }

  return (
    <>
      <ImageModal
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        onInsertUrl={(url) => {
          insertImage(editor, url)
        }}
        onInsertFile={async (file) => {
          setImageOpen(false)

          // Generate a unique ID so we can find this exact node later
          const uploadId = `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`

          // Insert a loading placeholder immediately
          editor.tf.insertNodes({
            type: ImagePlugin.key,
            url: '',
            image_id: '',
            uploading: true,
            uploadId,
            children: [{ text: '' }],
          } as any)

          const res = await apiUploadImage(file)

          if (res.success) {
            // Replace placeholder with real data
            editor.tf.setNodes(
              { url: res.data.url, image_id: res.data.image_id, uploading: false } as any,
              { match: (n: any) => n.uploadId === uploadId, at: [] }
            )
          } else {
            // Remove the placeholder and show error
            editor.tf.removeNodes({ match: (n: any) => n.uploadId === uploadId, at: [] })
            toast.error(res.message || 'Image upload failed', { autoClose: 4000, style: { fontSize: '0.82rem' } })
          }
        }}
      />
      <EmbedModal
        open={embedOpen}
        onClose={() => setEmbedOpen(false)}
        onInsert={(raw) => {
          const iframeSrcMatch = raw.match(/\biframe\b[^>]*\bsrc=["']([^"']+)["']/i)
          const url = iframeSrcMatch ? iframeSrcMatch[1] : raw.trim()
          insertMediaEmbed(editor, { url })
        }}
      />
      <ButtonModal
        open={buttonOpen}
        onClose={() => setButtonOpen(false)}
        onConfirm={handleInsertButton}
      />
    </>
  )
}
