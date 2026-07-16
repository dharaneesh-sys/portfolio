import portfolioData from '../data/portfolio.json'

export default function MobileNote() {
  return (
    <div className="mobile-note">
      <p className="mobile-note-text">{portfolioData.mobileNote}</p>
    </div>
  )
}
