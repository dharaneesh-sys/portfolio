import { useEffect, useRef, useState } from 'react'
import portfolioData from '../data/portfolio.json'
import { Cassette } from './SideDecorations'

const paperVariants = ['torn-note-lined', 'torn-note-grid', 'torn-note-kraft']

/* ── Decorative doodles above the sticky zone ── */
function BeliefDecos() {
  return (
    <div className="belief-decos" aria-hidden="true">
      <svg className="belief-arrow-svg" width="90" height="36" viewBox="0 0 90 36" fill="none">
        <path d="M2 18 Q22 4 42 18 Q62 32 82 18" stroke="#C0B8A8" strokeWidth="2"
          fill="none" strokeLinecap="round" strokeDasharray="4 3"/>
        <path d="M76 12 L84 18 L76 24" stroke="#C0B8A8" strokeWidth="2"
          fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <div className="belief-sticky-note">
        <span>✱</span>
        <span>things I</span>
        <span>live by</span>
      </div>

      <span className="belief-ast belief-ast-1">✦</span>
      <span className="belief-ast belief-ast-2">✧</span>
      <span className="belief-ast belief-ast-3">✱</span>
    </div>
  )
}

export default function BeliefCarousel() {
  const { beliefs } = portfolioData
  const stickyZoneRef = useRef(null)   // the 300vh scrollable container
  const trackRef      = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const zone  = stickyZoneRef.current
    const track = trackRef.current
    if (!zone || !track) return

    const onScroll = () => {
      const rect            = zone.getBoundingClientRect()
      // How far we've scrolled INTO the sticky zone (clamped 0→1)
      const scrolled        = Math.max(0, -rect.top)
      const totalScrollable = Math.max(1, rect.height - window.innerHeight)
      const progress        = Math.min(scrolled / totalScrollable, 1)

      // Slide the track so all cards pan through
      const maxSlide   = track.scrollWidth - window.innerWidth + 80
      const translateX = -(progress * maxSlide)
      track.style.transform = `translateX(${Math.min(0, translateX)}px)`

      setActiveIndex(Math.min(
        Math.round(progress * (beliefs.length - 1)),
        beliefs.length - 1
      ))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // run once on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [beliefs.length])

  const rotations = beliefs.map((_, i) => (i % 2 === 0 ? 1.2 : -0.9))

  return (
    <section className="beliefs-section" id="beliefs">
      {/* Left gutter: cassette tape */}
      <div className="gutter-deco gutter-left" style={{ top: '4rem' }}>
        <Cassette />
      </div>

      {/* Section header — sits above the sticky scroll zone */}
      <div className="beliefs-header">
        <p className="section-label animate-in">Beliefs →</p>
        <p className="beliefs-intro animate-in animate-in-d1">
          {beliefs.length} things I code by.
        </p>
        <BeliefDecos />
      </div>

      {/* Sticky scroll-scrub zone — ref is ON this element */}
      <div
        className="beliefs-sticky"
        ref={stickyZoneRef}
        style={{ height: `${beliefs.length * 100}vh` }}
      >
        <div className="beliefs-pinned">
          {/* Counter */}
          <div className="beliefs-progress">
            <span className="beliefs-progress-current">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="beliefs-progress-sep"> / </span>
            <span className="beliefs-progress-total">
              {String(beliefs.length).padStart(2, '0')}
            </span>
          </div>

          {/* Horizontal card track */}
          <div className="beliefs-track" ref={trackRef}>
            {beliefs.map((belief, i) => {
              const isActive = i === activeIndex
              return (
                <div
                  key={i}
                  className={`belief-slide torn-note ${paperVariants[i % paperVariants.length]} ${isActive ? 'belief-slide-active' : ''}`}
                  style={{ transform: `rotate(${rotations[i]}deg)` }}
                >
                  <div className="belief-slide-accent" style={{ background: belief.accent }} />
                  <span className="belief-slide-number torn-note-number" style={{ color: belief.accent }}>
                    {belief.number}
                  </span>
                  <h2>{belief.title}</h2>
                  <p>{belief.description}</p>
                  {isActive && <div className="belief-active-dot" style={{ background: belief.accent }} />}
                </div>
              )
            })}
          </div>

          {/* Scroll hint on first card */}
          {activeIndex === 0 && (
            <div className="beliefs-scroll-hint">
              <span>scroll</span>
              <span className="beliefs-scroll-arrow">→</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
