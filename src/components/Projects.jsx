import { useState } from 'react'
import portfolioData from '../data/portfolio.json'
import { RubberDuck } from './SideDecorations'

/* ── Project icon config ── */
const ICON_CFG = {
  'ClutchD':              { bg: '#0F0F0F', color: '#fff', char: 'C' },
  'CityCare':             { bg: '#065F46', color: '#6EE7B7', char: '🌆' },
  'Maths Problem Solver': { bg: '#3730A3', color: '#A5B4FC', char: '∑' },
  'Hyprland Dots':        { bg: '#1A1A2E', color: '#7C3AED', char: 'H' },
  'Neovim Config':        { bg: '#22543D', color: '#68D391', char: 'N' },
  'Linux Rice Scripts':   { bg: '#7C2D12', color: '#FCA5A5', char: '🐧' },
  'Portfolio v2':         { bg: '#1E1B4B', color: '#C4B5FD', char: '◈' },
}

/* ── Screenshot config per project ── */
/*
  Hyprland Dots screenshots:
    20260712_081735.png  — teal wallpaper (electric pole + red balloon)
    20260712_082633.png  — neofetch in terminal (CachyOS)
    20260712_083046.png  — cmatrix falling rain
    20260712_083518.png  — forest wallpaper
    203933_hyprshot.png  — VSCode with hypr config (Lua)

  Maths Problem Solver screenshots:
    20260712_083614.png  — Numerical Methods hero + Power Method
    20260712_083621.png  — Newton Divided Difference
    20260712_083629.png  — Runge-Kutta
*/
const SHOTS = {
  'Hyprland Dots': [
    { src: '/screenshots/20260712_081735.png',  angle: -6,  x: 2,  y: 2,  w: 340, z: 2 },
    { src: '/screenshots/203933_hyprshot.png',  angle:  4,  x: 38, y: 18, w: 300, z: 3 },
    { src: '/screenshots/20260712_082633.png',  angle: -2,  x: 18, y: 52, w: 260, z: 4 },
  ],
  'Maths Problem Solver': [
    { src: '/screenshots/20260712_083614.png',  angle: -4,  x: 2,  y: 4,  w: 340, z: 2 },
    { src: '/screenshots/20260712_083621.png',  angle:  5,  x: 40, y: 28, w: 270, z: 3 },
    { src: '/screenshots/20260712_083629.png',  angle: -2,  x: 20, y: 58, w: 250, z: 4 },
  ],
}

