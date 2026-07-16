import portfolioData from '../data/portfolio.json'
import { PinNote } from './SideDecorations'

const ITEMS = [
  {
    num: '01', emoji: '🌆',
    title: 'Impactful work',
    desc: portfolioData.whatILookFor[0].description,
    accent: '#059669', tag: 'purpose-driven',
  },
  {
    num: '02', emoji: '🧠',
    title: 'Meaningful challenges',
    desc: portfolioData.whatILookFor[1].description,
    accent: '#7C3AED', tag: 'growth-oriented',
  },
  {
    num: '03', emoji: '🤝',
    title: 'Great people to build with',
    desc: portfolioData.whatILookFor[2].description,
    accent: '#0284C7', tag: 'team-first',
  },
]

/* Star sticker */
function StarSticker({ style }) {
  return (
    <div className="wilf-star-sticker" style={style} aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2 L16.5 10.5 L25 10.5 L18.5 16 L21 24.5 L14 19.5 L7 24.5 L9.5 16 L3 10.5 L11.5 10.5 Z"
          fill="currentColor"/>
      </svg>
    </div>
  )
}

/* Checkmark stamp for each row */
function CheckStamp({ accent }) {
  return (
    <div className="wilf-check-stamp" style={{ color: accent }} aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 10 L9 13 L14 7" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

/* Scribble arrow */
function ScribbleArrow() {
  return (
    <svg className="wilf-scribble-arrow" width="50" height="30" viewBox="0 0 50 30" aria-hidden="true">
      <path d="M4 20 Q12 4 24 14 Q32 22 44 8"
        stroke="#D4D0C8" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2"/>
      <path d="M38 4 L46 8 L40 14" stroke="#D4D0C8" strokeWidth="2"
        fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function WhatILookFor() {
  return (
    <section className="section wilf-section" id="what-i-look-for">
      <p className="section-label animate-in">What I look for</p>
      <p className="wilf-intro animate-in animate-in-d1">
        The criteria that make a role worth the early mornings and late nights.
      </p>

      {/* Right gutter: push pin note */}
      <div className="gutter-deco gutter-right" style={{ top: '5rem' }}>
        <PinNote />
      </div>

      {/* Star stickers floating in section */}
      <StarSticker style={{ top: '2rem', right: '-0.5rem', color: '#FCD34D', transform: 'rotate(15deg)', fontSize: 22 }} />
      <StarSticker style={{ top: '5rem', right: '1.5rem', color: '#C4B5FD', transform: 'rotate(-10deg)', fontSize: 14, opacity: 0.6 }} />
      <ScribbleArrow />

      <div className="wilf-list">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="wilf-row animate-in"
            style={{ '--wilf-accent': item.accent, animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <div className="wilf-row-num">{item.num}</div>
            <div className="wilf-row-body">
              <div className="wilf-row-header">
                <span className="wilf-row-emoji">{item.emoji}</span>
                <h3 className="wilf-row-title">{item.title}</h3>
                <span className="wilf-row-tag">{item.tag}</span>
              </div>
              <p className="wilf-row-desc">{item.desc}</p>
            </div>
            {/* Checkmark stamp on right */}
            <CheckStamp accent={item.accent} />
            <div className="wilf-row-bar" />
          </div>
        ))}
      </div>
    </section>
  )
}
