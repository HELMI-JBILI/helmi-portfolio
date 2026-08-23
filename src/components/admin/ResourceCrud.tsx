import { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, TextInput, TextArea, Toggle, TagInput } from '@/components/ui/FormFields'
import { ImageUploader } from '@/components/admin/ImageUploader'

export type FieldType = 'text' | 'textarea' | 'tags' | 'date' | 'image' | 'url' | 'select'

export interface FieldConfig {
  key: string
  label: string
  type: FieldType
  bucket?: string
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  accept?: string
}

export interface ResourceConfig {
  table: string
  resourceLabel: string
  titleField: string
  subtitleField?: string
  imageField?: string
  fields: FieldConfig[]
  hasPublished?: boolean
  hasFeatured?: boolean
  hasOrder?: boolean
  defaultValues: Record<string, unknown>
  gallery?: { table: string; foreignKey: string; bucket: string }
}

type Row = Record<string, any>

function GalleryManager({ parentId, table, foreignKey, bucket }: { parentId: string; table: string; foreignKey: string; bucket: string }) {
  const { data, refetch } = useSupabaseQuery<Row>(table, { filter: { [foreignKey]: parentId }, order: { column: 'display_order' } })

  async function addImage(url: string | null) {
    if (!url) return
    await supabase.from(table).insert({ [foreignKey]: parentId, image_url: url, display_order: data.length })
    refetch()
  }

  async function removeImage(id: string) {
    await supabase.from(table).delete().eq('id', id)
    refetch()
  }

  return (
    <div className="mt-2">
      <div className="grid grid-cols-4 gap-2 mb-3">
        {data.map((img) => (
          <div key={img.id} className="relative">
            <img src={img.image_url} alt="" className="h-16 w-full rounded-sm object-cover border border-line" />
            <button
              onClick={() => removeImage(img.id)}
              className="absolute -right-1 -top-1 rounded-full bg-ink text-white text-[9px] h-4 w-4 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <ImageUploader bucket={bucket} folder="gallery" onChange={addImage} label="Add gallery image" />
    </div>
  )
}

export function ResourceCrud({ config }: { config: ResourceConfig }) {
  const orderCol = config.hasOrder ? { column: 'display_order' } : undefined
  const { data, loading, refetch } = useSupabaseQuery<Row>(config.table, { order: orderCol })

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Row | null>(null)
  const [form, setForm] = useState<Row>(config.defaultValues)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null)

  function openNew() {
    setEditing(null)
    setForm(config.defaultValues)
    setModalOpen(true)
  }

  function openEdit(row: Row) {
    setEditing(row)
    setForm(row)
    setModalOpen(true)
  }

  async function handleSave() {
    setSaving(true)
    const payload = { ...form }
    delete payload.id
    delete payload.created_at
    delete payload.updated_at
    if (editing) {
      await supabase.from(config.table).update(payload).eq('id', editing.id)
    } else {
      if (config.hasOrder) payload.display_order = data.length
      await supabase.from(config.table).insert(payload)
    }
    setSaving(false)
    setModalOpen(false)
    refetch()
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await supabase.from(config.table).delete().eq('id', deleteTarget.id)
    setDeleteTarget(null)
    refetch()
  }

  async function togglePublished(row: Row) {
    await supabase.from(config.table).update({ published: !row.published }).eq('id', row.id)
    refetch()
  }

  async function toggleFeatured(row: Row) {
    await supabase.from(config.table).update({ featured: !row.featured }).eq('id', row.id)
    refetch()
  }

  async function move(row: Row, dir: -1 | 1) {
    const sorted = [...data].sort((a, b) => a.display_order - b.display_order)
    const idx = sorted.findIndex((r) => r.id === row.id)
    const swapIdx = idx + dir
    if (swapIdx < 0 || swapIdx >= sorted.length) return
    const other = sorted[swapIdx]
    await supabase.from(config.table).update({ display_order: other.display_order }).eq('id', row.id)
    await supabase.from(config.table).update({ display_order: row.display_order }).eq('id', other.id)
    refetch()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-ink">{config.resourceLabel}</h1>
          <p className="text-sm text-ink-muted mt-1">{data.length} item{data.length === 1 ? '' : 's'}</p>
        </div>
        <Button size="sm" onClick={openNew} icon={<Plus className="h-4 w-4" />}>
          New
        </Button>
      </div>

      {loading && <Spinner />}
      {!loading && data.length === 0 && (
        <EmptyState title={`No ${config.resourceLabel.toLowerCase()} yet`} description="Create your first item to publish it on the site." />
      )}

      <div className="space-y-2">
        {[...data]
          .sort((a, b) => (config.hasOrder ? a.display_order - b.display_order : 0))
          .map((row) => (
            <div key={row.id} className="flex items-center gap-4 rounded-sm border border-line bg-white px-4 py-3">
              {config.imageField && row[config.imageField] ? (
                <img src={row[config.imageField]} alt="" className="h-12 w-12 shrink-0 rounded-sm object-cover" />
              ) : config.imageField ? (
                <div className="h-12 w-12 shrink-0 rounded-sm bg-cream-300" />
              ) : null}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{row[config.titleField]}</p>
                {config.subtitleField && <p className="truncate text-xs text-ink-muted">{row[config.subtitleField]}</p>}
              </div>

              {config.hasFeatured && (
                <button onClick={() => toggleFeatured(row)} title="Toggle featured" className={row.featured ? 'text-aqua-600' : 'text-line'}>
                  <Star className="h-4 w-4" fill={row.featured ? 'currentColor' : 'none'} strokeWidth={1.5} />
                </button>
              )}

              {config.hasPublished && (
                <button
                  onClick={() => togglePublished(row)}
                  className={`rounded-sm px-2 py-1 text-[10px] font-mono uppercase ${
                    row.published ? 'bg-aqua-50 text-aqua-700 border border-aqua-200' : 'bg-cream-300 text-ink-muted'
                  }`}
                >
                  {row.published ? 'Published' : 'Hidden'}
                </button>
              )}

              {config.hasOrder && (
                <div className="flex flex-col">
                  <button onClick={() => move(row, -1)} className="text-ink-muted hover:text-ink">
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => move(row, 1)} className="text-ink-muted hover:text-ink">
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              <button onClick={() => openEdit(row)} className="text-ink-muted hover:text-ink" aria-label="Edit">
                <Pencil className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button onClick={() => setDeleteTarget(row)} className="text-ink-muted hover:text-red-600" aria-label="Delete">
                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? `Edit ${config.resourceLabel}` : `New ${config.resourceLabel}`} wide>
        <div>
          {config.fields.map((f) => (
            <Field key={f.key} label={f.label}>
              {f.type === 'text' || f.type === 'url' ? (
                <TextInput
                  value={form[f.key] ?? ''}
                  placeholder={f.placeholder}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              ) : f.type === 'textarea' ? (
                <TextArea
                  value={form[f.key] ?? ''}
                  placeholder={f.placeholder}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              ) : f.type === 'date' ? (
                <TextInput
                  type="date"
                  value={form[f.key] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value || null })}
                />
              ) : f.type === 'tags' ? (
                <TagInput value={form[f.key] ?? []} onChange={(v) => setForm({ ...form, [f.key]: v })} />
              ) : f.type === 'image' ? (
                <ImageUploader
                  bucket={f.bucket ?? 'general'}
                  value={form[f.key]}
                  onChange={(url) => setForm({ ...form, [f.key]: url })}
                  accept={f.accept ?? 'image/*'}
                />
              ) : f.type === 'select' ? (
                <select
                  value={form[f.key] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full rounded-sm border border-line bg-white px-3 py-2 text-sm text-ink focus:border-aqua-400 focus:outline-none"
                >
                  <option value="">Select…</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : null}
            </Field>
          ))}

          {config.gallery && editing && (
            <div className="border-t border-line pt-4 mt-2">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">Gallery images</p>
              <GalleryManager
                parentId={editing.id}
                table={config.gallery.table}
                foreignKey={config.gallery.foreignKey}
                bucket={config.gallery.bucket}
              />
            </div>
          )}
          {config.gallery && !editing && (
            <p className="border-t border-line pt-4 mt-2 text-xs text-ink-muted">
              Save this item first, then reopen it to add gallery images.
            </p>
          )}

          <div className="flex flex-wrap gap-6 border-t border-line pt-4 mt-2">
            {config.hasPublished && (
              <Toggle checked={form.published ?? true} onChange={(v) => setForm({ ...form, published: v })} label="Published" />
            )}
            {config.hasFeatured && (
              <Toggle checked={form.featured ?? false} onChange={(v) => setForm({ ...form, featured: v })} label="Featured" />
            )}
            {'is_current' in config.defaultValues && (
              <Toggle checked={form.is_current ?? false} onChange={(v) => setForm({ ...form, is_current: v })} label="Current" />
            )}
            {'is_priority' in config.defaultValues && (
              <Toggle checked={form.is_priority ?? false} onChange={(v) => setForm({ ...form, is_priority: v })} label="Flagship (priority)" />
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Delete this ${config.resourceLabel.toLowerCase().replace(/s$/, '')}?`}
      />
    </div>
  )
}
