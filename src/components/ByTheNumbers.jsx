import { useEffect, useRef, useState } from 'react'
import { BookStack } from './SideDecorations'

/* Animate a number from 0 → to when scrolled into view */
function AnimatedStat({ to, suffix = '', label, sublabel, duration = 1400 }) {
  const [val, setVal] = useState(0)
  const ref     = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased    = 1 - Math.pow(1 - progress, 4)
          setVal(Math.round(eased * to))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <div ref={ref} className="stat-block">
      <div className="stat-num">
        {val.toLocaleString()}<span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-sublabel">{sublabel}</div>
      {/* Trend arrow */}
      <div className="stat-trend">↗</div>
    </div>
  )
}

const STATS = [
  { to: 4,    suffix: '',   label: 'shipped projects',  sublabel: 'full-stack, end-to-end',  duration: 1000 },
  { to: 847,  suffix: '+',  label: 'GitHub commits',    sublabel: 'this year alone',          duration: 1800 },
  { to: 12,   suffix: '',   label: 'open source PRs',   sublabel: 'merged & live',            duration: 1200 },
  { to: 3,    suffix: 'k+', label: 'lines debugged',    sublabel: 'and counting 🙃',          duration: 1000 },
]

/* Mini bar-chart doodle */
function MiniChart() {
  const bars = [30, 55, 40, 70, 50, 85, 60, 90, 75, 95]
  return (
    <div className="btn-mini-chart" aria-hidden="true">
      {bars.map((h, i) => (
        <div
          key={i}
          className="btn-chart-bar"
          style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
        />
      ))}
    </div>
  )
}

/* Scribble underline SVG */
function ScribbleUnderline() {
  return (
    <svg className="btn-scribble" width="220" height="12" viewBox="0 0 220 12" aria-hidden="true">
      <path d="M2 8 Q30 2 55 8 Q80 14 110 7 Q140 2 165 8 Q190 14 218 6"
        stroke="#A5B4FC" strokeWidth="2.5" fill="none" strokeLinecap="round"
        strokeDasharray="4 3"/>
    </svg>
  )
}

export default function ByTheNumbers() {
  return (
    <section className="section by-the-numbers" id="by-the-numbers">
      <p className="section-label animate-in">Queue the montage music 🏋️</p>

      {/* Left gutter: book stack */}
      <div className="gutter-deco gutter-left" style={{ top: '5rem' }}>
        <BookStack />
      </div>

      <div className="btn-intro-wrap animate-in animate-in-d1">
        <p className="btn-intro">
          Some numbers that make me feel good about the time I spend at a keyboard.
        </p>
        <ScribbleUnderline />
      </div>

      {/* Chart doodle floats beside the grid */}
      <div className="btn-layout">
        <div className="btn-stat-grid animate-in animate-in-d2">
          {STATS.map((s, i) => (
            <AnimatedStat key={i} {...s} />
          ))}
        </div>
        <MiniChart />
      </div>

      {/* Floating sticky note */}
      <div className="btn-sticky-note animate-in animate-in-d3" aria-hidden="true">
        <span>📈</span>
        <span>all going</span>
        <span>up ↗</span>
      </div>
    </section>
  )
}
