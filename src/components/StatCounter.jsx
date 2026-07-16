import { useEffect, useRef, useState } from 'react'

/**
 * StatCounter — animates a number from `from` to `to` when it enters the viewport.
 * Props:
 *   to       {number}  — target value
 *   from     {number}  — starting value (default 0)
 *   duration {number}  — animation duration ms (default 1400)
 *   prefix   {string}  — e.g. "+" or "~"
 *   suffix   {string}  — e.g. "k" or "%"
 *   label    {string}  — label shown below the number
 *   sublabel {string}  — dimmer second line
 */
export default function StatCounter({
  to,
  from = 0,
  duration = 1400,
  prefix = '',
  suffix = '',
  label = '',
  sublabel = '',
}) {
  const [value, setValue] = useState(from)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    let startTime = null
    const range = to - from

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + range * eased))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [started, from, to, duration])

  return (
    <div ref={ref} className="stat-counter">
      <div className="stat-counter-value">
        <span className="stat-counter-prefix">{prefix}</span>
        {value}
        <span className="stat-counter-suffix">{suffix}</span>
      </div>
      {label && <div className="stat-counter-label">{label}</div>}
      {sublabel && <div className="stat-counter-sublabel">{sublabel}</div>}
    </div>
  )
}
