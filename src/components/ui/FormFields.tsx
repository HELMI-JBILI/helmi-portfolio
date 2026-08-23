import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'

const label = 'block text-xs font-medium uppercase tracking-wide text-ink-muted mb-1.5'
const input =
  'w-full rounded-sm border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:border-aqua-400 focus:outline-none'

export function Field({
  label: labelText,
  children,
  hint,
}: {
  label: string
  children: ReactNode
  hint?: string
}) {
  return (
    <div className="mb-4">
      <label className={label}>{labelText}</label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-ink-muted">{hint}</p>}
    </div>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={input} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} rows={props.rows ?? 4} className={input} />
}

export function Toggle({
  checked,
  onChange,
  label: labelText,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <span
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${checked ? 'bg-aqua-500' : 'bg-line'}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </span>
      <span className="text-sm text-ink">{labelText}</span>
    </label>
  )
}

export function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  return (
    <div>
      <input
        className={input}
        placeholder={placeholder ?? 'Comma-separated, press Enter'}
        defaultValue={value.join(', ')}
        onBlur={(e) =>
          onChange(
            e.target.value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
      />
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {value.map((v) => (
            <span key={v} className="rounded-sm bg-aqua-50 border border-aqua-200 px-2 py-0.5 text-[11px] text-aqua-700">
              {v}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