/* ── CSS floating mockup for projects with no screenshots ── */
function CodeMockup({ project, angle, x, y, z }) {
  const color = ICON_CFG[project.name]?.bg ?? '#111'
  return (
    <div className="proj-float-window"
      style={{ transform: `rotate(${angle}deg)`, left: `${x}%`, top: `${y}%`, zIndex: z }}>
      {/* title bar */}
      <div className="pfw-bar" style={{ background: color }}>
        <span className="pfw-dot" style={{ background: '#ff5f56' }} />
        <span className="pfw-dot" style={{ background: '#ffbd2e' }} />
        <span className="pfw-dot" style={{ background: '#27c93f' }} />
        <span className="pfw-title">{project.name.toLowerCase().replace(/\s/g, '-')}</span>
      </div>
      <div className="pfw-body">
        <div className="pfw-line"><span className="pfw-c1">$ </span><span className="pfw-c2">cd {project.name.toLowerCase().replace(/\s/g, '-')}</span></div>
        <div className="pfw-line"><span className="pfw-c1">$ </span><span className="pfw-c2">./run.sh</span></div>
        <div className="pfw-line pfw-ok">✓ Ready on :3000</div>
        <div className="pfw-line pfw-dim">{project.tags.join(' · ')}</div>
        <div className="pfw-spacer" />
        <div className="pfw-line pfw-dim">{project.context}</div>
        <div className="pfw-line" style={{ marginTop: 8 }}>
          {project.tags.slice(0, 2).map((t, i) => (
            <span key={i} className="pfw-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Floating scattered mockups zone ── */
function MockupZone({ project }) {
  const shots = SHOTS[project.name]

  if (shots) {
    return (
      <div className="proj-mockup-zone" aria-hidden="true">
        {shots.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={`${project.name} screenshot ${i + 1}`}
            className="proj-screenshot-float"
            style={{
              width: s.w,
              transform: `rotate(${s.angle}deg)`,
              left: `${s.x}%`,
              top: `${s.y}%`,
              zIndex: s.z,
              animationDelay: `${i * 60}ms`,
            }}
          />
        ))}
      </div>
    )
  }

  /* Fallback: CSS code windows */
  const CONFIGS = [
    { angle: -5, x: 3,  y: 6,  z: 2 },
    { angle:  6, x: 38, y: 25, z: 3 },
    { angle: -2, x: 18, y: 58, z: 4 },
  ]
  return (
    <div className="proj-mockup-zone" aria-hidden="true">
      {CONFIGS.map((c, i) => (
        <CodeMockup key={i} project={project} {...c} />
      ))}
    </div>
  )
}

/* ── Project row ── */
function ProjectRow({ project, hovered, onEnter, onLeave }) {
  const icon = ICON_CFG[project.name] ?? { bg: '#111', color: '#fff', char: project.name[0] }
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`hu-proj-row ${hovered ? 'hu-proj-row-active' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Icon */}
      <div
        className="hu-proj-icon"
        style={{ background: icon.bg, color: icon.color }}
      >
        {typeof icon.char === 'string' && icon.char.length <= 2
          ? <span className="hu-icon-char">{icon.char}</span>
          : <span className="hu-icon-emoji">{icon.char}</span>}
      </div>

      {/* Info */}
      <div className="hu-proj-info">
        <div className="hu-proj-name">{project.name}</div>
        <div className="hu-proj-desc">{project.description}</div>
      </div>

      {/* Arrow */}
      <span className="hu-proj-arrow">↗</span>
    </a>
  )
}

/* ── Other work row (simple, no mockups) ── */
function OtherRow({ item }) {
  const icon = ICON_CFG[item.name] ?? { bg: '#F0EDE8', color: '#6B6560', char: item.name[0] }
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hu-other-row"
    >
      <div className="hu-proj-icon hu-proj-icon-sm"
        style={{ background: icon.bg, color: icon.color }}>
        <span className="hu-icon-char" style={{ fontSize: 13 }}>{icon.char}</span>
      </div>
      <div className="hu-proj-info">
        <div className="hu-proj-name hu-proj-name-sm">{item.name}</div>
        <div className="hu-proj-desc">{item.description}</div>
      </div>
      <span className="hu-proj-arrow" style={{ opacity: 0.4 }}>↗</span>
    </a>
  )
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */
export default function Projects() {
  const { projects, otherWork } = portfolioData
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <section className="section" id="projects">

      {/* Right gutter: rubber duck */}
      <div className="gutter-deco gutter-right" style={{ top: '4rem' }}>
        <RubberDuck />
      </div>

      {/* ── Recently Made ── */}
      <p className="section-label animate-in">Recently Made ▶</p>

      <div className="hu-projects-canvas">

        {/* Left: project list */}
        <div className="hu-list-col">
          {projects.map((project, i) => (
            <ProjectRow
              key={i}
              project={project}
              hovered={activeIdx === i}
              onEnter={() => setActiveIdx(i)}
              onLeave={() => setActiveIdx(null)}
            />
          ))}
        </div>

        {/* Right: floating mockup zone */}
        <div className="hu-mockup-col">
          {activeIdx !== null && (
            <MockupZone key={activeIdx} project={projects[activeIdx]} />
          )}
          {activeIdx === null && (
            <div className="hu-mockup-placeholder">
              <p>hover a project →</p>
            </div>
          )}
        </div>

      </div>

      {/* ── Other Work ── */}
      {otherWork && otherWork.length > 0 && (
        <>
          <p className="other-work-label" style={{ marginTop: '4rem' }}>Other Work ⁕</p>
          <div className="hu-other-list">
            {otherWork.map((item, i) => (
              <OtherRow key={i} item={item} />
            ))}
          </div>
        </>
      )}

    </section>
  )
}
