import { useEffect, useRef, useState } from 'react'

/** Eased, capped cursor-proximity value in [-1, 1] on each axis.
 * Deliberately does NOT track the raw cursor — it's smoothed toward the
 * target every frame so nothing "chases" the pointer. Disabled entirely
 * under prefers-reduced-motion. */
export function useCursorParallax(strength = 1) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const raf = useRef<number>()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    function onMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      target.current = { x: nx * strength, y: ny * strength }
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    function tick() {
      setPos((p) => ({
        x: p.x + (target.current.x - p.x) * 0.04,
        y: p.y + (target.current.y - p.y) * 0.04,
      }))
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [strength])

  return pos
}
