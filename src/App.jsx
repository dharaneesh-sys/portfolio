import { useEffect, useRef } from 'react'
import Hero from './components/Hero'
import BeliefCarousel from './components/BeliefCarousel'
import Currently from './components/Currently'
import ByTheNumbers from './components/ByTheNumbers'
import Projects from './components/Projects'
import Philosophy from './components/Philosophy'
import About from './components/About'
import WhatILookFor from './components/WhatILookFor'
import Connect from './components/Connect'
import ScrollStepper from './components/ScrollStepper'
import CustomCursor from './components/CustomCursor'

/* ── Scroll-progress bar at the very top ── */
function ScrollProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const fn = () => {
      const total = document.body.scrollHeight - window.innerHeight
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div ref={barRef} className="scroll-progress-bar" aria-hidden="true" />
}

/* ── Intersection-observer scroll reveal ── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-visible')
            io.unobserve(entry.target)   // fire once
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.sr').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useScrollReveal()

  return (
    <>
      {/* Global overlays (outside .page so they're always fixed/full-screen) */}
      <CustomCursor />
      <ScrollProgress />

      <div className="page" id="main-content">
        <ScrollStepper />
        <Hero />
        <hr className="section-sep" />
        <BeliefCarousel />
        <hr className="section-sep" />
        <Currently />
        <hr className="section-sep" />
        <ByTheNumbers />
        <hr className="section-sep" />
        <Projects />
        <hr className="section-sep" />
        <Philosophy />
        <hr className="section-sep" />
        <About />
        <hr className="section-sep" />
        <WhatILookFor />
        <hr className="section-sep" />
        <Connect />
      </div>
    </>
  )
}
