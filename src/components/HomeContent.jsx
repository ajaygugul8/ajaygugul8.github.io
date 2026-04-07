import { useEffect, useState, useCallback, useMemo } from 'react'
import { Monitor, Bot } from 'lucide-react'

import CircularGallery from './CircularGallery'
import Magnet from './Magnet'
import WhatIDoSection from './WhatIDoSection'
import VisitorCounter from './VisitorCounter'

const HERO_CIRCULAR_GALLERY_ITEMS = []

const ROLES = [
  { text: 'Full Stack Developer', icon: <Monitor className="w-3.5 h-3.5" /> },
  { text: 'AI/ML Engineer',       icon: <Bot     className="w-3.5 h-3.5" /> },
]

const TYPING_SPEED   = 75
const DELETING_SPEED = 30
const PAUSE_DURATION = 2000

function useDocumentDarkClass() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    const root = document.documentElement
    const mo = new MutationObserver(() =>
      setDark(root.classList.contains('dark'))
    )
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])
  return dark
}

export default function HomeContent() {
  const isDark               = useDocumentDarkClass()
  const heroGalleryTextColor = isDark ? '#e8e8e8' : '#2a2a2a'

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText,      setDisplayText]      = useState('')
  const [isDeleting,       setIsDeleting]       = useState(false)
  const [charIndex,        setCharIndex]        = useState(0)
  const [showIcon,         setShowIcon]         = useState(false)

  useEffect(() => {
  const currentRole = ROLES[currentRoleIndex]

  const timeout = setTimeout(() => {
    if (!isDeleting) {
      if (charIndex < currentRole.text.length) {
        setShowIcon(false)
        setDisplayText(prev => prev + currentRole.text[charIndex])
        setCharIndex(prev => prev + 1)
      } else {
        setShowIcon(true)
        const pause = setTimeout(() => setIsDeleting(true), PAUSE_DURATION)
        return () => clearTimeout(pause)
      }
    } else {
      // Hide icon immediately when deletion starts
      if (showIcon) {
        setShowIcon(false)
      } else if (charIndex > 0) {
        setDisplayText(prev => prev.slice(0, -1))
        setCharIndex(prev => prev - 1)
      } else {
        setIsDeleting(false)
        setCurrentRoleIndex(prev => (prev + 1) % ROLES.length)
      }
    }
  }, isDeleting ? DELETING_SPEED : TYPING_SPEED)

  return () => clearTimeout(timeout)
}, [charIndex, isDeleting, currentRoleIndex, showIcon])

  const scrollToWhatIDo = useCallback(() => {
    const el = document.getElementById('what-i-do')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => el?.focus({ preventScroll: true }), 450)
  }, [])

  const galleryItems = useMemo(
    () => HERO_CIRCULAR_GALLERY_ITEMS.length ? HERO_CIRCULAR_GALLERY_ITEMS : undefined,
    []
  )

  return (
    <>
      <section
        className="flex min-h-[60vh] items-center px-3 py-8 sm:px-5 sm:py-12 md:py-16 lg:px-6"
        aria-labelledby="home-hero-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-6 xl:max-w-7xl xl:gap-10">

          {/* Left — text content */}
          <div className="grid justify-items-center text-center lg:justify-items-start lg:text-left">
            <div className="flex w-full max-w-xl flex-col items-center lg:items-start sm:max-w-2xl lg:max-w-md xl:max-w-lg">

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                Hello There!
              </p>

              <h1
                id="home-hero-heading"
                className="max-w-3xl text-balance font-bold tracking-tight lg:max-w-none"
              >
                {/* Name */}
                <span className="text-3xl sm:text-4xl md:text-5xl text-[#A366FF] dark:text-[#e8a090] drop-shadow-[0_0_24px_rgba(255,140,97,0.25)]">
                  I'm Ajay
                </span>

                {/* Typing row */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-2 md:mt-3 min-h-[2rem]">
                  {/* text always left */}
                  <span className="text-base sm:text-lg md:text-xl font-medium text-red-500 dark:text-red-400">
                    {displayText}
                  </span>

                  {/* icon only when showIcon */}
                  {showIcon && (
                    <span className="flex items-center text-red-500 dark:text-red-400 animate-fadeIn">
                      <span className="p-1 rounded-md bg-red-50 dark:bg-red-900/20 ring-1 ring-red-200 dark:ring-red-800 transition-all duration-300 hover:scale-110">
                        {ROLES[currentRoleIndex].icon}
                      </span>
                    </span>
                  )}

                  {/* cursor always right */}
                  <span className="animate-pulse text-red-500 dark:text-red-400 font-light">|</span>
                </div>

                {/* Tagline */}
                <span className="block mt-2 md:mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-[#333] dark:text-neutral-200">
                  Building scalable systems and intelligent solutions.
                </span>
              </h1>

              <p className="mx-auto lg:mx-0 mt-5 max-w-lg text-pretty text-sm leading-relaxed text-[#555] dark:text-neutral-400 sm:text-base">
                From full-stack web apps to AI/ML pipelines — I build end-to-end solutions
                that are fast, reliable, and production-ready. Take a look around, or jump
                to what I work on day to day.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <VisitorCounter />
              </div>

              <div className="mt-8 flex w-full justify-center lg:justify-start">
                <Magnet padding={50} magnetStrength={50}>
                  <button
                    type="button"
                    onClick={scrollToWhatIDo}
                    className="rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-semibold text-white
                      shadow-[0_0_14px_rgba(255,107,53,0.35),0_4px_14px_rgba(255,107,53,0.12)]
                      transition-[background-color,box-shadow]
                      hover:bg-[#E55A2B]
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]
                      dark:bg-[#FF8C42]
                      dark:shadow-[0_0_14px_rgba(255,140,66,0.45),0_4px_18px_rgba(255,140,66,0.2)]
                      dark:hover:bg-[#E67E36]
                      dark:focus-visible:outline-[#FF8C42]
                      sm:px-10 sm:text-base"
                  >
                    What I do
                  </button>
                </Magnet>
              </div>

            </div>
          </div>

          {/* Right — gallery */}
          <div className="w-full h-[440px]">
            <CircularGallery
              items={galleryItems}
              textColor={heroGalleryTextColor}
              bend={3}
              borderRadius={0.06}
            />
          </div>

        </div>
      </section>

      <WhatIDoSection />
    </>
  )
}