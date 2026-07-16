import { useEffect, useRef, useState } from 'react'

/**
 * Premium custom cursor:
 *  - Small white dot with mix-blend-mode: difference (inverts colours beneath)
 *  - Outer ring that spring-follows with an easing lag
 *  - Ring expands / dims when hovering interactive elements
 *  - Ring contracts when clicking
 */
export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  // Use refs for mouse / ring position to avoid React re-renders on every mousemove
  const mouse   = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const [flags, setFlags] = useState({ hovering: false, clicking: false })

  useEffect(() => {
    // Don't show on touch-only devices
    if (window.matchMedia('(hover: none)').matches) return

    let raf

    /* ── Dot tracks mouse exactly ── */
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`
      }
    }

    /* ── Ring spring-follows with lerp ── */
    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.09
      ring.current.y += (mouse.current.y - ring.current.y) * 0.09
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 19}px, ${ring.current.y - 19}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    /* ── Hover detection ── */
    const onOver = (e) => {
      const el = e.target.closest(
        'a, button, [role="button"], input, label, select, [data-cursor]'
      )
      setFlags(f => ({ ...f, hovering: !!el }))
    }
    const onDown = () => setFlags(f => ({ ...f, clicking: true }))
    const onUp   = () => setFlags(f => ({ ...f, clicking: false }))

    document.body.classList.add('custom-cursor-on')
    window.addEventListener('mousemove',  onMove, { passive: true })
    window.addEventListener('mouseover',  onOver, { passive: true })
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove('custom-cursor-on')
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseover',  onOver)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  const { hovering, clicking } = flags

  return (
    <>
      <div
        ref={dotRef}
        className={`cur-dot${clicking ? ' cur-dot-click' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={[
          'cur-ring',
          hovering ? 'cur-ring-hover' : '',
          clicking ? 'cur-ring-click' : '',
        ].join(' ')}
        aria-hidden="true"
      />
    </>
  )
}
