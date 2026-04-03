import { Clock3, MapPin, Minus, Plus } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


function ExperienceHeroArt() {
  return (
    <div className="flex-1 flex items-center justify-center" aria-hidden>
      <DotLottieReact
        src="/software-developer.lottie"
        loop
        autoplay
        renderConfig={{ devicePixelRatio: 1 }}
        style={{ width: '100%', height: '320px' }}
      />
    </div>
  );
}

function ExperienceCategoryButton({
  label,
  isActive,
  onClick,
  count,
  accentColor
}) {
  const BLUE = '#3498DB'

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ 
        borderLeftColor: accentColor,
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid'
      }}
      className={[
        'group flex w-full items-center justify-between rounded-xl bg-white shadow-sm dark:bg-neutral-900 px-8 py-6',
        'border border-neutral-200 dark:border-neutral-700',
        'transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3498DB] dark:focus-visible:ring-[#38bdf8]',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff9f5] dark:focus-visible:ring-offset-neutral-950'
      ].join(' ')}
      aria-pressed={isActive}
    >
      <span className="flex items-center gap-3">
        <span className="text-xl font-bold tracking-tight text-[#1a1a1a] dark:text-neutral-50" style={{ fontSize: '22px', fontWeight: '700' }}>
          {label}
        </span>

        <span
          className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-sm font-semibold"
          style={{
            backgroundColor: '#f0f0f0',
            color: '#666',
            padding: '2px 10px',
            fontSize: '14px',
            borderRadius: '20px'
          }}
        >
          {count}
        </span>
      </span>

      <span
        className={[
          'flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900',
          'transition-colors',
          isActive ? 'text-[#3498DB]' : 'text-neutral-600 dark:text-neutral-300'
        ].join(' ')}
        style={{ color: isActive ? BLUE : undefined }}
      >
        {isActive ? (
          <Minus className="h-4 w-4" aria-hidden />
        ) : (
          <Plus className="h-4 w-4" aria-hidden />
        )}
      </span>
    </button>
  )
}

function getLogoPanelTint({ title, company }) {
  const haystack = `${title} ${company}`.toLowerCase()

  // Soft tints from the reference design.
  if (haystack.includes('cams mutual funds')) return '#E8EEF8'
  if (haystack.includes('earnvey technologies')) return '#F0F0F0'

  // RAVI is a distinct card from "IIT Delhi" in the reference.
  if (haystack.includes('ravi') && haystack.includes('iit delhi')) return '#F2F2F2'
  if (haystack.includes('startup initiative') && haystack.includes('iit delhi')) return '#F2F2F2'

  // Think360 / CAMS share the same tint in the reference.
  if (haystack.includes('think360') || haystack.includes(' cams')) return '#EEF1F8'

  if (haystack.includes('iit delhi')) return '#F5F0EE'

  return '#F2F2F2'
}

