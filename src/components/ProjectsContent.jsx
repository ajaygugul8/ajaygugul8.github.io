import { ExternalLink, Github } from 'lucide-react'
import Magnet from './Magnet'
import AnimationStage from './AnimationStage'
import BorderGlow from './BorderGlow'
import { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function ProjectsHeroArt() {
  return (
    <div className="flex-1 flex items-center justify-center" aria-hidden>
      <DotLottieReact
        src="/projects.lottie"
        loop
        autoplay
        style={{ width: '100%', height: '320px' }}
      />
    </div>
  );
}

const ACCENTS = [
  '#3498DB', // blue
  '#A366FF', // violet
  '#FF8C61', // coral
  '#F39C12', // amber
  '#34D399', // emerald
  '#F43F5E' // rose
]

function hashString(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0
  }
  return h
}

function pickAccent(title) {
  return ACCENTS[hashString(title) % ACCENTS.length]
}

function ProjectCard({
  title,
  description,
  tech,
  meta,
  githubUrl,
  liveUrl
}) {
  const accent = pickAccent(title)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const clampStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }

  return (
    <BorderGlow
      edgeSensitivity={35}
      glowColor="40 80 80"
      backgroundColor="transparent"
      borderRadius={16}
      glowRadius={20}
      glowIntensity={0.4}
      coneSpread={30}
      animated={false}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
      isDarkMode={isDarkMode}
      className="group"
    >
      <article
        className="relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl bg-white transition-transform hover:-translate-y-1 dark:bg-neutral-950/40"
      >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 p-5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-bold leading-tight tracking-tight text-[#1a1a1a] dark:text-neutral-50">
            {title}
          </h3>
          {meta ? (
            <p className="mt-1 text-xs font-semibold text-[#555] dark:text-neutral-300">
              {meta}
            </p>
          ) : null}
        </div>

          <div className="flex shrink-0 items-center gap-2">
          {githubUrl ? (
            <a
              href="https://github.com/ajaygugul8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-[transform,background-color] hover:bg-[#f56a0d] dark:hover:bg-[#f56a0d] sm:px-4"
              aria-label={`Open ${title} on GitHub`}
            >
              <Github className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          ) : null}

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#3498DB]/60 bg-white/60 px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-white dark:border-[#38bdf8]/50 dark:bg-neutral-950/30 dark:text-neutral-50 sm:px-4"
              aria-label={`Open live demo for ${title}`}
            >
              <ExternalLink className="h-4 w-4 text-[#3498DB] dark:text-[#38bdf8]" aria-hidden />
              <span className="hidden sm:inline">Live</span>
            </a>
          ) : null}
        </div>
      </div>

      {/* Fixed vertical structure: divider stays in the same place for all cards */}
      <div className="flex flex-1 flex-col px-5 pb-5">
        <p
          className="min-h-[72px] pt-0 text-sm leading-relaxed text-[#555] dark:text-neutral-400"
          style={clampStyle}
        >
          {description}
        </p>

        <div
          className="mt-4 h-px w-full bg-neutral-200 transition-colors duration-200 group-hover:bg-[#3498DB] dark:bg-neutral-800/70 dark:group-hover:bg-[#38bdf8]"
          aria-hidden
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {tech.slice(0, 6).map((t) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={t}
              className="rounded-full border border-neutral-200/70 bg-white/70 px-2 py-1 text-[11px] font-semibold text-[#333] dark:border-neutral-700/70 dark:bg-neutral-950/30 dark:text-neutral-100"
              style={{
                boxShadow: `0 0 0 1px ${accent}10 inset`
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
    </BorderGlow>
  )
}

export default function ProjectsContent() {
  // GitHub repositories shown in the screenshot you shared.
  // Only include cards whose stack/language appears in the screenshot.
  const GITHUB_PROFILE_URL = 'https://github.com/ajaygugul8'
  const GITHUB_USERNAME = 'ajaygugul8'

  const toGithub = (repo) => `https://github.com/${GITHUB_USERNAME}/${repo}`

  const projects = [
    {
      title: 'HaveIt',
      meta: 'Founder and Developer',
      description:
        'Food. Groceries. HaveIt. Hyperlocal delivery in Warangal, Telangana: university belt food + Hanamkonda groceries, starting with phased WhatsApp ordering.',
      tech: ['React', 'Vite', 'JavaScript'],
      githubUrl: toGithub('haveit-in'),
      liveUrl: 'https://haveit-in.github.io/'
    },
    {
      title: 'Cyber Ireland Agent',
      meta: 'RAG Agent',
      description:
        'Agentic Q&A backend over the Cyber Ireland 2022 report with FastAPI, LangChain, and ChromaDB. Multi-step reasoning with citations and a calculator.',
      tech: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'RAG'],
      githubUrl: toGithub('cyber-ireland-agent')
    },
    {
      title: 'Fraud Detection',
      meta: 'Updated last month',
      description:
        'Financial transaction fraud detection pipeline exposed via a Python REST API using an XGBoost ensemble model (23% precision, 85% recall on an imbalanced dataset).',
      tech: ['Python', 'FastAPI', 'XGBoost', 'REST'],
      githubUrl: toGithub('fraud-detection-system')
    },
    {
      title: 'Groww Movie Auth',
      meta: 'Movie Authentication',
      description: 'Investing on the Movies.',
      tech: ['JavaScript'],
      githubUrl: toGithub('groww-movie-auth')
    },
    {
      title: 'Village Website',
      meta: 'Updated on Dec 14, 2025',
      description: 'Forked and updated my village website.',
      tech: ['HTML'],
      githubUrl: toGithub('balunakthanda.github.io'),
      liveUrl: 'https://balunakthanda.github.io/'
    },
    {
      title: 'Blackcoffer',
      meta: 'Updated on Oct 19, 2025',
      description: 'Website URL dashboard project.',
      tech: ['JavaScript'],
      githubUrl: toGithub('Blackcoffer_Dashboard')
    },
    {
      title: 'Creator Circle',
      meta: 'Updated on Jul 18, 2025',
      description: 'Social backend API.',
      tech: ['TypeScript'],
      githubUrl: toGithub('creator_circle')
    },
    {
      title: 'Merton Jump Diffusion',
      meta: 'Updated on Mar 21, 2025',
      description: 'Merton jump diffusion notebook project.',
      tech: ['Jupyter Notebook'],
      githubUrl: toGithub('merton-jump-diffusion')
    },
    // {
    //   title: 'esign_workflow',
    //   meta: 'Updated on Feb 12, 2025',
    //   description: 'Workflow built with HTML.',
    //   tech: ['HTML'],
    //   githubUrl: toGithub('esign_workflow')
    // },
    {
      title: 'Analysis-and-Design-of-Algorithms',
      meta: 'Updated on Jan 27, 2025',
      description: 'NPTEL course programs (analysis & design).',
      tech: ['Python'],
      githubUrl: toGithub('Analysis-and-Design-of-Algorithms')
    },
    {
      title: 'Bidirectional LSTM Sentiment Analysis',
      meta: 'Updated on Jul 17, 2024',
      description:
        'Trained a BiLSTM-based sentiment classifier with text preprocessing, tokenization, and sequence padding (IMDB).',
      tech: ['Python'],
      githubUrl: toGithub('bidirectional-lstm')
    },
    {
      title: 'Option-price-calculator',
      meta: 'Updated on Jul 27, 2024',
      description: 'Option pricing notebook project.',
      tech: ['Jupyter Notebook'],
      githubUrl: toGithub('Option-price-calculator')
    },
    // {
    //   title: 'M.Tech-Thesis-Report',
    //   meta: 'Updated on Jan 26, 2024',
    //   description: 'M.Tech thesis report.',
    //   tech: ['TeX'],
    //   githubUrl: toGithub('M.Tech-Thesis-Report')
    // },
    {
      title: 'Object-Detection',
      meta: 'Updated on May 14, 2024',
      description: 'Object detection notebook project.',
      tech: ['Jupyter Notebook'],
      githubUrl: toGithub('Object-Detection')
    },
    {
      title: 'Startup-work-on-Agri-Business-website',
      meta: 'Updated on May 14, 2024',
      description: 'Agri-business prediction.',
      tech: ['Jupyter Notebook'],
      githubUrl: toGithub('Startup-work-on-Agri-Business-website')
    },
    // {
    //   title: 'Interview-Preparation',
    //   meta: 'Updated on Oct 05, 2023',
    //   description: 'Interview preparation materials.',
    //   tech: ['HTML'],
    //   githubUrl: toGithub('Interview-Preparation')
    // },
    {
      title: 'work-on-neural-network',
      meta: 'Updated on Jan 26, 2022',
      description: 'Forecasting with conventional neural networks.',
      tech: ['C', 'Other'],
      githubUrl: toGithub('work-on-neural-network')
    }
  ]

  return (
    <div className="bg-[#faf9f6] pb-16 pt-6 sm:pb-20 sm:pt-8 md:pb-24 dark:bg-neutral-950">
      <section
        className="flex min-h-[60vh] items-center px-3 py-8 sm:px-5 sm:py-12 md:py-16 lg:px-6"
        aria-labelledby="projects-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-6 xl:max-w-7xl xl:gap-10">
          {/* <AnimationStage className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"> */}
            <ProjectsHeroArt />
          {/* </AnimationStage> */}
          <div className="grid justify-items-center text-center">
            <div className="flex w-full max-w-xl flex-col items-center sm:max-w-2xl">
              <h1
                id="projects-heading"
                className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-[#1a1a1a] dark:text-neutral-50 sm:text-5xl md:text-6xl"
              >
                <span className="text-[#A366FF] dark:text-[#7dd3fc] drop-shadow-[0_0_24px_rgba(255,140,97,0.25)]">Projects</span>
              </h1>
              <p className="mt-2 text-lg font-semibold text-[#333] dark:text-neutral-200">
                Select builds, links, and tech stacks
              </p>
              <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-[#555] dark:text-neutral-400 sm:text-lg">
                From production-ready systems to AI workflows, here are projects
                I've built with real-world tooling and measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      <div className="mx-auto mt-12 flex justify-center px-5">
        <Magnet padding={50} magnetStrength={50}>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#4F46E5] to-[#7C3AED] px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(124,58,237,0.8)] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
          >
            More Projects (Git)
          </a>
        </Magnet>
      </div>
    </div>
  )
}
