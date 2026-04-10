import { useEffect, useEffectEvent, useRef, useState } from 'react'
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
const subtitleExitDurationMs = 260
const subtitleEnterDurationMs = 620

type SubtitlePhase = 'entering' | 'visible' | 'exiting'

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
  const [subtitlePhase, setSubtitlePhase] = useState<SubtitlePhase>('entering')
  const isTransitioningRef = useRef(false)
  const exitTimeoutRef = useRef<number | null>(null)
  const enterTimeoutRef = useRef<number | null>(null)

  const rotateSubtitle = useEffectEvent(() => {
    if (isTransitioningRef.current) {
      return
    }

    isTransitioningRef.current = true
    setSubtitlePhase('exiting')

    exitTimeoutRef.current = window.setTimeout(() => {
      setSubtitle((currentSubtitle) => pickRandomPhrase(currentSubtitle))
      setSubtitlePhase('entering')

      enterTimeoutRef.current = window.setTimeout(() => {
        setSubtitlePhase('visible')
        isTransitioningRef.current = false
      }, subtitleEnterDurationMs)
    }, subtitleExitDurationMs)
  })

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      rotateSubtitle()
    }, subtitleRotationMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [rotateSubtitle])

  useEffect(() => {
    enterTimeoutRef.current = window.setTimeout(() => {
      setSubtitlePhase('visible')
    }, subtitleEnterDurationMs)

    return () => {
      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current)
      }

      if (enterTimeoutRef.current !== null) {
        window.clearTimeout(enterTimeoutRef.current)
      }
    }
  }, [])

  return (
    <main className="app">
      <section className="hero">
        <img className="hero-frame" src={landingFrame} alt="" />
        <div className="hero-content">
          <h1>Balling Bears</h1>
          <p
            className={`subtitle ${subtitlePhase === 'visible' ? '' : `is-${subtitlePhase}`}`.trim()}
            aria-live="polite"
          >
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
