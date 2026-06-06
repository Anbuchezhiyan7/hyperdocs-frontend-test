'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from '@/lib/auth-provider'
import { ReactQueryProvider } from '@/lib/query-provider'
import { ToastContainer } from 'react-toastify'
import { GOOGLE_CLIENT_ID } from '@/lib/definitions'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ReactQueryProvider>
        <AuthProvider>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="light" />
          {children}
        </AuthProvider>
      </ReactQueryProvider>
    </GoogleOAuthProvider>
  )
}
