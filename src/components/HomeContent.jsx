import { useEffect, useState } from 'react'
import { Layers, Brain, Server } from 'lucide-react'

import AnimationStage from './AnimationStage'
import CircularGallery from './CircularGallery'
import TextType from './TextType'
import Magnet from './Magnet'
import WhatIDoSection from './WhatIDoSection'
import VisitorCounter from './VisitorCounter'

/** Drop files in `public/` and use paths like `/gallery/photo.jpg`. When empty, placeholder images load. */
const HERO_CIRCULAR_GALLERY_ITEMS = [
  // { image: '/gallery/project-a.jpg', text: 'Project A' },
  // { image: '/gallery/project-b.jpg', text: 'B' },
]

function useDocumentDarkClass() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    const root = document.documentElement
    const sync = () => setDark(root.classList.contains('dark'))
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])
  return dark
}

export default function HomeContent() {
  const heroGalleryTextColor = useDocumentDarkClass() ? '#e8e8e8' : '#2a2a2a'
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  
  const roles = [
    { text: "Full Stack Developer", icon: <Layers className="w-3.5 h-3.5" /> },
    { text: "AI/ML Engineer", icon: <Brain className="w-3.5 h-3.5" /> },
    // { text: "Software Developer", icon: <Server className="w-3.5 h-3.5" /> },
  ]
  
  const typingSpeed = 75
  const deletingSpeed = 50
  const pauseDuration = 2000

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.text.length) {
          setDisplayText(prev => prev + currentRole.text[charIndex])
          setCharIndex(prev => prev + 1)
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(prev => prev.slice(0, -1))
          setCharIndex(prev => prev - 1)
        } else {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentRoleIndex, roles, typingSpeed, deletingSpeed, pauseDuration])

  const scrollToWhatIDo = () => {
    const el = document.getElementById('what-i-do')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => {
      el?.focus({ preventScroll: true })
    }, 450)
  }

  return (
    <>
      <section
        className="flex min-h-[60vh] items-center px-3 py-8 sm:px-5 sm:py-12 md:py-16 lg:px-6"
        aria-labelledby="home-hero-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-6 xl:max-w-7xl xl:gap-10">
          <div className="grid justify-items-center text-center lg:justify-items-start lg:text-left">
  <div className="flex w-full max-w-xl flex-col items-center lg:items-start sm:max-w-2xl lg:max-w-md xl:max-w-lg">

              {/* Greeting */}
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                Hello There!
              </p>

              <h1
                id="home-hero-heading"
                className="max-w-3xl text-balance font-bold tracking-tight lg:max-w-none"
              >
                {/* Name — largest */}
                <span className="text-3xl sm:text-4xl md:text-5xl text-[#A366FF] dark:text-[#e8a090] drop-shadow-[0_0_24px_rgba(255,140,97,0.25)]">
                  I'm Ajay
                </span>

                {/* Typing role — one step smaller */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-2 md:mt-3">
  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg md:text-xl font-medium text-red-500 dark:text-red-400">
                      {displayText}
                      <span className="animate-pulse">|</span>
                    </span>
                    <span className="flex items-center text-red-500 dark:text-red-400">
                      {roles[currentRoleIndex].icon}
                    </span>
                  </div>
                </div>

                {/* Tagline — one step smaller again */}
                <span className="block mt-2 md:mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-[#333] dark:text-neutral-200">
                  Building scalable systems and intelligent solutions.
                </span>
              </h1>

              {/* Description — smallest */}
              <p className="mx-auto lg:mx-0 mt-5 max-w-lg text-pretty text-sm leading-relaxed text-[#555] dark:text-neutral-400 sm:text-base">
                From full-stack web apps to AI/ML pipelines — I build end-to-end solutions
                that are fast, reliable, and production-ready. Take a look around, or jump
                to what I work on day to day.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <VisitorCounter />
              </div>

              <div className="mt-8 flex w-full justify-center">
                <Magnet padding={50} magnetStrength={50}>
                  <button
                    type="button"
                    onClick={scrollToWhatIDo}
                    className="rounded-full bg-[#FF6B35] px-8 py-3 text-sm font-semibold text-white shadow-[0_0_14px_rgba(255,107,53,0.35),0_4px_14px_rgba(255,107,53,0.12)] transition-[background-color,box-shadow] hover:bg-[#E55A2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] dark:bg-[#FF8C42] dark:shadow-[0_0_14px_rgba(255,140,66,0.45),0_4px_18px_rgba(255,140,66,0.2)] dark:hover:bg-[#E67E36] dark:focus-visible:outline-[#FF8C42] sm:px-10 sm:text-base"
                  >
                    What I do
                  </button>
                </Magnet>
              </div>

            </div>
          </div>

          {/* <AnimationStage> */}
            <div className="w-full h-[440px] overflow-hidden rounded-3xl bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200 dark:from-pink-950/60 dark:via-pink-900/40 dark:to-rose-950/60 shadow-[0_0_40px_10px_rgba(236,72,153,0.3)] dark:shadow-[0_0_40px_10px_rgba(236,72,153,0.2)]">
              <CircularGallery
                items={
                  HERO_CIRCULAR_GALLERY_ITEMS.length
                    ? HERO_CIRCULAR_GALLERY_ITEMS
                    : undefined
                }
                textColor={heroGalleryTextColor}
                bend={3}
                borderRadius={0.06}
              />
            </div>
          {/* </AnimationStage> */}
        </div>
      </section>

      <WhatIDoSection />
    </>
  )
}