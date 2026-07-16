import { useState } from 'react'

/* ══════════════════════════════════════════════════════
   STICKY NOTE — used in: Currently section (right)
══════════════════════════════════════════════════════ */
export function StickyNote() {
  const [checked, setChecked] = useState({ 0: true, 1: true })
  const items = [
    { id: 0, text: 'ship it' },
    { id: 1, text: 'deploy' },
    { id: 2, text: 'sleep' },
    { id: 3, text: 'touch grass' },
  ]
  return (
    <div className="sd-obj sd-sticky" title="my todo list">
      <div className="sst-tape" />
      <p className="sst-heading">// todo</p>
      <div className="sst-items">
        {items.map(it => (
          <label
            key={it.id}
            className={`sst-item${checked[it.id] ? ' sst-done' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setChecked(c => ({ ...c, [it.id]: !c[it.id] }))}
          >
            <span className="sst-box">{checked[it.id] ? '☑' : '☐'}</span>
            <span className="sst-text">{it.text}</span>
          </label>
        ))}
      </div>
      <div className="sst-fold" />
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   CACTUS — used in: Philosophy section (left)
══════════════════════════════════════════════════════ */
export function Cactus() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`sd-obj sd-cactus${hovered ? ' sd-cactus-hover' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="don't touch!"
    >
      <div className="cact-group">
        <div className="cact-arm-l" />
        <div className="cact-trunk">
          <div className="cact-spine cact-sp1" /><div className="cact-spine cact-sp2" />
          <div className="cact-spine cact-sp3" /><div className="cact-spine cact-sp4" />
          <div className={`cact-flower${hovered ? ' cact-flower-bloom' : ''}`}>✿</div>
        </div>
        <div className="cact-arm-r" />
        <div className="cact-arm-l2" />
      </div>
      <div className="cact-pot">
        <div className="cact-rim" />
        <div className="cact-pot-body"><div className="cact-pot-stripe" /></div>
      </div>
      <div className={`cact-tooltip${hovered ? ' visible' : ''}`}>🌵 don't touch!</div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   COFFEE CUP — used in: About section (right)
══════════════════════════════════════════════════════ */
export function CoffeeCup() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`sd-obj sd-coffee${hovered ? ' sd-coffee-hover' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="☕ fuel"
    >
      <div className="cof-steams">
        <div className="cof-wisp cof-w1" />
        <div className="cof-wisp cof-w2" />
        <div className="cof-wisp cof-w3" />
      </div>
      <div className="cof-cup">
        <div className="cof-sleeve" />
        <div className="cof-liquid" />
        <div className="cof-handle" />
      </div>
      <div className="cof-saucer" />
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   CASSETTE TAPE — used in: Beliefs section (left)
══════════════════════════════════════════════════════ */
export function Cassette() {
  const [playing, setPlaying] = useState(false)
  return (
    <div
      className={`sd-obj sd-cassette${playing ? ' cas-playing' : ''}`}
      onClick={() => setPlaying(p => !p)}
      style={{ cursor: 'pointer' }}
      title={playing ? 'click to pause' : 'click to play'}
    >
      <div className="cas-shell">
        <div className="cas-label">
          <span className="cas-label-text">lofi ♪</span>
          <span className="cas-label-sub">side A</span>
        </div>
        <div className="cas-window">
          <div className={`cas-reel${playing ? ' cas-spin' : ''}`}><div className="cas-reel-hub" /></div>
          <div className="cas-tape-bridge" />
          <div className={`cas-reel${playing ? ' cas-spin' : ''}`}><div className="cas-reel-hub" /></div>
        </div>
        <div className="cas-bottom">
          <div className="cas-hole" />
          <div className="cas-notch" />
          <div className="cas-hole" />
        </div>
      </div>
      <div className="cas-status">{playing ? '▶ now playing' : '▷ press to play'}</div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   RUBBER DUCK — used in: Projects section (right)
══════════════════════════════════════════════════════ */
export function RubberDuck() {
  const [squeakKey, setSqueakKey] = useState(0)
  return (
    <div
      className="sd-obj sd-duck"
      onClick={() => setSqueakKey(k => k + 1)}
      style={{ cursor: 'pointer' }}
      title="click me!"
    >
      <div className="duck-figure">
        <div className="duck-body">
          <div className="duck-head">
            <div className="duck-eye" /><div className="duck-pupil" />
            <div className="duck-beak-top" /><div className="duck-beak-bot" />
          </div>
          <div className="duck-wing" />
          <div className="duck-tail" />
        </div>
      </div>
      <div className="duck-water"><div className="duck-ripple" /></div>
      {squeakKey > 0 && <div key={squeakKey} className="duck-squeak-bubble">SQUEAK! 🎵</div>}
      {squeakKey === 0 && <div className="duck-hint">click me!</div>}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   BOOK STACK — used in: ByTheNumbers section (left)
══════════════════════════════════════════════════════ */
const BOOKS = [
  { color: '#7C3AED', light: '#C4B5FD', title: 'React',  width: 78 },
  { color: '#C03020', light: '#FCA5A5', title: 'Python', width: 68 },
  { color: '#0284C7', light: '#7DD3FC', title: 'Linux',  width: 73 },
]
export function BookStack() {
  return (
    <div className="sd-obj sd-books" title="current reads">
      {BOOKS.map((b, i) => (
        <div key={i} className="sb-book"
          style={{ background: b.color, width: b.width, '--book-light': b.light, '--book-i': i }}>
          <div className="sb-spine" style={{ background: b.light }} />
          <span className="sb-label">{b.title}</span>
          <div className="sb-pages" />
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   PUSH PIN NOTE — used in: WhatILookFor section (right)
══════════════════════════════════════════════════════ */
export function PinNote() {
  return (
    <div className="sd-obj sd-pin-note" title="life philosophy">
      <div className="pn-pin">
        <div className="pn-head" />
        <div className="pn-stem" />
      </div>
      <div className="pn-card">
        <p className="pn-line">make things,</p>
        <p className="pn-line">break things,</p>
        <p className="pn-line bold">fix things.</p>
        <p className="pn-sig">— dharaneesh ✦</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   FAIRY LIGHTS — used in: Connect section (left)
══════════════════════════════════════════════════════ */
const BULB_COLORS = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#FF6BDB','#FF9A3C']
export function FairyLights() {
  return (
    <div className="sd-obj sd-fairy-lights" title="vibes ✨">
      <svg className="fl-wire" width="80" height="30" viewBox="0 0 80 30" fill="none">
        <path d="M2 4 Q14 18 26 6 Q38 -2 50 10 Q62 22 78 8"
          stroke="#C8C0B8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
      <div className="fl-bulbs">
        {BULB_COLORS.map((col, i) => (
          <div key={i} className="fl-bulb-unit" style={{ '--delay': `${i * 0.25}s` }}>
            <div className="fl-cap" />
            <div className="fl-globe" style={{ background: col, '--glow': col }} />
            <div className="fl-glow-halo" style={{ background: col }} />
          </div>
        ))}
      </div>
    </div>
  )
}
