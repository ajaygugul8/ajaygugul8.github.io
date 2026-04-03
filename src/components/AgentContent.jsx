import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

function ChittiIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="7" y="10" width="18" height="14" rx="4" fill="currentColor" opacity="0.95"/>
      <rect x="11" y="14" width="3" height="3" rx="1.5" fill="#0ea5e9"/>
      <rect x="18" y="14" width="3" height="3" rx="1.5" fill="#0ea5e9"/>
      <rect x="13" y="19" width="6" height="1.5" rx="0.75" fill="white" opacity="0.5"/>
      <rect x="14" y="5" width="4" height="5" rx="2" fill="currentColor" opacity="0.95"/>
      <rect x="15.5" y="3" width="1" height="3" rx="0.5" fill="currentColor"/>
      <rect x="3" y="13" width="4" height="6" rx="2" fill="currentColor" opacity="0.7"/>
      <rect x="25" y="13" width="4" height="6" rx="2" fill="currentColor" opacity="0.7"/>
    </svg>
  )
}

function MicIcon({ active, size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="2" width="6" height="11" rx="3" fill={active ? '#fff' : 'currentColor'}/>
      <path d="M5 10a7 7 0 0 0 14 0" stroke={active ? '#fff' : 'currentColor'}
        strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12" y2="21" stroke={active ? '#fff' : 'currentColor'}
        strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="9" y1="21" x2="15" y2="21" stroke={active ? '#fff' : 'currentColor'}
        strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

const ACTION_BUTTONS = [
  { id: 'one-time', label: 'One Time',  sub: 'Question', emoji: '⚡' },
  { id: 'auto',     label: 'Auto',      sub: 'Mode',     emoji: '🔄' },
  { id: 'test',     label: 'Test',      sub: 'Voice',    emoji: '🎙️' },
  { id: 'flat',     label: 'Flat',      sub: 'Mode',     emoji: '▤'  },
]

export default function Agent() {
  const [open, setOpen]           = useState(false)
  const [listening, setListening] = useState(false)
  const [activeBtn, setActiveBtn] = useState(null)
  const [tooltip, setTooltip]     = useState(false)
  const [isMobile, setIsMobile]   = useState(false)
  const popupRef                  = useRef(null)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false)
        setListening(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { setOpen(false); setListening(false) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobile, open])

  const toggleMic = () => setListening((l) => !l)
  const handleAction = (id) => setActiveBtn((prev) => prev === id ? null : id)

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 text-[#1a1a1a] dark:text-white">

      {/* ── Mobile backdrop dim ── */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[98] bg-black/40 backdrop-blur-sm"
            onTouchStart={() => { setOpen(false); setListening(false) }}
          />
        )}
      </AnimatePresence>

      {/* ── Fixed bottom-left Chitti button ── */}
      <div className="fixed bottom-6 left-4 sm:left-6 z-[100] flex flex-col items-start gap-2">

        {/* Tooltip — desktop only */}
        <AnimatePresence>
          {tooltip && !open && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className="mb-1 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide
                bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl
                border border-white/40 dark:border-white/10
                shadow-lg text-[#1a1a1a] dark:text-white
                pointer-events-none select-none"
            >
              Chitti
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chitti FAB */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => { setOpen((o) => !o); setTooltip(false) }}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
          aria-label="Open Chitti"
          className="relative flex items-center justify-center
            w-12 h-12 sm:w-14 sm:h-14
            rounded-2xl
            bg-gradient-to-br from-[#A366FF] to-[#7c3aed]
            shadow-[0_4px_24px_rgba(163,102,255,0.55)]
            text-white border border-white/20
            transition-shadow hover:shadow-[0_4px_32px_rgba(163,102,255,0.75)]
            touch-manipulation"
        >
          <ChittiIcon size={isMobile ? 26 : 30} />
          {listening && (
            <span className="absolute inset-0 rounded-2xl animate-ping
              bg-[#A366FF]/40 pointer-events-none" />
          )}
        </motion.button>
      </div>

      {/* ── Glassmorphism Popup ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className={`
              fixed z-[99]
              rounded-3xl overflow-hidden
              bg-white/30 dark:bg-neutral-900/50
              backdrop-blur-2xl
              border border-white/50 dark:border-white/10
              shadow-[0_8px_48px_rgba(0,0,0,0.22),0_1.5px_0_rgba(255,255,255,0.25)_inset]
              ${isMobile
                /* mobile: centered above FAB, full-width with margin */
                ? 'bottom-[4.5rem] left-3 right-3 w-auto'
                /* desktop: anchored bottom-left above FAB */
                : 'bottom-24 left-6 w-[17rem]'
              }
            `}
          >
            {/* Top gradient strip */}
            <div className="h-1 w-full bg-gradient-to-r from-[#A366FF] via-[#7c3aed] to-[#0ea5e9]" />

            <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-5 sm:pb-6 space-y-4 sm:space-y-5">

              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#A366FF]"><ChittiIcon size={18} /></span>
                  <span className="text-sm font-bold tracking-wide text-[#1a1a1a] dark:text-white">
                    Chitti
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                    ${listening
                      ? 'bg-red-500/15 text-red-500 border border-red-400/30'
                      : 'bg-emerald-500/15 text-emerald-500 border border-emerald-400/30'
                    }`}>
                    {listening ? '● Listening' : '○ Ready'}
                  </span>
                  {/* Close button on mobile */}
                  {isMobile && (
                    <button
                      onClick={() => { setOpen(false); setListening(false) }}
                      className="flex items-center justify-center w-6 h-6 rounded-full
                        bg-white/20 dark:bg-white/10 text-[#555] dark:text-white/60
                        hover:bg-white/40 transition-colors touch-manipulation"
                      aria-label="Close"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Central Mic Button */}
              <div className="flex flex-col items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={toggleMic}
                  className={`relative flex items-center justify-center
                    w-16 h-16 sm:w-20 sm:h-20
                    rounded-full transition-all duration-300
                    ${listening
                      ? 'bg-gradient-to-br from-red-500 to-rose-600 shadow-[0_0_32px_rgba(239,68,68,0.6)]'
                      : 'bg-gradient-to-br from-[#A366FF] to-[#7c3aed] shadow-[0_0_24px_rgba(163,102,255,0.45)]'
                    }
                    border border-white/25 text-white touch-manipulation`}
                  aria-label={listening ? 'Stop listening' : 'Start listening'}
                >
                  <MicIcon active={listening} size={isMobile ? 24 : 28} />
                  {listening && (
                    <>
                      <motion.span
                        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-red-400/40 pointer-events-none"
                      />
                      <motion.span
                        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 1.6, repeat: Infinity, delay: 0.3 }}
                        className="absolute inset-0 rounded-full bg-red-400/20 pointer-events-none"
                      />
                    </>
                  )}
                </motion.button>
                <p className="text-[11px] text-[#555] dark:text-white/50 font-medium">
                  {listening ? 'Tap to stop' : 'Tap to speak'}
                </p>
              </div>

              {/* 4 Action Buttons — 2×2 grid, full width on mobile */}
              <div className="grid grid-cols-2 gap-2">
                {ACTION_BUTTONS.map((btn, i) => (
                  <motion.button
                    key={btn.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.22 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction(btn.id)}
                    className={`flex flex-col items-center justify-center gap-0.5
                      px-2 py-3 sm:py-3 rounded-2xl text-center
                      border transition-all duration-200 touch-manipulation
                      ${activeBtn === btn.id
                        ? 'bg-[#A366FF]/20 border-[#A366FF]/50 shadow-[0_0_12px_rgba(163,102,255,0.25)]'
                        : 'bg-white/20 dark:bg-white/5 border-white/30 dark:border-white/10 hover:bg-white/35 dark:hover:bg-white/10 active:bg-white/40'
                      }`}
                  >
                    <span className="text-base leading-none">{btn.emoji}</span>
                    <span className="text-[11px] sm:text-[11px] font-semibold text-[#1a1a1a] dark:text-white leading-tight">
                      {btn.label}
                    </span>
                    <span className="text-[9px] text-[#777] dark:text-white/40 leading-tight">
                      {btn.sub}
                    </span>
                  </motion.button>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}