import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useSupabaseSingle } from '@/hooks/useSupabaseQuery'
import type { Profile } from '@/lib/types'
import { Field, TextInput, TextArea } from '@/components/ui/FormFields'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { Plus, X } from 'lucide-react'

export function ProfileAdmin() {
  const { data, loading, refetch } = useSupabaseSingle<Profile>('profiles')
  const [form, setForm] = useState<Partial<Profile>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  async function handleSave() {
    setSaving(true)
    const payload = { ...form }
    delete (payload as Record<string, unknown>).id
    delete (payload as Record<string, unknown>).created_at
    delete (payload as Record<string, unknown>).updated_at
    if (data?.id) {
      await supabase.from('profiles').update(payload).eq('id', data.id)
    } else {
      await supabase.from('profiles').insert(payload)
    }
    setSaving(false)
    setSaved(true)
    refetch()
    setTimeout(() => setSaved(false), 2000)
  }

  function updateInterest(idx: number, value: string) {
    const arr = [...(form.research_interests ?? [])]
    arr[idx] = value
    setForm({ ...form, research_interests: arr })
  }

  function updateLanguage(idx: number, key: 'name' | 'level', value: string) {
    const arr = [...(form.languages ?? [])]
    arr[idx] = { ...arr[idx], [key]: value }
    setForm({ ...form, languages: arr })
  }

  if (loading) return <Spinner />

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-2xl text-ink mb-1">Profile</h1>
      <p className="text-sm text-ink-muted mb-8">This information powers the Home, About, Contact and CV.</p>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Field label="Full name"><TextInput value={form.full_name ?? ''} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></Field>
          <Field label="Headline"><TextInput value={form.headline ?? ''} onChange={(e) => setForm({ ...form, headline: e.target.value })} /></Field>
          <Field label="Tagline"><TextInput value={form.tagline ?? ''} onChange={(e) => setForm({ ...form, tagline: e.target.value })} /></Field>
          <Field label="Bio (hero intro)"><TextArea value={form.bio ?? ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></Field>
          <Field label="Story"><TextArea value={form.story ?? ''} onChange={(e) => setForm({ ...form, story: e.target.value })} /></Field>
          <Field label="Passions"><TextArea value={form.passions ?? ''} onChange={(e) => setForm({ ...form, passions: e.target.value })} /></Field>
          <Field label="Values"><TextArea value={form.values_text ?? ''} onChange={(e) => setForm({ ...form, values_text: e.target.value })} /></Field>
        </div>

        <div>
          <Field label="Profile image"><ImageUploader bucket="profile" value={form.avatar_url} onChange={(url) => setForm({ ...form, avatar_url: url })} /></Field>
          <Field label="Email"><TextInput type="email" value={form.email ?? ''} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Phone"><TextInput value={form.phone ?? ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="Location"><TextInput value={form.location ?? ''} onChange={(e) => setForm({ ...form, location: e.target.value })} /></Field>
          <Field label="University"><TextInput value={form.university ?? ''} onChange={(e) => setForm({ ...form, university: e.target.value })} /></Field>
          <Field label="GitHub URL"><TextInput value={form.github_url ?? ''} onChange={(e) => setForm({ ...form, github_url: e.target.value })} /></Field>
          <Field label="LinkedIn URL"><TextInput value={form.linkedin_url ?? ''} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} /></Field>
          <Field label="Facebook URL"><TextInput value={form.facebook_url ?? ''} onChange={(e) => setForm({ ...form, facebook_url: e.target.value })} /></Field>
        </div>
      </div>

      <div className="mt-2 grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted">Research interests</p>
          {(form.research_interests ?? []).map((r, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <TextInput value={r} onChange={(e) => updateInterest(i, e.target.value)} />
              <button
                onClick={() => setForm({ ...form, research_interests: (form.research_interests ?? []).filter((_, idx) => idx !== i) })}
                className="text-ink-muted hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setForm({ ...form, research_interests: [...(form.research_interests ?? []), ''] })}
            className="mt-1 inline-flex items-center gap-1 text-xs text-aqua-700"
          >
            <Plus className="h-3.5 w-3.5" /> Add interest
          </button>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted">Languages</p>
          {(form.languages ?? []).map((l, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <TextInput placeholder="Language" value={l.name} onChange={(e) => updateLanguage(i, 'name', e.target.value)} />
              <TextInput placeholder="Level" value={l.level} onChange={(e) => updateLanguage(i, 'level', e.target.value)} />
              <button
                onClick={() => setForm({ ...form, languages: (form.languages ?? []).filter((_, idx) => idx !== i) })}
                className="text-ink-muted hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setForm({ ...form, languages: [...(form.languages ?? []), { name: '', level: '' }] })}
            className="mt-1 inline-flex items-center gap-1 text-xs text-aqua-700"
          >
            <Plus className="h-3.5 w-3.5" /> Add language
          </button>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save profile'}
        </Button>
        {saved && <span className="text-xs text-aqua-700">Saved</span>}
      </div>
    </div>
  )
}
