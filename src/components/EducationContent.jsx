import { GraduationCap, Zap } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

const IIT_WEBSITE = 'https://www.iitd.ac.in'



function DegreeBullet({ children }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-[#444] dark:text-neutral-400">
      <Zap
        className="mt-0.5 h-4 w-4 shrink-0 fill-[#FFC857]/35 text-[#e6a800] dark:fill-amber-400/20 dark:text-amber-400"
        aria-hidden
      />
      <span>{children}</span>
    </li>
  )
}

const MAX_TILT = 11

function TiltDegreeCard({
  navLabel,
  dateRange,
  degreeTitle,
  bullets
}) {
  const rootRef = useRef(null)
  const [transform, setTransform] = useState(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  )
  const [transition, setTransition] = useState(false)

  const onPointerMove = useCallback(e => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const el = rootRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateY = (x - 0.5) * 2 * MAX_TILT
    const rotateX = -(y - 0.5) * 2 * MAX_TILT
    setTransition(false)
    setTransform(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
    )
  }, [])

  const onPointerLeave = useCallback(() => {
    setTransition(true)
    setTransform(
      'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    )
  }, [])

  return (
    <div style={{ perspective: '1400px' }}>
      <article
        ref={rootRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          transform,
          transition: transition ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          transformStyle: 'preserve-3d'
        }}
        className="rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.18)] will-change-transform dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] sm:p-5 lg:p-6 max-w-4xl mx-auto"
      >
        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="flex shrink-0 justify-center lg:w-[168px]">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-[5px] border-[#6096BA] bg-white shadow-inner dark:border-sky-500 dark:bg-neutral-900 sm:h-32 sm:w-32">
              <img
                src="/iit_logo.png"
                alt="IIT Delhi"
                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1 rounded-xl border-2 border-[#FFC857] bg-white shadow-sm dark:border-amber-500/70 dark:bg-neutral-950/40">
            <div className="rounded-t-[10px] bg-[#FFC857] px-4 py-3.5 dark:bg-amber-600">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-white sm:text-[0.95rem]">
                  <GraduationCap
                    className="h-5 w-5 shrink-0 text-white"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                  {navLabel}
                </span>
                <span className="w-fit rounded-full bg-white/25 px-3 py-1 text-center text-xs font-semibold text-white backdrop-blur-sm sm:text-sm dark:bg-white/20">
                  {dateRange}
                </span>
              </div>
              <p className="mt-2.5 text-base font-bold leading-snug text-white sm:text-lg">
                {degreeTitle}
              </p>
            </div>
            <div className="rounded-b-[10px] bg-white px-4 py-5 dark:bg-neutral-950/30">
              <ul className="space-y-3">
                {bullets.map((item, i) => (
                  <DegreeBullet key={i}>{item}</DegreeBullet>
                ))}
              </ul>
              <div className="mt-6 flex justify-end">
                <a
                  href={IIT_WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-[#FF8C61] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-[background-color,transform] hover:bg-[#ff7a4d] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8C61] active:scale-[0.98] dark:bg-orange-500 dark:hover:bg-orange-400"
                >
                  Visit website
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

function CertificationCard({
  brand,
  brandClass,
  title,
  tagPrimary,
  tagSecondary,
  href
}) {
  return (
    <article className="relative flex min-h-[220px] h-[280px] w-full flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] dark:border-neutral-700 dark:bg-neutral-900 max-w-sm mx-auto">
      <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-violet-900/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white dark:bg-violet-800">
        {tagPrimary}
      </div>
      <div className="pointer-events-none absolute right-3 top-3 z-10 max-w-[55%] rounded-md bg-red-600/95 px-2.5 py-1 text-right text-[10px] font-medium leading-snug text-white dark:bg-red-700">
        {tagSecondary}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-8 pt-14">
        <div className={`text-2xl font-bold tracking-tight ${brandClass}`}>
          {brand}
        </div>
        <p className="text-center text-sm font-medium text-[#333] dark:text-neutral-300">
          {title}
        </p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#6096BA] underline-offset-2 hover:underline dark:text-sky-400"
          >
            View credential path
          </a>
        ) : null}
      </div>
    </article>
  )
}

const BTECH_BULLETS = [
  <>
    Completed a 5-year integrated programme with a strong foundation in{' '}
    <strong className="text-[#333] dark:text-neutral-200">
      data structures, algorithms, linear algebra, probability
    </strong>
    {' '}and discrete mathematics.
  </>,
  <>
    Coursework spanning{' '}
    <strong className="text-[#333] dark:text-neutral-200">
      DBMS, software engineering, networks
    </strong>
    {' '}and systems — bridging mathematical theory with practical computing.
  </>,
  <>
    Built foundational projects in{' '}
    <strong className="text-[#333] dark:text-neutral-200">
      web development, NLP and algorithm design
    </strong>
    {' '}— including skip list implementations, sorting benchmarks and an N-Queens backtracking solver.
  </>
]

const MTECH_BULLETS = [
  <>
    <strong className="text-[#333] dark:text-neutral-200">
      Major in Mathematics
    </strong>
    {' '}— advanced analytical methods within the integrated Mathematics and Computing programme at IIT Delhi.
  </>,
  <>
    Thesis:{' '}
    <strong className="text-[#333] dark:text-neutral-200">
      &ldquo;Variational Iteration Method and Its Applications&rdquo;
    </strong>
    {' '}— solved 25+ nonlinear differential equations with up to 98% approximation accuracy, supervised by Prof. Konijeti Sreenadh.
  </>,
  <>
    Applied research to financial engineering — implemented{' '}
    <strong className="text-[#333] dark:text-neutral-200">
      Option Pricing using Black-Scholes-Merton
    </strong>
    {' '}with 99% accuracy across 1,000+ options, completed in Aug 2024.
  </>
]

export default function EducationContent() {
  return (
    <div className="pb-16 pt-6 px-4 sm:pb-20 sm:pt-8 sm:px-6 md:pb-24 md:px-8">
      <section
        className="flex min-h-[60vh] items-center px-3 py-12 sm:px-5 sm:py-16 md:py-20 lg:px-6"
        aria-labelledby="education-heading"
      >
        <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">

            {/* Video — left */}
            <div className="flex-1 flex items-center justify-center" aria-hidden>
              <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-neutral-200/90 bg-gradient-to-br from-amber-50 via-white to-sky-50 shadow-[0_20px_50px_-20px_rgba(52,152,219,0.2)] dark:border-neutral-700 dark:from-amber-950/20 dark:via-neutral-900 dark:to-sky-950/20">
                <video
                  src="/edu.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover rounded-3xl"
                />
              </div>
            </div>

            {/* Text — right, centered */}
            <div className="flex-1 text-center">
              <h1
                id="education-heading"
                className="text-5xl font-bold tracking-tight text-[#A366FF] dark:text-[#e8a090] drop-shadow-[0_0_24px_rgba(255,140,97,0.25)] sm:text-6xl"
              >
                Education
              </h1>
              <p className="mt-3 text-lg font-semibold text-[#333] dark:text-neutral-200 sm:text-xl">
                Qualifications &amp; Certifications
              </p>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#555] dark:text-neutral-400 sm:text-lg">
  Integrated <strong className="font-semibold text-[#333] dark:text-neutral-300">
    B.Tech and M.Tech in Mathematics and Computing
  </strong> from IIT Delhi — combining mathematical depth with applied computing, culminating in a research thesis in Aug 2024.
</p>
            </div>

          </div>
        </div>
      </section>

      <section
        className="mx-auto mt-0 max-w-5xl px-0 sm:mt-8 xl:max-w-6xl"
        aria-labelledby="basic-education-heading"
      >
        <h2
          id="basic-education-heading"
          className="mb-8 text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-neutral-50 sm:text-4xl text-center"
        >
          Academic Background
        </h2>
        <div className="space-y-12 sm:space-y-14">
          <TiltDegreeCard
            navLabel="IIT Delhi — M.Tech"
            dateRange="2022 – 2024"
            degreeTitle="M.Tech in Mathematics and Computing"
            bullets={MTECH_BULLETS}
          />
          <TiltDegreeCard
            navLabel="IIT Delhi — B.Tech"
            dateRange="2014 – 2019"
            degreeTitle="B.Tech in Mathematics and Computing"
            bullets={BTECH_BULLETS}
          />
        </div>
      </section>

      <section
        className="mx-auto mt-16 max-w-5xl px-0 sm:mt-20 xl:max-w-6xl"
        aria-labelledby="certifications-heading"
      >
        <h2
          id="certifications-heading"
          className="mb-8 text-2xl font-bold tracking-tight text-[#1a1a1a] dark:text-neutral-50 sm:text-3xl text-center"
        >
          Accredited &amp; Professional Learning
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <CertificationCard
            brand="AWS"
            brandClass="text-[#232F3E] dark:text-orange-300"
            title="AWS Certified Developer – Associate (In Progress)"
            tagPrimary="In Progress"
            tagSecondary="Exam prep &amp; hands-on labs alongside production work"
            href="https://aws.amazon.com/certification/"
          />
          <CertificationCard
            brand="IITD"
            brandClass="text-[#1a1a1a] dark:text-neutral-200"
            title="Full Stack Developer Intern — Certificate of Completion"
            tagPrimary="Certified"
            tagSecondary="Issued by IIT Delhi"
            href="https://drive.google.com/file/d/1qeMxBqlI30j46LvSALY3t9I072qoTJWg/view?usp=sharing"
          />
        </div>
      </section>
    </div>
  )
}