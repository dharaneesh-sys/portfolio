import portfolioData from '../data/portfolio.json'

export default function AIDisclosure() {
  const text = portfolioData.aiDisclosure
  // Split on the bracketed list
  const before = text.substring(0, text.indexOf('['))
  const list = text.substring(text.indexOf('['), text.indexOf(']') + 1)
  const after = text.substring(text.indexOf(']') + 1)

  return (
    <div className="ai-disclosure">
      <p className="ai-disclosure-text">
        {before}
        <span className="bracket-list">{list}</span>
        {after}
      </p>
    </div>
  )
}
