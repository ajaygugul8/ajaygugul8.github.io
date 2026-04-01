import { useCallback, useEffect, useMemo, useState } from 'react'
import AnimationStage from './AnimationStage'

export const PORTFOLIO_ONBOARDING_KEY = 'portfolio-onboarding-complete'

const GREETINGS = [
  { lang: 'English', text: 'Hello' },
  { lang: 'Spanish', text: 'Hola' },
  { lang: 'French', text: 'Bonjour' },
  { lang: 'Hindi', text: 'नमस्ते' },
  { lang: 'Telugu', text: 'నమస్కారం' },
  { lang: 'Japanese', text: 'こんにちは' },
  // { lang: 'Arabic', text: 'مرحبًا' },
  // { lang: 'German', text: 'Hallo' },
  // { lang: 'Italian', text: 'Ciao' },
  // { lang: 'Mandarin', text: '你好' },
  // { lang: 'Portuguese', text: 'Olá' },
  { lang: 'Korean', text: '안녕하세요' },
]

/** Total time on welcome screen before entering the portfolio */
const WELCOME_DURATION_MS = 3_000
/** Time per greeting when motion is allowed (~full loop in 10s) */
const ROTATE_MS = 300

export default function WelcomeFlow({ onComplete }) {
  const [index, setIndex] = useState(0)

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const finish = useCallback(() => {
    try {
      localStorage.setItem(PORTFOLIO_ONBOARDING_KEY, '1')
    } catch {
      /* ignore quota / private mode */
    }
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const id = window.setTimeout(finish, WELCOME_DURATION_MS)
    return () => window.clearTimeout(id)
  }, [finish])

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setIndex((i) => {
        const nextIndex = i + 1
        if (nextIndex >= GREETINGS.length) {
          finish()
          return i
        }
        return nextIndex
      })
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [reducedMotion, finish])

  return (
    <div
      className="relative flex min-h-svh items-center justify-center bg-black"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <h1 id="welcome-title" className="sr-only">
        Multilingual welcome
      </h1>
      <div
        className="text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        {reducedMotion ? (
          <p className="font-light text-white">
            <span className="block text-6xl">
              Hello
            </span>
          </p>
        ) : (
          <p
            key={`${GREETINGS[index].lang}-${index}`}
            className="font-light text-white"
            style={{ animation: 'welcomeFade 0.35s ease-out both' }}
          >
            <span className="block text-6xl">
              {GREETINGS[index].text}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
