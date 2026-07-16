import portfolioData from '../data/portfolio.json'
import MarqueeCards from './MarqueeCards'
import { CoffeeCup } from './SideDecorations'

const SKILL_ICONS = {
  'Python': '🐍', 'JavaScript': 'JS', 'TypeScript': 'TS', 'C': 'C',
  'C++': 'C++', 'HTML/CSS': '🌐', 'React': '⚛', 'Next.js': '▲',
  'Tailwind CSS': '🌊', 'Node.js': '🟢', 'Flask': '🧪', 'PostgreSQL': '🐘',
  'REST APIs': '📡', 'Git': '🌿', 'Docker': '🐳', 'Neovim': '⌨',
  'Linux': '🐧', 'Hyprland': '◈',
}

/* CSS polaroid frame decoration */
function PolaroidDeco() {
  return (
    <div className="about-polaroid" aria-hidden="true">
      <div className="polaroid-frame">
        <div className="polaroid-photo">
          {/* ASCII art style code inside */}
          <div className="polaroid-code">
            <div><span className="pc-kw">const</span> me = {'{'}</div>
            <div>&nbsp;&nbsp;<span className="pc-str">"name"</span>: <span className="pc-val">"Dharaneesh"</span>,</div>
            <div>&nbsp;&nbsp;<span className="pc-str">"role"</span>: <span className="pc-val">"dev"</span></div>
            <div>{'}'}</div>
          </div>
        </div>
        <div className="polaroid-caption">circa 2025 ✦</div>
      </div>
      {/* Tape strip across top */}
      <div className="polaroid-tape" />
    </div>
  )
}

/* Coffee ring stain */
function CoffeeRingDeco() {
  return (
    <div className="about-coffee-ring" aria-hidden="true">
      <div className="acr-outer" />
      <div className="acr-inner" />
    </div>
  )
}

/* Handwritten underline under bio */
function HandUnderline() {
  return (
    <svg className="about-hand-underline" width="180" height="10" viewBox="0 0 180 10" aria-hidden="true">
      <path d="M2 6 Q45 2 90 6 Q135 10 178 5"
        stroke="#A5B4FC" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

export default function About() {
  return (
    <section className="section about-section" id="about">
      <p className="section-label animate-in">About</p>

      {/* Right gutter: coffee cup */}
      <div className="gutter-deco gutter-right" style={{ top: '4rem' }}>
        <CoffeeCup />
      </div>

      {/* Polaroid floats top-right */}
      <PolaroidDeco />

      {/* Bio */}
      <div className="about-bio-wrap animate-in animate-in-d1">
        <p className="about-bio">{portfolioData.bio}</p>
        <HandUnderline />
        <a
          className="about-cta"
          href={`https://github.com/${portfolioData.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          See the code <span>↗</span>
        </a>
      </div>

      {/* Philosophy pull quote */}
      <div className="about-philosophy-strip animate-in animate-in-d2">
        <span className="about-philosophy-q">"</span>
        <span className="about-philosophy-text">{portfolioData.philosophy}</span>
        <span className="about-philosophy-q">"</span>
      </div>

      {/* Coffee ring near skills */}
      <CoffeeRingDeco />

      {/* Skills */}
      <div className="about-skills-section animate-in animate-in-d3">
        <p className="about-skills-label">Stack</p>
        <div className="about-skills-grid">
          {portfolioData.skills.map((group, i) => (
            <div key={i} className="about-skill-group">
              <h3 className="about-skill-cat">{group.category}</h3>
              <div className="about-skill-items">
                {group.items.map((skill, j) => (
                  <span key={j} className="about-skill-pill">
                    <span className="about-skill-icon">{SKILL_ICONS[skill] || skill[0]}</span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <MarqueeCards />
    </section>
  )
}