function ExperienceCard({
  title,
  company,
  dateRange,
  location,
  bullets,
  companyUrl,
  logoSrc
}) {
  const cardRef = useRef(null)
  const rafRef = useRef(null)

  const resetTilt = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'transform 0.25s ease-out'
    el.style.transform = 'none'
  }

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    // Clamp to avoid extreme angles at edges.
    const clampedX = Math.max(0, Math.min(1, x))
    const clampedY = Math.max(0, Math.min(1, y))

    const rotateY = (clampedX - 0.5) * 10 // deg
    const rotateX = -(clampedY - 0.5) * 8 // deg

    // Avoid updating transform too frequently.
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transition = 'transform 0.05s ease-out'
      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })
  }

  return (
    <div style={{ perspective: '1000px' }} onMouseLeave={resetTilt} onMouseMove={handleMouseMove}>
      <article
        ref={cardRef}
        className={[
          'rounded-[12px] border border-[#EBEBEB] bg-white shadow-sm overflow-hidden dark:border-neutral-700 dark:bg-neutral-900',
          'dark:border-neutral-700/80 dark:bg-neutral-950/40'
        ].join(' ')}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex flex-col sm:flex-row items-stretch">
        {/* Top section (logo panel) */}
        <div
          className="flex h-24 w-full shrink-0 items-center justify-center sm:h-auto sm:w-[120px]"
          style={{ backgroundColor: getLogoPanelTint({ title, company }) }}
          aria-hidden
        >
          <img
            src={logoSrc}
            alt={`${company} logo`}
            className="h-[56px] w-[56px] object-contain"
            loading="lazy"
          />
        </div>

        {/* Bottom section */}
        <div
          className="flex min-w-0 flex-1 flex-col p-[18px_20px] bg-transparent"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
            <div className="flex-1">
              <h3 className="text-base font-bold leading-tight tracking-tight text-[#1a1a1a] dark:text-neutral-50 sm:text-lg">
                {title}
              </h3>
              <a
                href={companyUrl || '#'}
                onClick={(e) => {
                  if (!companyUrl) e.preventDefault()
                }}
                className="inline-block mt-2 text-sm font-semibold text-[#3498DB] hover:underline hover:underline-offset-4 dark:text-[#38bdf8]"
              >
                {company}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-[#555] dark:text-neutral-300">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#3498DB]" aria-hidden />
                <span>{dateRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#3498DB]" aria-hidden />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {bullets.length ? (
            <ul className="space-y-2 pt-4">
              {bullets.map((b, idx) => (
                <li key={idx} className="flex gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#3498DB]"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-[#444] dark:text-neutral-300">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      </article>
    </div>
  )
}

export default function ExperienceContent() {
  const [openWork, setOpenWork] = useState(false)
  const [openInternships, setOpenInternships] = useState(false)

  const onWorkTabClick = () => {
    setOpenWork((prev) => {
      const next = !prev
      if (next) setOpenInternships(false)
      return next
    })
  }

  const onInternshipsTabClick = () => {
    setOpenInternships((prev) => {
      const next = !prev
      if (next) setOpenWork(false)
      return next
    })
  }

  const experience = useMemo(
    () => ({
      work: [
        {
          title: 'Software Developer',
          company: 'Creator Circle',
          dateRange: 'Mar 2025 - Jan 2026',
          location: 'Bangalore',
          logoSrc: '/CC_logo.png',
          bullets: [
            'Implemented Google OAuth 2.0 and real-time notifications.',
            'Built session booking system with FastAPI + React + Razorpay.',
            'Developed Creator Coins virtual currency platform.',
            'Created brand collaboration discovery with Google Places API.'
          ]
        },
        {
          title: 'Full Stack Developer',
          company: 'Startup Initiative, IIT Delhi',
          dateRange: 'Aug 2024 - Feb 2025',
          location: 'New Delhi',
          logoSrc: '/iit_logo.png',
          bullets: [
            'Architected a full-stack web app to forecast crop prices by integrating real-time weather and soil data using Prophet (achieved ~90% accuracy).',
            'Built a clean, responsive UI using Streamlit and Bootstrap for smooth accessibility.',
            'Developed a Flask backend that auto-executes Jupyter notebooks and dynamically renders matplotlib plots.',
            'Implemented file-change detection to automatically refresh model outputs without manual intervention.',
            'Used Pandas for processing and delivered insights via Plotly dashboards.'
          ]
        }
      ],
      internships: [
        {
          title: 'Web Developer',
          company: 'Academic Web Page (Prof. K. Sreenadh)',
          dateRange: 'Dec 2023 - Jan 2024',
          location: 'New Delhi',
          logoSrc: '/iit_logo.png',
          bullets: [
            'Designed a responsive academic web page, driving a 30% increase in student engagement.',
            'Integrated 80+ course materials and announcements, optimizing performance by 25%.',
            'Ensured cross-browser compatibility and mobile responsiveness for improved UX.'
          ]
        },

        {
          title: 'Data Scientist',
          company: 'Larsen & Toubro',
          dateRange: 'Sep 2022 - Nov 2022',
          location: 'Bangalore',
          logoSrc: '/lt_logo.png',
          bullets: [
            'Modeled and analyzed the ordering process with a team of 5 data scientists using 5 distinct methods, delivering recommendations that increased order output by 8% — implemented in collaboration with development teams across large-scale datasets.'
          ]
        }
      ]
    }),
    []
  )

  const activeCardId = openWork
    ? `work-${experience.work.length > 1 ? 1 : 0}`
    : openInternships
      ? 'intern-0'
      : null

  return (
    <div className="bg-[#faf9f6] pb-16 pt-6 sm:pb-20 sm:pt-8 md:pb-24 dark:bg-neutral-950">
      <section
  className="flex min-h-[60vh] items-center px-3 py-8 sm:px-5 sm:py-12 md:py-16 lg:px-6"
  aria-labelledby="experience-heading"
>
  <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
    <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">

      {/* Text — left, centered */}
      <div className="flex-1 text-center">
        <h1
          id="experience-heading"
          className="text-4xl font-bold tracking-tight text-[#1a1a1a] dark:text-neutral-50 sm:text-5xl md:text-6xl"
        >
          <span className="text-[#A366FF] dark:text-[#7dd3fc] drop-shadow-[0_0_24px_rgba(255,140,97,0.25)]">Experience</span>
        </h1>
        <p className="mt-2 text-lg font-semibold text-[#333] dark:text-neutral-200">
          Work &amp; Internships
        </p>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-[#555] dark:text-neutral-400 sm:text-lg">
          From research-led learning to production-ready delivery: built
          experience across full-stack development, internships, and hands-on
          projects.
        </p>
      </div>

      {/* Video — right */}
      <div className="flex-1 flex items-center justify-center">
        <ExperienceHeroArt />
      </div>

    </div>
  </div>
</section>

      <section className="mx-auto mt-12 max-w-3xl px-5 sm:px-8 xl:max-w-4xl">
        <div className="space-y-4">
          <div className="w-full" style={{ marginBottom: '16px' }}>
            <ExperienceCategoryButton
              label="Works"
              count={experience.work.length}
              accentColor="#3498DB"
              isActive={openWork}
              onClick={onWorkTabClick}
            />
            <div className="mt-4 overflow-hidden">
              <div
                className={[
                  'grid transition-[grid-template-rows] duration-300 ease-out',
                  openWork ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                ].join(' ')}
              >
                <div className="overflow-hidden">
                  <div
                    className={[
                      'flex flex-col gap-[10px] p-0 transition-all duration-300 ease-out',
                      openWork ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    ].join(' ')}
                  >
                    {experience.work.map((c, idx) => {
                      const cardId = `work-${idx}`
                      const isActive = activeCardId === cardId
                      return (
                        <ExperienceCard
                          key={idx}
                          title={c.title}
                          company={c.company}
                          companyUrl={c.companyUrl}
                          dateRange={c.dateRange}
                          location={c.location}
                          bullets={c.bullets}
                          logoSrc={c.logoSrc}
                          isActive={isActive}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full" style={{ marginBottom: '16px' }}>
            <ExperienceCategoryButton
              label="Interns"
              count={experience.internships.length}
              accentColor="#F39C12"
              isActive={openInternships}
              onClick={onInternshipsTabClick}
            />
            <div className="mt-4 overflow-hidden">
              <div
                className={[
                  'grid transition-[grid-template-rows] duration-300 ease-out',
                  openInternships ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                ].join(' ')}
              >
                <div className="overflow-hidden">
                  <div
                    className={[
                      'flex flex-col gap-[10px] p-0 transition-all duration-300 ease-out',
                      openInternships ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    ].join(' ')}
                  >
                    {experience.internships.map((c, idx) => {
                      const cardId = `intern-${idx}`
                      const isActive = activeCardId === cardId
                      return (
                        <ExperienceCard
                          key={idx}
                          title={c.title}
                          company={c.company}
                          companyUrl={c.companyUrl}
                          dateRange={c.dateRange}
                          location={c.location}
                          bullets={c.bullets}
                          logoSrc={c.logoSrc}
                          isActive={isActive}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
