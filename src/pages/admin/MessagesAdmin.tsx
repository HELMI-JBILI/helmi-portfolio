import { Mail, MailOpen, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import type { ContactMessage } from '@/lib/types'

export function MessagesAdmin() {
  const { data, loading, refetch } = useSupabaseQuery<ContactMessage>('contact_messages', {
    order: { column: 'created_at', ascending: false },
  })

  async function markRead(m: ContactMessage) {
    await supabase.from('contact_messages').update({ is_read: !m.is_read }).eq('id', m.id)
    refetch()
  }

  async function remove(id: string) {
    await supabase.from('contact_messages').delete().eq('id', id)
    refetch()
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-1">Messages</h1>
      <p className="text-sm text-ink-muted mb-8">Submissions from the public contact form. Visible only to you.</p>

      {loading && <Spinner />}
      {!loading && data.length === 0 && <EmptyState title="No messages yet" icon={Mail} />}

      <div className="space-y-3">
        {data.map((m) => (
          <div key={m.id} className={`rounded-sm border p-5 ${m.is_read ? 'border-line bg-white' : 'border-aqua-300 bg-aqua-50/40'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-ink">{m.name} <span className="text-ink-muted font-normal">· {m.email}</span></p>
                {m.subject && <p className="text-xs text-ink-muted mt-0.5">{m.subject}</p>}
              </div>
              <div className="flex shrink-0 gap-3">
                <button onClick={() => markRead(m)} className="text-ink-muted hover:text-ink" aria-label="Toggle read">
                  {m.is_read ? <MailOpen className="h-4 w-4" strokeWidth={1.5} /> : <Mail className="h-4 w-4" strokeWidth={1.5} />}
                </button>
                <button onClick={() => remove(m.id)} className="text-ink-muted hover:text-red-600" aria-label="Delete">
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-light leading-relaxed">{m.message}</p>
            <p className="mt-3 font-mono text-[10px] text-ink-muted">{new Date(m.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
