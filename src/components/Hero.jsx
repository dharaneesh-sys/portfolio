import { useState, useEffect, useRef } from 'react'
import portfolioData from '../data/portfolio.json'

/* ══════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════ */

function useScramble(text, delay = 300) {
  const [display, setDisplay] = useState(() => text.replace(/[^. ]/g, '░'))
  const CHARS = 'abcdefghijklmnopqrstuvwxyz'
  useEffect(() => {
    let frame = 0; const TOTAL = 44
    const timer = setTimeout(() => {
      const id = setInterval(() => {
        frame++
        const revealed = Math.floor((frame / TOTAL) * text.length)
        setDisplay(Array.from(text).map((ch, i) => {
          if (ch === '.' || ch === ' ') return ch
          if (i < revealed) return ch
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join(''))
        if (frame >= TOTAL) { clearInterval(id); setDisplay(text) }
      }, 36)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay])
  return display
}

function useParallax() {
  const ref = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const fn = (e) => {
      ref.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])
  return ref
}

/* ══════════════════════════════════════════════════════
   LEFT COLLAGE — every element has hover interactions
══════════════════════════════════════════════════════ */

function OpenBook() {
  return (
    <div className="open-book hov-book">
      <div className="book-left-page" />
      <div className="book-spine" />
      <div className="book-right-page" />
      {/* Lines on left page */}
      <div className="book-lines left">
        {[...Array(6)].map((_, i) => <div key={i} className="book-line" />)}
      </div>
      {/* Lines on right page */}
      <div className="book-lines right">
        {[...Array(6)].map((_, i) => <div key={i} className="book-line" />)}
      </div>
    </div>
  )
}

function DomeLamp() {
  return (
    <div className="dome-lamp hov-lamp">
      {/* Glow that blooms on hover */}
      <div className="lamp-glow-ring" aria-hidden="true" />
      <div className="lamp-dome" />
      <div className="lamp-stem" />
      <div className="lamp-foot" />
    </div>
  )
}

function NewspaperClipping() {
  return (
    <div className="news-clip hov-newsclip" style={{ left: '22%', top: '9%', transform: 'rotate(-5deg)' }}>
      <div className="news-paperclip" />
      <p className="news-eyebrow">from natural affinity, or</p>
      <p className="news-eyebrow">sympathy and manifesting</p>
      <p className="news-headline">Build.</p>
      <p className="news-body">Events and fo...ons</p>
    </div>
  )
}

function FilmCanister() {
  return (
    <div className="film-canister-wrap hov-canister">
      <div className="film-top-cap" />
      <div className="film-body-wrap">
        <div className="film-label-block">
          <span className="film-brand">KODAK</span>
          <span className="film-model">Portra 400</span>
        </div>
      </div>
      <div className="film-bottom-cap" />
    </div>
  )
}

function BicLighter() {
  return (
    <div className="lighter-wrap hov-lighter">
      {/* Flame — only visible on hover */}
      <div className="lighter-flame" aria-hidden="true">
        <div className="lighter-flame-core" />
        <div className="lighter-flame-outer" />
      </div>
      <div className="lighter-metal" />
      <div className="lighter-body"><div className="lighter-graphic">{'< >'}</div></div>
      <div className="lighter-base" />
    </div>
  )
}

function CreamTube() {
  return (
    <div className="tube-wrap hov-tube">
      <div className="tube-cap" />
      <div className="tube-body"><div className="tube-logo">🐧</div></div>
      <div className="tube-crimp" />
    </div>
  )
}

function CableCoil() {
  return (
    <div className="cable-coil-wrap hov-cable">
      <svg width="90" height="55" viewBox="0 0 90 55" fill="none">
        <path d="M6 42 Q18 12 34 28 Q50 44 66 22 Q78 8 84 16"
          stroke="#A09890" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M6 46 Q18 16 34 32 Q50 48 66 26 Q78 12 84 20"
          stroke="#B8B0A8" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.4" />
        <circle cx="6"  cy="44" r="4" fill="#8B8078" opacity="0.55" />
        <circle cx="84" cy="18" r="4" fill="#8B8078" opacity="0.55" />
      </svg>
    </div>
  )
}

function CoffeeRingLeft() {
  return (
    <div className="coffee-ring-l hov-coffeering" />
  )
}

/* ══════════════════════════════════════════════════════
   RIGHT ZONE — interactive elements
══════════════════════════════════════════════════════ */

function VinylMusicCard() {
  const [progress, setProgress] = useState(36)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + (hovered ? 0.3 : 0.1))), 100)
    return () => clearInterval(t)
  }, [hovered])

  const elapsed = Math.floor((progress / 100) * 212)
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div
      className="vinyl-music-card hov-vinyl"
      style={{ right: '10%', top: '4%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="vmc-disc-wrap">
        <div className={`vmc-disc vmc-disc-spin${hovered ? ' vmc-disc-fast' : ''}`}>
          <div className="vmc-disc-hole" />
        </div>
      </div>
      <div className="vmc-info">
        <div className="vmc-artist">Souleance</div>
        <div className="vmc-track">Jazz et thé vert</div>
        <div className="vmc-bar-row">
          <span className="vmc-time">{fmt(elapsed)}</span>
          <div className="vmc-bar">
            <div className="vmc-fill" style={{ width: `${progress}%` }}>
              <div className="vmc-dot" />
            </div>
          </div>
          <span className="vmc-time">3:32</span>
        </div>
      </div>
    </div>
  )
}

