export default function VideoPlayer() {
  return (
    <div className="video-player" onClick={() => window.open('https://github.com/dharaneesh-sys', '_blank')}>
      <div className="video-placeholder">
        <div className="video-play-btn">▶</div>
        <span>Demo reel coming soon</span>
      </div>
      <div className="video-time">0:00 / 2:30</div>
    </div>
  )
}
