import { useState } from 'react'
import { Copy, Trash2, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import type { MediaFile } from '@/lib/types'

const buckets = ['general', 'profile', 'projects', 'research', 'certificates', 'publications', 'cv']

export function MediaAdmin() {
  const { data, loading, refetch } = useSupabaseQuery<MediaFile>('media', { order: { column: 'created_at', ascending: false } })
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [bucket, setBucket] = useState('general')

  async function remove(file: MediaFile) {
    await supabase.storage.from(file.bucket).remove([file.path])
    await supabase.from('media').delete().eq('id', file.id)
    refetch()
  }

  function copy(file: MediaFile) {
    navigator.clipboard.writeText(file.url)
    setCopiedId(file.id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-1">Media Library</h1>
      <p className="text-sm text-ink-muted mb-6">Every file uploaded from any admin form also appears here for reuse.</p>

      <div className="mb-8 rounded-sm border border-line bg-white p-5">
        <div className="mb-3 flex items-center gap-3">
          <label className="text-xs font-medium uppercase tracking-wide text-ink-muted">Upload to bucket</label>
          <select value={bucket} onChange={(e) => setBucket(e.target.value)} className="rounded-sm border border-line px-2 py-1 text-xs">
            {buckets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <ImageUploader bucket={bucket} accept="image/*,application/pdf" onChange={() => refetch()} />
      </div>

      {loading && <Spinner />}
      {!loading && data.length === 0 && <EmptyState title="No files uploaded yet" />}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.map((file) => (
          <div key={file.id} className="rounded-sm border border-line bg-white overflow-hidden">
            <div className="flex h-28 items-center justify-center bg-cream-200">
              {file.file_type.startsWith('image') ? (
                <img src={file.url} alt={file.file_name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-ink-muted">{file.file_type || 'file'}</span>
              )}
            </div>
            <div className="p-3">
              <p className="truncate text-xs text-ink" title={file.file_name}>{file.file_name}</p>
              <p className="text-[10px] text-ink-muted mt-0.5">{file.bucket}</p>
              <div className="mt-2 flex gap-3">
                <button onClick={() => copy(file)} className="text-ink-muted hover:text-ink" aria-label="Copy URL">
                  {copiedId === file.id ? <Check className="h-3.5 w-3.5 text-aqua-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => remove(file)} className="text-ink-muted hover:text-red-600" aria-label="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
