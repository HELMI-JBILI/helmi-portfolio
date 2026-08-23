import { useEffect, useRef } from 'react'
import { useCursorParallax } from './useCursorParallax'

interface DataNode {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

/**
 * Ambient, low-opacity network backdrop for the whole public site: drifting
 * data nodes connected by thin lines when near each other, plus a few
 * "satellite" dots slowly orbiting fixed elliptical paths. No grid/checker
 * pattern, no dense particle fog, no icons — just an intentional, structured
 * network + orbit system (neural network × satellite telemetry).
 * Pauses when the tab is hidden and renders a single static frame under
 * prefers-reduced-motion instead of animating.
 */
export function ScientificBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const parallax = useCursorParallax(8)
  const parallaxRef = useRef(parallax)
  parallaxRef.current = parallax

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let nodes: DataNode[] = []
    let raf: number

    // Three concentric orbital paths, each carrying one slow "satellite".
    const orbits = [
      { rx: 150, ry: 86, rot: -0.32, speed: 0.0009, angle: 0.4 },
      { rx: 230, ry: 128, rot: -0.32, speed: 0.0006, angle: 2.1 },
      { rx: 320, ry: 172, rot: -0.32, speed: 0.00042, angle: 4.4 },
    ]

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(16, Math.min(36, Math.floor((width * height) / 52000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.07,
        vy: (Math.random() - 0.5) * 0.07,
        r: Math.random() * 1.1 + 0.6,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    function drawOrbits(px: number, py: number) {
      const cx = width * 0.74 + px
      const cy = height * 0.3 + py
      ctx!.save()
      ctx!.translate(cx, cy)
      ctx!.rotate(orbits[0].rot)

      for (const o of orbits) {
        ctx!.beginPath()
        ctx!.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2)
        ctx!.strokeStyle = 'rgba(94,195,222,0.09)'
        ctx!.lineWidth = 1
        ctx!.stroke()

        if (!reduce) o.angle += o.speed * 16 // ~ per-frame advance at 60fps baseline

        const sx = o.rx * Math.cos(o.angle)
        const sy = o.ry * Math.sin(o.angle)
        ctx!.beginPath()
        ctx!.fillStyle = 'rgba(143,216,234,0.9)'
        ctx!.arc(sx, sy, 2.1, 0, Math.PI * 2)
        ctx!.fill()
        // faint trailing glow
        ctx!.beginPath()
        ctx!.fillStyle = 'rgba(143,216,234,0.18)'
        ctx!.arc(sx, sy, 5, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.restore()
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height)
      const { x: px, y: py } = parallaxRef.current
      drawOrbits(px, py)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) {
            ctx!.strokeStyle = `rgba(199,208,211,${0.09 * (1 - d / 120)})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x + px, a.y + py)
            ctx!.lineTo(b.x + px, b.y + py)
            ctx!.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx!.beginPath()
        ctx!.fillStyle = 'rgba(143,216,234,0.45)'
        ctx!.arc(n.x + px, n.y + py, n.r, 0, Math.PI * 2)
        ctx!.fill()
      }

      if (!reduce && !document.hidden) raf = requestAnimationFrame(frame)
    }

    frame()
    if (!reduce) {
      function onVisibility() {
        if (!document.hidden) frame()
      }
      document.addEventListener('visibilitychange', onVisibility)
      return () => {
        window.removeEventListener('resize', resize)
        document.removeEventListener('visibilitychange', onVisibility)
        cancelAnimationFrame(raf)
      }
    }

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
