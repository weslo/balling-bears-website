import landingFrame from './assets/landing-frame.png'

function App() {
  return (
    <main className="app">
      <section className="hero">
        <img className="hero-frame" src={landingFrame} alt="" />
        <div className="hero-content">
          <h1>Balling Bears</h1>
          <a
            className="discord-button"
            href="https://discord.gg/jBAHvEAukT"
            target="_blank"
            rel="noreferrer"
          >
            Join Discord
          </a>
          <div className="schedule">
            <h2>📅 Raid Schedule</h2>
            <p>Tuesday 6-9pm PST</p>
            <p>Thursday 6-9pm PST</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
