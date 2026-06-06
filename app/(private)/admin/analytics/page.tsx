'use client'

import React from 'react'
import {
  Search,
  TrendingUp,
  AlertCircle,
  Users,
} from 'lucide-react'

// Dummy Data
const TOP_SEARCHES = [
  { query: 'api authentication', count: 1245, trend: '+12%' },
  { query: 'rate limits', count: 832, trend: '+5%' },
  { query: 'webhooks setup', count: 654, trend: '-2%' },
  { query: 'pagination', count: 430, trend: '+18%' },
  { query: 'error codes', count: 312, trend: '0%' },
]

const ZERO_RESULT_SEARCHES = [
  { query: 'graphql endpoints', count: 156, lastSearched: '2 hours ago' },
  { query: 'sdk for rust', count: 89, lastSearched: '5 hours ago' },
  { query: 'sso integration saml', count: 67, lastSearched: '1 day ago' },
  { query: 'websocket streaming', count: 42, lastSearched: '2 days ago' },
  { query: 'billing invoice api', count: 31, lastSearched: '3 days ago' },
]

const STATS = [
  { label: 'Total Searches (30d)', value: '15.2k', icon: Search, color: '#3b82f6' },
  { label: 'Unique Users', value: '4,821', icon: Users, color: '#10b981' },
  { label: 'Search Success Rate', value: '92.4%', icon: TrendingUp, color: '#f59e0b' },
  { label: 'Zero Results', value: '7.6%', icon: AlertCircle, color: '#ef4444' },
]

export default function AnalyticsPage() {
  return (
    <div className="relative flex-1 overflow-hidden h-full">
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-hd-bg/40 backdrop-blur-[2px]">
        <div className="flex flex-col items-center justify-center p-8 bg-hd-surface border border-hd-border rounded-xl shadow-lg max-w-[400px] text-center">
          <div className="w-12 h-12 rounded-full bg-[#f26522]/10 flex items-center justify-center text-[#f26522] mb-4">
            <TrendingUp size={24} />
          </div>
          <h2 className="text-xl font-bold text-hd-text mb-2">Search Analytics</h2>
          <p className="text-sm text-hd-muted mb-4">Deep insights into what your users are searching for and how they interact with your docs are actively being built.</p>
          <span className="text-[0.65rem] font-bold uppercase tracking-wider px-2 py-1 bg-[#f26522]/10 text-[#f26522] border border-[#f26522]/20 rounded">Coming Soon</span>
        </div>
      </div>
      
      {/* Blurred background content */}
      <div className="pointer-events-none select-none opacity-50 blur-[2px] h-full" aria-hidden="true">
        <div className="flex-1 overflow-y-auto bg-hd-bg p-8 h-full">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-hd-text m-0">Search Analytics</h1>
            <p className="text-hd-muted mt-2 text-sm">Monitor what your users are searching for in the documentation.</p>
          </div>
          <div className="bg-hd-accent/10 border border-hd-accent/20 text-hd-accent px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
            <TrendingUp size={16} />
            Coming Soon
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, idx) => (
            <div key={idx} className="bg-hd-surface border border-hd-border rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-hd-muted text-xs font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-hd-text m-0">{stat.value}</h3>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon size={20} color={stat.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Top Searches Panel */}
          <div className="bg-hd-surface border border-hd-border rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-hd-border bg-hd-admin-nav/50">
              <h2 className="text-base font-bold text-hd-text m-0 flex items-center gap-2">
                <TrendingUp size={18} className="text-hd-accent" />
                Top Searches
              </h2>
              <p className="text-xs text-hd-muted mt-1">Most frequent queries with results</p>
            </div>
            <div className="p-0 flex-1">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-hd-border">
                    <th className="px-6 py-3 font-medium text-hd-muted">Search Query</th>
                    <th className="px-6 py-3 font-medium text-hd-muted text-right">Volume</th>
                    <th className="px-6 py-3 font-medium text-hd-muted text-right">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_SEARCHES.map((item, i) => (
                    <tr key={i} className="border-b border-hd-border/50 last:border-0 hover:bg-hd-admin-bg/50 transition-colors">
                      <td className="px-6 py-3.5 text-hd-text font-medium">{item.query}</td>
                      <td className="px-6 py-3.5 text-hd-admin-text text-right">{item.count.toLocaleString()}</td>
                      <td className={`px-6 py-3.5 text-right font-medium ${item.trend.startsWith('+') ? 'text-green-500' : item.trend.startsWith('-') ? 'text-red-500' : 'text-hd-muted'}`}>
                        {item.trend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Zero Results Panel */}
          <div className="bg-hd-surface border border-hd-border rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-hd-border bg-hd-admin-nav/50">
              <h2 className="text-base font-bold text-hd-text m-0 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-500" />
                Zero-Result Searches
              </h2>
              <p className="text-xs text-hd-muted mt-1">Queries that returned no documentation</p>
            </div>
            <div className="p-0 flex-1">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-hd-border">
                    <th className="px-6 py-3 font-medium text-hd-muted">Missing Query</th>
                    <th className="px-6 py-3 font-medium text-hd-muted text-right">Attempts</th>
                    <th className="px-6 py-3 font-medium text-hd-muted text-right">Last Seen</th>
                  </tr>
                </thead>
                <tbody>
                  {ZERO_RESULT_SEARCHES.map((item, i) => (
                    <tr key={i} className="border-b border-hd-border/50 last:border-0 hover:bg-hd-admin-bg/50 transition-colors">
                      <td className="px-6 py-3.5 text-hd-text font-medium">
                        <span className="bg-hd-admin-bg px-2 py-1 rounded-md border border-hd-border text-xs">
                          {item.query}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-hd-admin-text text-right">{item.count}</td>
                      <td className="px-6 py-3.5 text-hd-muted text-right text-xs whitespace-nowrap">
                        {item.lastSearched}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
        </div>
      </div>
    </div>
  )
}
