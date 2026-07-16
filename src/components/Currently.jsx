import portfolioData from '../data/portfolio.json'
import { StickyNote } from './SideDecorations'

/* Blinking cursor inside the code block */
function TerminalDeco() {
  return (
    <div className="currently-terminal" aria-hidden="true">
      <div className="ct-bar">
        <span className="ct-dot" style={{ background: '#ff5f56' }} />
        <span className="ct-dot" style={{ background: '#ffbd2e' }} />
        <span className="ct-dot" style={{ background: '#27c93f' }} />
        <span className="ct-title">zsh</span>
      </div>
      <div className="ct-body">
        <div className="ct-line">
          <span className="ct-prompt">~/projects</span>
          <span className="ct-cmd"> git status</span>
        </div>
        <div className="ct-line ct-green">On branch main</div>
        <div className="ct-line ct-muted">Changes to be committed:</div>
        <div className="ct-line">
          <span className="ct-muted">&nbsp;&nbsp;modified:&nbsp;</span>
          <span className="ct-green">App.jsx</span>
        </div>
        <div className="ct-line ct-blink-line">
          <span className="ct-prompt">~/projects</span>
          <span className="ct-cursor">▋</span>
        </div>
      </div>
    </div>
  )
}

/* Floating sticky label */
function WipBadge() {
  return (
    <div className="currently-wip-badge" aria-hidden="true">
      <span className="wip-dot" />
      in progress
    </div>
  )
}

export default function Currently() {
  const c = portfolioData.currently
  return (
    <section className="section currently-section" id="currently">
      <p className="section-label animate-in">Currently Working On</p>

      {/* Right gutter: sticky note */}
      <div className="gutter-deco gutter-right" style={{ top: '3rem' }}>
        <StickyNote />
      </div>

      <div className="current-card animate-in animate-in-d1">
        <div className="current-card-glow" />
        <WipBadge />

        <div className="current-status-chip">
          <span className="current-status-pulse" />
          <span>{c.status}</span>
        </div>

        <h2 className="current-title">{c.title}</h2>
        <p className="current-desc">{c.description}</p>
        <p className="current-note">✈️ &nbsp;{c.note}</p>

        <div className="current-stack">
          {['React Native', 'Python', 'AI', 'Flask'].map((t, i) => (
            <span key={i} className="current-stack-pill">{t}</span>
          ))}
        </div>

        <div className="current-corner-deco">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="80" cy="0" r="60" stroke="currentColor" strokeWidth="1" opacity="0.08" fill="none"/>
            <circle cx="80" cy="0" r="40" stroke="currentColor" strokeWidth="1" opacity="0.06" fill="none"/>
            <circle cx="80" cy="0" r="20" stroke="currentColor" strokeWidth="1" opacity="0.05" fill="none"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
