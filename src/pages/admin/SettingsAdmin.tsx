import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useSupabaseSingle } from '@/hooks/useSupabaseQuery'
import type { SiteSettings } from '@/lib/types'
import { Field, TextInput, TextArea, Toggle } from '@/components/ui/FormFields'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'

export function SettingsAdmin() {
  const { data, loading, refetch } = useSupabaseSingle<SiteSettings>('site_settings')
  const [form, setForm] = useState<Partial<SiteSettings>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  async function handleSave() {
    setSaving(true)
    const payload = { ...form }
    delete (payload as Record<string, unknown>).id
    if (data?.id) {
      await supabase.from('site_settings').update(payload).eq('id', data.id)
    } else {
      await supabase.from('site_settings').insert(payload)
    }
    setSaving(false)
    refetch()
  }

  if (loading) return <Spinner />

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-2xl text-ink mb-1">Settings</h1>
      <p className="text-sm text-ink-muted mb-8">Site-wide metadata and maintenance mode.</p>

      <Field label="Site title">
        <TextInput value={form.site_title ?? ''} onChange={(e) => setForm({ ...form, site_title: e.target.value })} />
      </Field>
      <Field label="Meta description">
        <TextArea value={form.meta_description ?? ''} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} />
      </Field>
      <div className="mb-6">
        <Toggle
          checked={form.maintenance_mode ?? false}
          onChange={(v) => setForm({ ...form, maintenance_mode: v })}
          label="Maintenance mode (site shows a holding message)"
        />
      </div>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? 'Saving…' : 'Save settings'}
      </Button>
    </div>
  )
}
