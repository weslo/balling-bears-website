import { startTransition, useEffect, useEffectEvent, useState } from 'react'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import landingFrame from './assets/landing-frame.png'

// Update this list to change the rotating landing subtitle phrases.
const subtitlePhrases = [
  'We squeeze lemons here!',
  'Come chillmax with us!',
  "Get in the Dawnbreaker, we're going keying!",
  'Watch your feet!',
  'Union-approved!',
  'Clear comms please!',
  'Tekkers!',
]

const subtitleRotationMs = 5000

function pickRandomPhrase(currentPhrase?: string) {
  if (subtitlePhrases.length <= 1) {
    return subtitlePhrases[0] ?? ''
  }

  let nextPhrase = currentPhrase

  while (nextPhrase === currentPhrase) {
    nextPhrase =
      subtitlePhrases[Math.floor(Math.random() * subtitlePhrases.length)] ?? ''
  }

  return nextPhrase ?? ''
}

function App() {
  const [subtitle, setSubtitle] = useState(() => pickRandomPhrase())
  const [subtitleVersion, setSubtitleVersion] = useState(0)

  const rotateSubtitle = useEffectEvent(() => {
    setSubtitle((currentSubtitle) => {
      const nextSubtitle = pickRandomPhrase(currentSubtitle)

      if (nextSubtitle !== currentSubtitle) {
        startTransition(() => {
          setSubtitleVersion((version) => version + 1)
        })
      }

      return nextSubtitle
    })
  })

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      rotateSubtitle()
    }, subtitleRotationMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [rotateSubtitle])

  return (
    <main className="app">
      <section className="hero">
        <img className="hero-frame" src={landingFrame} alt="" />
        <div className="hero-content">
          <h1>Balling Bears</h1>
          <p key={subtitleVersion} className="subtitle" aria-live="polite">
            {subtitle}
          </p>
          <a
            className="discord-button"
            href="https://discord.gg/jBAHvEAukT"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon aria-hidden="true" icon={faDiscord} />
            <span>Join Discord</span>
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
