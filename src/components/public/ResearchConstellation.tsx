import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface DomainNode {
  id: string
  label: string
  x: number // percentage, 0–100
  y: number // percentage, 0–100
  description: string
  related: string[]
}

// Presentation-layer content: your stated research interests, laid out as a
// constellation. Not sourced from the CMS (there's no "domains" table) and
// not a claim about specific personal achievements — these are standard,
// factual one-line descriptions of each field.
const NODES: DomainNode[] = [
  { id: 'ai', label: 'Artificial Intelligence', x: 50, y: 12, description: 'Systems that reason, learn and act on complex, uncertain data.', related: ['ml', 'cv', 'ds'] },
  { id: 'ml', label: 'Machine Learning', x: 26, y: 26, description: 'Models that improve from data rather than explicit rules.', related: ['ai', 'ds', 'cv'] },
  { id: 'cv', label: 'Computer Vision', x: 74, y: 26, description: 'Extracting structure and meaning from raster and satellite imagery.', related: ['ai', 'ml', 'rs'] },
  { id: 'ds', label: 'Data Science', x: 14, y: 50, description: 'Turning raw, messy, multi-source data into reliable insight.', related: ['ml', 'gi', 'ei'] },
  { id: 'rs', label: 'Remote Sensing', x: 86, y: 50, description: 'Measuring the Earth\u2019s surface from airborne and orbital sensors.', related: ['cv', 'si', 'eo'] },
  { id: 'si', label: 'Satellite Imagery', x: 68, y: 68, description: 'Sentinel and Landsat-class raster data as a primary evidence source.', related: ['rs', 'eo', 'gi'] },
  { id: 'eo', label: 'Earth Observation', x: 50, y: 84, description: 'Monitoring land, water and atmosphere over time to detect change.', related: ['si', 'rs', 'ei'] },
  { id: 'gi', label: 'Geospatial Intelligence', x: 32, y: 68, description: 'Coordinate systems, spatial analysis and location-aware reasoning.', related: ['ds', 'si', 'eo'] },
  { id: 'st', label: 'Space Technology', x: 50, y: 46, description: 'The instruments and platforms that make orbital observation possible.', related: ['rs', 'si'] },
  { id: 'ei', label: 'Environmental Intelligence', x: 12, y: 78, description: 'Applying computation to climate, agriculture and ecological systems.', related: ['ds', 'eo'] },
]

export function ResearchConstellation() {
  const [hovered, setHovered] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const active = NODES.find((n) => n.id === hovered) ?? null
  const relatedSet = new Set(active?.related ?? [])

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-center">
      <div className="relative aspect-[8/5] w-full">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {NODES.map((n) =>
            n.related.map((rid) => {
              const other = NODES.find((o) => o.id === rid)
              if (!other || n.id > rid) return null
              const isLit = hovered && (hovered === n.id || hovered === rid)
              return (
                <line
                  key={`${n.id}-${rid}`}
                  x1={n.x}
                  y1={n.y}
                  x2={other.x}
                  y2={other.y}
                  stroke={isLit ? 'rgba(94,195,222,0.55)' : 'rgba(199,208,211,0.10)'}
                  strokeWidth={isLit ? 0.35 : 0.2}
                  className={reduce ? '' : 'transition-all duration-300'}
                />
              )
            })
          )}
        </svg>

        {NODES.map((n) => {
          const isActive = hovered === n.id
          const isRelated = relatedSet.has(n.id)
          const dim = hovered && !isActive && !isRelated
          return (
            <button
              key={n.id}
              onMouseEnter={() => setHovered(n.id)}
              onFocus={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onBlur={() => setHovered(null)}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 font-mono text-[10.5px] whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'border-signal-400 bg-signal-500/15 text-signal-300 scale-110'
                  : isRelated
                  ? 'border-signal-500/40 text-mist-100'
                  : 'border-linedark text-mist-300'
              } ${dim ? 'opacity-40' : 'opacity-100'}`}
            >
              {n.label}
            </button>
          )
        })}
      </div>

      <div className="min-h-[160px] rounded-sm border border-linedark bg-space-900 p-6">
        {active ? (
          <>
            <p className="eyebrow-lab mb-2">{active.label}</p>
            <p className="text-[14.5px] leading-relaxed text-mist-300">{active.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {active.related.map((rid) => (
                <span key={rid} className="rounded-sm border border-linedark px-2 py-1 font-mono text-[10px] text-mist-500">
                  {NODES.find((n) => n.id === rid)?.label}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p className="text-[13px] text-mist-500">
            Hover or focus a node to see how these research domains connect — each field feeds the next, from raw
            signal to physical-world insight.
          </p>
        )}
      </div>
    </div>
  )
}
