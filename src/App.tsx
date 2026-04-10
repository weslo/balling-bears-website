import type { CSSProperties } from 'react'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import bearClaw from './assets/bear-claw.png'

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

const subtitleRotationMs = 3000
const subtitleExitDurationMs = 260
const subtitleEnterDurationMs = 620

type SubtitlePhase = 'entering' | 'visible' | 'exiting'

function shufflePhrases(phrases: string[]) {
  const shuffledPhrases = [...phrases]

  for (let index = shuffledPhrases.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const currentPhrase = shuffledPhrases[index]

    shuffledPhrases[index] = shuffledPhrases[swapIndex] ?? ''
    shuffledPhrases[swapIndex] = currentPhrase ?? ''
  }

  return shuffledPhrases
}

// Keep phrases fresh by shuffling them and only repeating after the full set is shown.
function buildPhraseQueue(currentPhrase?: string) {
  if (subtitlePhrases.length <= 1) {
    return [...subtitlePhrases]
  }

  const queuedPhrases = shufflePhrases(subtitlePhrases)

  if (currentPhrase && queuedPhrases[0] === currentPhrase) {
    const swapIndex = queuedPhrases.findIndex((phrase) => phrase !== currentPhrase)

    if (swapIndex > 0) {
      const firstPhrase = queuedPhrases[0]

      queuedPhrases[0] = queuedPhrases[swapIndex] ?? ''
      queuedPhrases[swapIndex] = firstPhrase ?? ''
    }
  }

  return queuedPhrases
}

function getNextPhrase(
  phraseQueueRef: { current: string[] },
  currentPhrase?: string,
) {
  if (phraseQueueRef.current.length === 0) {
    phraseQueueRef.current = buildPhraseQueue(currentPhrase)
  }

  return phraseQueueRef.current.shift() ?? currentPhrase ?? ''
}

function App() {
  const phraseQueueRef = useRef(buildPhraseQueue())
  const [subtitle, setSubtitle] = useState(() => getNextPhrase(phraseQueueRef))
  const [subtitlePhase, setSubtitlePhase] = useState<SubtitlePhase>('entering')
  const isTransitioningRef = useRef(false)
  const exitTimeoutRef = useRef<number | null>(null)
  const enterTimeoutRef = useRef<number | null>(null)
  const heroStyle = {
    '--hero-claw-image': `url(${bearClaw})`,
  } as CSSProperties

  const rotateSubtitle = useEffectEvent(() => {
    if (isTransitioningRef.current) {
      return
    }

    isTransitioningRef.current = true
    setSubtitlePhase('exiting')

    exitTimeoutRef.current = window.setTimeout(() => {
      setSubtitle((currentSubtitle) =>
        getNextPhrase(phraseQueueRef, currentSubtitle),
      )
      setSubtitlePhase('entering')
      exitTimeoutRef.current = null

      enterTimeoutRef.current = window.setTimeout(() => {
        setSubtitlePhase('visible')
        isTransitioningRef.current = false
        enterTimeoutRef.current = null
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
      enterTimeoutRef.current = null
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
      <section className="hero" style={heroStyle}>
        <div className="hero-watermark" aria-hidden="true" />
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
