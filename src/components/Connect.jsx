import portfolioData from '../data/portfolio.json'
import AIDisclosure from './AIDisclosure'
import { FairyLights } from './SideDecorations'

const LINKS = [
  { label: 'Resume',      href: '/resume.pdf', download: true, desc: 'Download PDF',       icon: '↓' },
  { label: 'GitHub',      href: portfolioData.social.github, desc: 'See the code',       icon: '⌥' },
  { label: 'All Projects', href: `https://github.com/${portfolioData.githubUsername}?tab=repositories`, desc: 'Browse repositories', icon: '◈' },
  ...(portfolioData.social.email ? [{
    label: 'Email', href: `mailto:${portfolioData.social.email}`, desc: 'Drop a line', icon: '✉',
  }] : []),
]

/* Paper airplane SVG decoration */
function PaperPlane() {
  return (
    <div className="connect-plane" aria-hidden="true">
      <svg width="56" height="44" viewBox="0 0 56 44" fill="none">
        {/* Body */}
        <path d="M2 22 L54 4 L36 42 L26 28 Z" fill="#E2DFFF" stroke="#A5B4FC" strokeWidth="1.5"
          strokeLinejoin="round"/>
        {/* Wing crease */}
        <path d="M26 28 L54 4" stroke="#A5B4FC" strokeWidth="1" strokeLinecap="round"/>
        {/* Trail */}
        <path d="M20 30 Q12 34 8 38" stroke="#C4B5FD" strokeWidth="1.5"
          fill="none" strokeLinecap="round" strokeDasharray="3 3"/>
      </svg>
    </div>
  )
}

/* Envelope deco */
function EnvelopeDeco() {
  return (
    <div className="connect-envelope" aria-hidden="true">
      <div className="env-body">
        <div className="env-flap" />
        <div className="env-lines">
          <div className="env-line" />
          <div className="env-line short" />
        </div>
      </div>
    </div>
  )
}

/* Wavy send-line under links */
function SendLine() {
  return (
    <svg className="connect-send-line" width="100%" height="8" viewBox="0 0 400 8" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 4 Q50 0 100 4 Q150 8 200 4 Q250 0 300 4 Q350 8 400 4"
        stroke="#E8E8E8" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

export default function Connect() {
  return (
    <>
      <section className="section connect-section" id="connect">
        <p className="section-label animate-in">Connect</p>

        {/* Left gutter: fairy lights */}
        <div className="gutter-deco gutter-left" style={{ top: '2rem' }}>
          <FairyLights />
        </div>

        {/* Floating decorations */}
        <PaperPlane />
        <EnvelopeDeco />

        {/* Big CTA heading */}
        <div className="connect-hero-text animate-in animate-in-d1">
          <h2 className="connect-heading">
            Let's build something<br />
            <em className="connect-heading-accent">worth talking about.</em>
          </h2>
          <p className="connect-sub">
            I'm always open to new projects, collabs, and good conversations.
            Reach out — I reply fast.
          </p>
        </div>

        {/* Link rows */}
        <div className="connect-rows animate-in animate-in-d2">
          {LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              download={link.download || undefined}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="connect-row"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <span className="connect-row-icon">{link.icon}</span>
              <span className="connect-row-text">
                <span className="connect-row-label">{link.label}</span>
                <span className="connect-row-desc">{link.desc}</span>
              </span>
              <span className="connect-row-arrow">↗</span>
            </a>
          ))}
          <SendLine />
        </div>

        {/* Availability */}
        <div className="connect-avail animate-in animate-in-d3">
          <span className="connect-avail-dot" />
          <span>Available for work · GMT +5:30</span>
        </div>
      </section>

      <AIDisclosure />

      <footer className="footer">
        <p className="footer-text">
          © {new Date().getFullYear()} {portfolioData.name}. Built with curiosity.
        </p>
        <p
          className="footer-music"
          onClick={() => window.open('https://www.youtube.com/watch?v=1vrEljMfXYo', '_blank')}
          title="Take me home"
        >
          ♫ Almost heaven, West Virginia ♫
        </p>
      </footer>
    </>
  )
}
