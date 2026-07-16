import portfolioData from '../data/portfolio.json'
import { Cactus } from './SideDecorations'

export default function Philosophy() {
  const words = portfolioData.philosophy.split(' ')

  return (
    <section className="section philosophy-section" id="philosophy">
      {/* Left gutter: cactus */}
      <div className="gutter-deco gutter-left" style={{ top: '3rem' }}>
        <Cactus />
      </div>

      <div className="philosophy-wrap animate-in">

        {/* Decorative: notebook ruled lines behind quote */}
        <div className="philosophy-ruled-lines" aria-hidden="true">
          {[...Array(8)].map((_, i) => <div key={i} className="phil-rule-line" />)}
        </div>

        {/* Floating deco symbols */}
        <div className="philosophy-decos" aria-hidden="true">
          <span className="phil-deco phil-deco-1">✱</span>
          <span className="phil-deco phil-deco-2">✦</span>
          <span className="phil-deco phil-deco-3">◈</span>
          {/* Wavy bracket */}
          <svg className="phil-bracket" width="18" height="80" viewBox="0 0 18 80" fill="none">
            <path d="M14 4 Q4 12 14 24 Q4 36 14 48 Q4 60 14 72 L14 76"
              stroke="#D4D0C8" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Big quote mark */}
        <div className="philosophy-quote-mark" aria-hidden="true">"</div>

        {/* Word-by-word */}
        <p className="philosophy-text">
          {words.map((word, i) => (
            <span key={i} className="philosophy-word" style={{ animationDelay: `${i * 0.06}s` }}>
              {word}{' '}
            </span>
          ))}
          {/* Blinking cursor at end */}
          <span className="philosophy-cursor" aria-hidden="true">|</span>
        </p>

        <div className="philosophy-footer">
          <span className="philosophy-dash">—</span>
          <span className="philosophy-attribution">a mantra I live by</span>
          <div className="philosophy-rule" />
        </div>

        {/* Small ink stamp */}
        <div className="philosophy-stamp" aria-hidden="true">
          <span>approved</span>
          <span>✓</span>
        </div>
      </div>
    </section>
  )
}
