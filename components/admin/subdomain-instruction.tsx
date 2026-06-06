import React from 'react'
import { toast } from 'react-toastify'
import { IconCheckSuccess } from '@/components/shared/icons'
import { Copy } from 'lucide-react'

export function SubdomainInstruction({ domain }: { domain: string }) {
  // Extract subdomain part (e.g., 'docs' from 'docs.yourdomain.com')
  const parts = domain.split('.')
  const host = parts.length > 2 ? parts.slice(0, -2).join('.') : '@'
  const target = '858c3d9d2d09eed9.vercel-dns-017.com'

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: true,
      style: { fontSize: '0.82rem' },
    })
  }

  return (
    <div className="mt-6 border border-hd-border rounded-xl overflow-hidden bg-hd-bg shadow-sm">
      <div className="bg-hd-surface border-b border-hd-border px-5 py-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
        </div>
        <div>
          <h3 className="text-[0.9rem] font-bold text-hd-text m-0 mb-0.5">Configure DNS Records</h3>
          <p className="text-[0.8rem] text-hd-muted m-0">Set this CNAME record in your domain provider's DNS settings.</p>
        </div>
      </div>
      
      <div className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-hd-border">
                <th className="pb-2 font-semibold text-hd-text-soft">Type</th>
                <th className="pb-2 font-semibold text-hd-text-soft">Name</th>
                <th className="pb-2 font-semibold text-hd-text-soft">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 text-hd-text font-medium">CNAME</td>
                <td className="py-4">
                  <div className="inline-flex items-center gap-2 bg-hd-surface border border-hd-border rounded px-2.5 py-1 text-hd-text">
                    {host}
                    <button onClick={() => handleCopy(host)} className="text-hd-muted hover:text-hd-text cursor-pointer bg-transparent border-0 p-0 flex items-center">
                      <Copy size={12} />
                    </button>
                  </div>
                </td>
                <td className="py-4">
                  <div className="inline-flex items-center gap-2 bg-hd-surface border border-hd-border rounded px-2.5 py-1 text-hd-text font-mono text-[0.8rem]">
                    {target}
                    <button onClick={() => handleCopy(target)} className="text-hd-muted hover:text-hd-text cursor-pointer bg-transparent border-0 p-0 flex items-center">
                      <Copy size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 bg-blue-500/5 border border-blue-500/10 rounded-lg p-3.5 flex gap-3 text-[0.82rem] text-hd-text-soft">
          <IconCheckSuccess width="16" height="16" className="text-blue-500 shrink-0 mt-0.5" />
          <p className="m-0 leading-relaxed">
            After updating your DNS settings, it may take a few minutes (up to 48 hours in rare cases) for the changes to propagate globally.
          </p>
        </div>
      </div>
    </div>
  )
}
