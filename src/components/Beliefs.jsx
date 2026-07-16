import portfolioData from '../data/portfolio.json'

export default function Beliefs() {
  return (
    <section className="section" id="beliefs">
      <p className="section-label animate-in">3 things I believe in</p>
      <div className="beliefs-grid">
        {portfolioData.beliefs.map((belief, i) => (
          <div
            key={i}
            className="belief-card animate-in"
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <span className="belief-number">0{i + 1}</span>
            <h3>{belief.title}</h3>
            <p>{belief.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
