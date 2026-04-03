import { useEffect, useMemo, useRef, useState } from 'react'
import { PORTFOLIO_ONBOARDING_KEY } from './onboardingKey'
export { PORTFOLIO_ONBOARDING_KEY }

const HELLO_DUR    = 3200   // stroke draw duration
const HELLO_HOLD   = 1000   // time fully visible before transitioning
const WELCOME_DUR  = 1800
const WELCOME_HOLD = 400
const CURTAIN_MS   = 1050

export default function WelcomeFlow({ onComplete }) {
  const [phase, setPhase]         = useState('hello')
  const [curtainUp, setCurtainUp] = useState(false)
  const helloRef                  = useRef(null)
  const welcomeRef                = useRef(null)

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    try { sessionStorage.setItem(PORTFOLIO_ONBOARDING_KEY, '1') } catch { /* ignore */ }
  }, [])

  const animateMacStyle = (el, drawDur) => {
    if (!el) return
    const len = el.getComputedTextLength?.() ?? 1000
    el.style.transition       = 'none'
    el.style.strokeDasharray  = `${len}`
    el.style.strokeDashoffset = `${len}`
    el.style.fillOpacity      = '0'
    el.style.strokeOpacity    = '1'
    el.getBoundingClientRect()
    el.style.transition = [
      `stroke-dashoffset ${drawDur}ms cubic-bezier(0.37, 0, 0.63, 1)`,
      `fill-opacity ${Math.round(drawDur * 0.5)}ms ${Math.round(drawDur * 0.55)}ms ease`,
      `stroke-opacity 300ms ${Math.round(drawDur * 0.95)}ms ease`,
    ].join(', ')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.strokeDashoffset = '0'
        el.style.fillOpacity      = '1'
        el.style.strokeOpacity    = '0'
      })
    })
  }

  useEffect(() => {
    if (phase !== 'hello' || reducedMotion) return
    const run = () => animateMacStyle(helloRef.current, HELLO_DUR)
    if (document.fonts?.ready) document.fonts.ready.then(run)
    else setTimeout(run, 400)
  }, [phase, reducedMotion])

  useEffect(() => {
    if (phase !== 'welcome' || reducedMotion) return
    const run = () => animateMacStyle(welcomeRef.current, WELCOME_DUR)
    if (document.fonts?.ready) document.fonts.ready.then(run)
    else setTimeout(run, 50)
  }, [phase, reducedMotion])

  // hello → welcome
  useEffect(() => {
    if (phase !== 'hello') return
    if (reducedMotion) { setPhase('welcome'); return }
    const id = setTimeout(() => setPhase('welcome'), HELLO_DUR + HELLO_HOLD)
    return () => clearTimeout(id)
  }, [phase, reducedMotion])

  // welcome → curtain
  useEffect(() => {
    if (phase !== 'welcome') return
    const id = setTimeout(() => setPhase('curtain'), WELCOME_DUR + WELCOME_HOLD)
    return () => clearTimeout(id)
  }, [phase])

  // curtain
  useEffect(() => {
    if (phase !== 'curtain') return
    const t1 = setTimeout(() => setCurtainUp(true), 80)
    const t2 = setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, 80 + CURTAIN_MS)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [phase, onComplete])

  if (phase === 'done') return null

  // const gradient = 'linear-gradient(135deg, #b4964f 0%, #c93b72 42%, #7b5ec7 100%)'
  const gradient = '#ffffff'

  const base = {
    position: 'fixed', inset: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999,
    background: gradient,
  }

  const helloStyle = {
    fontFamily: "'Dancing Script', cursive",
    fontSize: '160px',
    fontWeight: 700,
    fill: 'url(#hello-grad)',
    fillOpacity: 0,
    stroke: 'url(#hello-grad)',
    strokeWidth: '2px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    paintOrder: 'stroke fill',
    filter: 'drop-shadow(0 0 18px rgba(180, 79, 160, 0.4))',
  }

  // Same visual treatment as hello — thick semi-transparent stroke + glow
  const welcomeStyle = {
    fontFamily: "'Dancing Script', cursive",
    fontSize: '130px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    fill: 'url(#welcome-grad)',
    fillOpacity: 0,
    stroke: 'url(#welcome-grad)',
    strokeWidth: '2px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    paintOrder: 'stroke fill',
    filter: 'drop-shadow(0 0 18px rgba(123, 94, 199, 0.4))',
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Quicksand:wght@200;300&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes wf-curtain-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-110%); }
        }
      `}</style>

      {/* ── HELLO ── */}
      {phase === 'hello' && (
        <div role="dialog" aria-modal="true" aria-label="Welcome animation" style={base}>
          <svg
            viewBox="0 0 680 200"
            style={{ width: 'min(88vw, 620px)', overflow: 'visible' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hello-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#b44fa0" />
                <stop offset="42%"  stopColor="#c93b72" />
                <stop offset="100%" stopColor="#7b5ec7" />
              </linearGradient>
            </defs>
            <text ref={helloRef} x="340" y="158" textAnchor="middle" style={helloStyle}>
              hello
            </text>
          </svg>
        </div>
      )}

      {/* ── WELCOME ── */}
      {phase === 'welcome' && (
        <div style={base}>
          <svg
            viewBox="0 0 980 160"
            style={{ width: 'min(92vw, 920px)', overflow: 'visible' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="welcome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#b44fa0" />
                <stop offset="42%"  stopColor="#c93b72" />
                <stop offset="100%" stopColor="#7b5ec7" />
              </linearGradient>
            </defs>
            <text ref={welcomeRef} x="490" y="125" textAnchor="middle" style={welcomeStyle}>
              Welcome
            </text>
          </svg>
        </div>
      )}

      {/* ── CURTAIN ── */}
      {phase === 'curtain' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden', pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%',
              height: 'calc(100% + 80px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: curtainUp
                ? `wf-curtain-up ${CURTAIN_MS}ms cubic-bezier(0.7,0,0.2,1) forwards`
                : 'none',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%" height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, display: 'block' }}
            >
              <defs>
                <linearGradient id="wf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#ffffff" />
<stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <path d="M 0,0 L 100,0 L 100,95 Q 50,100 0,95 Z" fill="url(#wf-grad)" />
            </svg>

            <svg
              viewBox="0 0 980 160"
              style={{ width: 'min(92vw, 920px)', overflow: 'visible', position: 'relative' }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="curtain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#b44fa0" />
                  <stop offset="42%"  stopColor="#c93b72" />
                  <stop offset="100%" stopColor="#7b5ec7" />
                </linearGradient>
              </defs>
              <text
                x="490" y="125" textAnchor="middle"
                style={{ ...welcomeStyle, fill: 'url(#curtain-grad)', fillOpacity: 1, strokeOpacity: 0 }}
              >
                Welcome
              </text>
            </svg>
          </div>
        </div>
      )}
    </>
  )
}