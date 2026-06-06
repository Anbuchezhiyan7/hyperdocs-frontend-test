'use client'

import Image from 'next/image'
import { IconGoogle, IconSpinner } from '@/components/shared/icons'
import { useAuth } from '@/lib/auth-provider'

export default function LoginPage() {
  const { isLoading, loginWithGoogle } = useAuth()

  return (
    <div
      data-theme="light"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "var(--font-admin, 'Plus Jakarta Sans', sans-serif)",
        padding: '2rem 1.5rem',
        background: 'linear-gradient(135deg, #fff8f4 0%, #ffffff 40%, #fff3eb 70%, #ffeedd 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'fixed', top: -160, left: -160, width: 520, height: 520,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(242,101,34,0.13) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'fixed', bottom: -140, right: -140, width: 480, height: 480,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(242,101,34,0.09) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'fixed', top: '45%', left: '55%', width: 300, height: 300,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(251,160,80,0.07) 0%, transparent 70%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 400,
        background: 'rgba(255,255,255,0.72)',
        border: '1px solid rgba(242,101,34,0.14)',
        borderRadius: 20,
        padding: '2.5rem 2rem',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(242,101,34,0.06)',
      }}>
        {/* Logo + headline */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Image
            src="/images/logo.png"
            alt="Hyperdocs"
            width={160}
            height={44}
            style={{ height: 'auto', marginBottom: '1.25rem', userSelect: 'none', display: 'block', margin: '0 auto 1.25rem' }}
            priority
          />
          <h1 style={{
            fontSize: '1.65rem',
            fontWeight: 800,
            color: '#111',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            marginBottom: '0.6rem',
            textAlign: 'center',
          }}>
            Docs that stay in sync<br />
            <span style={{ color: '#f26522' }}>with your product.</span>
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#999', lineHeight: 1.65, textAlign: 'center' }}>
            Connect GitHub, publish beautiful docs —<br />
            updated automatically on every commit.
          </p>
        </div>

        {/* Google button */}
        <button
          onClick={() => loginWithGoogle()}
          disabled={isLoading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.625rem',
            height: 50,
            borderRadius: 12,
            border: '1.5px solid #e4dcd6',
            background: '#fff',
            color: '#222',
            fontSize: '0.9375rem',
            fontWeight: 600,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(242,101,34,0.06)',
            transition: 'border-color 0.15s, box-shadow 0.15s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => {
            if (!isLoading) {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.borderColor = '#f26522'
              btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08), 0 4px 20px rgba(242,101,34,0.12)'
            }
          }}
          onMouseLeave={e => {
            if (!isLoading) {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.borderColor = '#e4dcd6'
              btn.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(242,101,34,0.06)'
            }
          }}
        >
          {isLoading
            ? <IconSpinner className="w-5 h-5" style={{ color: '#f26522' }} />
            : <IconGoogle width={20} height={20} />
          }
          {isLoading ? 'Signing in…' : 'Sign in with Google'}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />

          <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
        </div>



        {/* Footer */}
        <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#bbb', textAlign: 'center', lineHeight: 1.6 }}>
          By continuing, you agree to our{' '}
          <a href="#" style={{ color: '#999', textDecoration: 'underline' }}>Terms of Service</a>
          {' '}and{' '}
          <a href="#" style={{ color: '#999', textDecoration: 'underline' }}>Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}
