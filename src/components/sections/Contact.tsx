import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PublicButton } from '@/components/public/PublicButton'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/types'

export function Contact({ profile }: { profile: Profile | null }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (form.honeypot) return
    setStatus('sending')
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    })
    if (error) setStatus('error')
    else {
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' })
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-linedark bg-space-900/40">
      <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="10 · Contact" title="Have a research idea" emphasis="worth exploring?" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist-500">
            A dataset, an experiment, a collaboration — open to conversations at the intersection of AI, data and the physical world.
          </p>

          <div className="mt-10 space-y-4">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm text-mist-300 hover:text-mist-100">
                <Mail className="h-4 w-4 text-signal-400" strokeWidth={1.5} /> {profile.email}
              </a>
            )}
            {profile?.location && (
              <p className="flex items-center gap-3 text-sm text-mist-300">
                <MapPin className="h-4 w-4 text-signal-400" strokeWidth={1.5} /> {profile.location}
              </p>
            )}
            {profile?.github_url && (
              <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-mist-300 hover:text-mist-100">
                <Github className="h-4 w-4 text-signal-400" strokeWidth={1.5} /> GitHub
              </a>
            )}
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-mist-300 hover:text-mist-100">
                <Linkedin className="h-4 w-4 text-signal-400" strokeWidth={1.5} /> LinkedIn
              </a>
            )}
          </div>
        </div>

        <RevealOnScroll className="rounded-sm border border-linedark bg-space-900 p-7 md:p-9">
          {status === 'sent' ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 className="mb-3 h-8 w-8 text-signal-400" strokeWidth={1.5} />
              <p className="font-serif text-lg text-mist-100">Message sent</p>
              <p className="mt-1 text-sm text-mist-500">Thank you — I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-mist-500">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-sm border border-linedark bg-space-950 px-3 py-2.5 text-sm text-mist-100 focus:border-signal-400/60 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-mist-500">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-sm border border-linedark bg-space-950 px-3 py-2.5 text-sm text-mist-100 focus:border-signal-400/60 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-mist-500">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-sm border border-linedark bg-space-950 px-3 py-2.5 text-sm text-mist-100 focus:border-signal-400/60 focus:outline-none"
                />
              </div>
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-mist-500">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-sm border border-linedark bg-space-950 px-3 py-2.5 text-sm text-mist-100 focus:border-signal-400/60 focus:outline-none"
                />
              </div>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden
              />
              <PublicButton type="submit" disabled={status === 'sending'} className="mt-6 w-full sm:w-auto" icon={<Send className="h-3.5 w-3.5" />}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </PublicButton>
              {status === 'error' && <p className="mt-3 text-xs text-red-400">Something went wrong — please try again.</p>}
            </form>
          )}
        </RevealOnScroll>
      </div>
    </section>
  )
}
