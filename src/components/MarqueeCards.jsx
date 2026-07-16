import portfolioData from '../data/portfolio.json'

const REPEAT_COUNT = 8

export default function MarqueeCards() {
  const { personality } = portfolioData
  const items = Array.from({ length: REPEAT_COUNT }, () => personality).flat()

  return (
    <div className="marquee-section">
      <p className="marquee-label">What's my deal?</p>
      <div className="marquee-container">
        <div className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="marquee-card">
              <span className="marquee-card-emoji">{item.emoji}</span>
              {item.label}
            </span>
          ))}
        </div>
        <div className="marquee-track">
          {items.map((item, i) => (
            <span key={`clone-${i}`} className="marquee-card">
              <span className="marquee-card-emoji">{item.emoji}</span>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