function GelPenRight() {
  return (
    <div className="gel-pen-r-wrap hov-gelpen">
      <div className="gel-pen-right" />
    </div>
  )
}

function CoffeeRing() {
  return <div className="coffee-ring-r hov-coffeering" />
}

function CursorIcon() {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 600)
  }

  return (
    <div
      className={`cursor-icon-wrap hov-cursor${clicked ? ' cursor-clicked' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="click me!"
    >
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
        <path d="M2 2 L2 20 L7 15 L12.5 24 L15 22.8 L9.5 13.8 L18 13.8 Z"
          fill="#D4608A" stroke="#D4608A" strokeWidth="0.5" strokeLinejoin="round" />
      </svg>
      {/* "click!" label */}
      <span className="cursor-click-label">click!</span>
    </div>
  )
}

function MacFolder() {
  return (
    <div className="mac-folder-wrap hov-folder">
      <div className="mac-folder-tab" />
      <div className="mac-folder-body">
        <span className="mac-folder-label">Final_Final_Final</span>
      </div>
    </div>
  )
}

function AirDropCard() {
  const [dismissed, setDismissed] = useState(false)
  const [accepted,  setAccepted]  = useState(false)
  if (dismissed) return null

  const handleAccept = () => {
    setAccepted(true)
    setTimeout(() => {
      document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })
      setDismissed(true)
    }, 650)
  }

  return (
    <div
      className={`airdrop-ios-card hov-airdrop${accepted ? ' airdrop-ios-accept' : ''}`}
      style={{ right: '22%', top: '64%', transform: 'rotate(-1deg)' }}
    >
      <p className="ios-ad-header">AirDrop</p>
      <p className="ios-ad-body">{portfolioData.name} would like to share a photo</p>
      <div className="ios-ad-thumb" />
      <div className="ios-ad-btns">
        <button className="ios-ad-btn ios-decline" onClick={() => setDismissed(true)}>Decline</button>
        <button className="ios-ad-btn ios-accept"  onClick={handleAccept}>Accept</button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   TOOLBAR + ICONS
══════════════════════════════════════════════════════ */
const TOOL_GROUPS = [
  ['⊹','⬚'],['✎','⌫'],['◉','⊕'],['✏','⌒'],['T','—'],['∿','□'],['▱','○'],['◻','⊿'],
]

function AnnotationToolbar() {
  const [activeBtn, setActiveBtn] = useState('0-0')
  return (
    <div className="annot-toolbar">
      {TOOL_GROUPS.map((group, gi) => (
        <div key={gi} className="annot-group">
          {group.map((icon, i) => {
            const key = `${gi}-${i}`
            return (
              <button
                key={i}
                className={`annot-btn${activeBtn === key ? ' annot-btn-active' : ''}`}
                onClick={() => setActiveBtn(key)}
                title={icon}
              >{icon}</button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function BottomIcons() {
  return (
    <div className="canvas-bottom-row">
      <a href="https://github.com/dharaneesh-sys" target="_blank" rel="noopener noreferrer"
        className="canvas-icon-circle" title="GitHub">⌥</a>
      <button className="canvas-icon-circle" title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
      <button className="canvas-icon-circle canvas-icon-active" title="Annotate">✏️</button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   MAIN HERO
══════════════════════════════════════════════════════ */
export default function Hero() {
  const parallax = useParallax()
  const scrambledName = useScramble(`${portfolioData.name}.`, 600)

  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    let raf
    const tick = () => {
      const { x, y } = parallax.current
      if (leftRef.current)  leftRef.current.style.transform  = `translate(${x * -14}px, ${y * -9}px)`
      if (rightRef.current) rightRef.current.style.transform = `translate(${x * 11}px, ${y * 7}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [parallax])

  return (
    <section className="hero canvas-hero" id="hero">

      {/* ── LEFT COLLAGE ── */}
      <div ref={leftRef} className="canvas-left-zone" aria-hidden="true">
        <OpenBook />
        <DomeLamp />
        <NewspaperClipping />
        <CableCoil />
        <FilmCanister />
        <BicLighter />
        <CreamTube />
        <CoffeeRingLeft />
      </div>

      {/* ── RIGHT ZONE ── */}
      <div ref={rightRef} className="canvas-right-zone">
        <VinylMusicCard />
        <GelPenRight />
        <CursorIcon />
        <CoffeeRing />
        <AirDropCard />
        <MacFolder />
      </div>

      {/* ── CENTER CONTENT ── */}
      <div className="canvas-center-content">
        <div className="canvas-np-pill">
          <span className="canvas-np-dot" />
          <span className="canvas-np-text">lofi hip hop radio</span>
          <span className="canvas-np-sep">—</span>
          <span className="canvas-np-sub">coding beats</span>
        </div>

        <h1 className="canvas-name">{scrambledName}</h1>
        <p className="canvas-role">Developer</p>
        <p className="canvas-verb"><em>Verb &amp; Noun</em></p>

        <p className="canvas-tagline">
          {portfolioData.tagline.split(portfolioData.taglineAccent).map((part, i) => (
            <span key={i}>
              {i > 0 && <em className="canvas-tagline-accent">{portfolioData.taglineAccent}</em>}
              {part}
            </span>
          ))}
        </p>

        <div className="canvas-meta-row">📍 {portfolioData.location}</div>

        <div className="canvas-scroll-hint">
          <span>↓</span><span>scroll to explore</span>
        </div>
      </div>

      <BottomIcons />
      <AnnotationToolbar />
    </section>
  )
}
