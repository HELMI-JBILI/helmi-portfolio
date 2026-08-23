import { useRef, useState } from 'react'
import { UploadCloud, X, Loader2, FileText } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Props {
  bucket: string
  folder?: string
  value?: string | null
  onChange: (url: string | null) => void
  accept?: string
  label?: string
}

/** Uploads a file to Supabase Storage and records it in the `media` table. */
export function ImageUploader({ bucket, folder = 'general', value, onChange, accept = 'image/*', label }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    setError(null)
    try {
      const ext = file.name.split('.').pop()
      const path = `${folder}/${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      await supabase.from('media').insert({
        bucket,
        path,
        url: data.publicUrl,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        folder,
      })
      onChange(data.publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {label && <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>}
      {value ? (
        accept.startsWith('image') ? (
          <div className="relative w-full max-w-xs overflow-hidden rounded-sm border border-line">
            <img src={value} alt="" className="h-40 w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute right-2 top-2 rounded-full bg-ink/70 p-1 text-white hover:bg-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex w-full max-w-xs items-center justify-between rounded-sm border border-line bg-cream-100 px-4 py-3">
            <a href={value} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-ink hover:text-aqua-700 truncate">
              <FileText className="h-4 w-4 shrink-0" strokeWidth={1.5} /> View uploaded file
            </a>
            <button type="button" onClick={() => onChange(null)} className="text-ink-muted hover:text-red-600">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-full max-w-xs flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-line bg-cream-100 text-ink-muted hover:border-aqua-400 hover:text-aqua-600"
        >
          {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" strokeWidth={1.5} />}
          <span className="text-xs">{uploading ? 'Uploading…' : 'Click to upload'}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
