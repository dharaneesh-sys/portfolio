import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Start' },
  { id: 'beliefs', label: 'Beliefs' },
  { id: 'currently', label: 'Now' },
  { id: 'projects', label: 'Work' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'about', label: 'About' },
  { id: 'connect', label: 'Connect' },
]

export default function ScrollStepper() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observers = []

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === section.id)
            setActiveIndex(idx)
          }
        },
        { threshold: 0.3 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="scroll-stepper" aria-label="Section navigation">
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          className={`stepper-dot ${i === activeIndex ? 'active' : ''}`}
          onClick={() => scrollTo(section.id)}
          aria-label={`Go to ${section.label}`}
          title={section.label}
        >
          <span className="stepper-label">{section.label}</span>
        </button>
      ))}
    </nav>
  )
}
