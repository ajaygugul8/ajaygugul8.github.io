import { useCallback, useEffect, useMemo, useState } from 'react'
import { PORTFOLIO_ONBOARDING_KEY } from './onboardingKey'
export { PORTFOLIO_ONBOARDING_KEY }

const GREETINGS = [
  { lang: 'English',  text: 'Hello' },
  { lang: 'Spanish',  text: 'Hola' },
  { lang: 'French',   text: 'Bonjour' },
  { lang: 'Hindi',    text: 'नमस्ते' },
  { lang: 'Telugu',   text: 'నమస్కారం' },
  { lang: 'Japanese', text: 'こんにちは' },
  { lang: 'Korean',   text: '안녕하세요' },
]

const ROTATE_MS       = 320
const WELCOME_HOLD_MS = 1_600
const CURTAIN_MS      = 1_000

export default function WelcomeFlow({ onComplete }) {
  const [phase, setPhase]         = useState('greetings')
  const [index, setIndex]         = useState(0)
  const [curtainUp, setCurtainUp] = useState(false)

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  // ← save to sessionStorage immediately on first mount
  // this way refresh will always find the key and skip the flow
  useEffect(() => {
    try {
      sessionStorage.setItem(PORTFOLIO_ONBOARDING_KEY, '1')
    } catch { /* ignore */ }
  }, [])

  const finish = useCallback(() => {
    onComplete()
  }, [onComplete])

  // greeting rotation
  useEffect(() => {
    if (phase !== 'greetings') return
    if (reducedMotion) {
      setPhase('welcome')
      return
    }
    const id = window.setInterval(() => {
      setIndex(i => {
        const next = i + 1
        if (next >= GREETINGS.length) {
          clearInterval(id)
          setPhase('welcome')
          return i
        }
        return next
      })
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [phase, reducedMotion])

  // welcome → curtain
  useEffect(() => {
    if (phase !== 'welcome') return
    const id = window.setTimeout(() => setPhase('curtain'), WELCOME_HOLD_MS)
    return () => clearTimeout(id)
  }, [phase])

  // curtain rises → finish
  useEffect(() => {
    if (phase !== 'curtain') return
    const t1 = window.setTimeout(() => setCurtainUp(true), 50)
    const t2 = window.setTimeout(finish, 50 + CURTAIN_MS)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [phase, finish])

  return (
    <>
      <style>{`
        @keyframes wf-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wf-welcome-in {
          0%   { opacity: 0; letter-spacing: 0.35em; filter: blur(6px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; letter-spacing: 0.18em; }
        }
        @keyframes wf-sub-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wf-curtain-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-110%); }
        }
      `}</style>

      {/* greetings phase */}
      {phase === 'greetings' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wf-title"
          style={{
            position: 'fixed', inset: 0,
            background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <h1 id="wf-title" style={{
            position: 'absolute', width: 1, height: 1,
            overflow: 'hidden', clip: 'rect(0,0,0,0)'
          }}>
            Multilingual welcome
          </h1>
          {reducedMotion ? (
            <p style={{ color: '#fff', fontSize: 'clamp(3rem,10vw,5rem)', fontWeight: 300, margin: 0 }}>
              Hello
            </p>
          ) : (
            <p
              key={`${GREETINGS[index].lang}-${index}`}
              aria-live="polite"
              aria-atomic="true"
              style={{
                color: '#fff',
                fontSize: 'clamp(3rem,10vw,5rem)',
                fontWeight: 300,
                margin: 0,
                animation: 'wf-fade-in 0.3s ease-out both',
              }}
            >
              {GREETINGS[index].text}
            </p>
          )}
        </div>
      )}

      {/* welcome phase */}
      {phase === 'welcome' && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1rem',
            zIndex: 9999,
          }}
        >
          <p
            style={{
              color: '#fff',
              fontSize: 'clamp(3.5rem,12vw,7rem)',
              fontWeight: 200,
              letterSpacing: '0.18em',
              margin: 0,
              animation: 'wf-welcome-in 0.9s cubic-bezier(0.22,1,0.36,1) both',
            }}
          >
            Welcome
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 'clamp(0.85rem,2.5vw,1.05rem)',
              fontWeight: 300,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              margin: 0,
              animation: 'wf-sub-in 0.6s 0.5s ease-out both',
            }}
          >
            to my portfolio
          </p>
        </div>
      )}

      {/* curtain phase */}
      {phase === 'curtain' && (
        <div
          style={{
            position: 'fixed', inset: 0,
            zIndex: 9999,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%',
              height: 'calc(100% + 120px)',
              animation: curtainUp
                ? `wf-curtain-up ${CURTAIN_MS}ms cubic-bezier(0.7,0,0.2,1) forwards`
                : 'none',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <path
                d="M 0,0 L 100,0 L 100,90 C 75,110 25,110 0,90 Z"
                fill="#000"
              />
            </svg>

            <div
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <p style={{
                color: '#fff',
                fontSize: 'clamp(3.5rem,12vw,7rem)',
                fontWeight: 200,
                letterSpacing: '0.18em',
                margin: 0,
                whiteSpace: 'nowrap',
              }}>
                Welcome
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: 'clamp(0.85rem,2.5vw,1.05rem)',
                fontWeight: 300,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                margin: 0,
                marginTop: '0.75rem',
              }}>
                to my portfolio
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}