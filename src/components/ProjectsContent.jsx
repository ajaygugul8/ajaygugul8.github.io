import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react'
import Magnet from './Magnet'
import { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import {
  SiReact,
  SiVite,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
  SiPython,
  SiFastapi,
  SiHtml5,
  SiJupyter,
  SiC
} from 'react-icons/si';
import { 
  FaDatabase,
  FaBrain,
  FaCloud,
  FaCode
} from 'react-icons/fa';

const PAGE_SIZE = 4

function ProjectsHeroArt() {
  return (
    <div className="flex-1 flex items-center justify-center" aria-hidden>
      <DotLottieReact 
        src="/projects.lottie" 
        loop 
        autoplay 
        renderConfig={{ devicePixelRatio: 1 }}
        style={{ width: '100%', height: '320px' }} 
      />
    </div>
  );
}

const ACCENTS = [
  '#3498DB',
  '#A366FF',
  '#FF8C61',
  '#F39C12',
  '#34D399',
  '#F43F5E'
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

function getTechIcon(tech) {
  const techLower = tech.toLowerCase();
  const iconMap = {
    'react': { icon: SiReact, color: 'text-cyan-500' },
    'vite': { icon: SiVite, color: 'text-purple-500' },
    'javascript': { icon: SiJavascript, color: 'text-yellow-500' },
    'node.js': { icon: SiNodedotjs, color: 'text-green-600' },
    'node': { icon: SiNodedotjs, color: 'text-green-600' },
    'mongodb': { icon: SiMongodb, color: 'text-green-500' },
    'typescript': { icon: SiTypescript, color: 'text-blue-600' },
    'tailwind css': { icon: SiTailwindcss, color: 'text-cyan-600' },
    'tailwindcss': { icon: SiTailwindcss, color: 'text-cyan-600' },
    'firebase': { icon: SiFirebase, color: 'text-orange-500' },
    'python': { icon: SiPython, color: 'text-blue-500' },
    'fastapi': { icon: SiFastapi, color: 'text-teal-600' },
    'html': { icon: SiHtml5, color: 'text-orange-600' },
    'html5': { icon: SiHtml5, color: 'text-orange-600' },
    'jupyter notebook': { icon: SiJupyter, color: 'text-orange-700' },
    'jupyter': { icon: SiJupyter, color: 'text-orange-700' },
    'c': { icon: SiC, color: 'text-blue-700' },
    'langchain': { icon: null, color: 'text-purple-600', image: '/langgraph-color.svg' },
    'chromadb': { icon: null, color: 'text-green-600', image: '/chroma.png' },
    'xgboost': { icon: FaCloud, color: 'text-indigo-600' },
    'rest': { icon: null, color: 'text-gray-600', image: '/rest.png' },
    'rag': { icon: null, color: 'text-blue-600', image: '/rag.png' },
    'other': { icon: FaCode, color: 'text-gray-500' }
  };
  
  return iconMap[techLower] || { icon: FaCode, color: 'text-gray-500' };
}

function ProjectCard({ title, description, tech, meta, githubUrl, liveUrl }) {
  const accent = pickAccent(title)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [hoveredTech, setHoveredTech] = useState(null)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const clampStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }

  return (
    <article className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] dark:bg-neutral-950/40">

        {/* GitHub + Live — absolute top right, side by side */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F97316] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-[transform,background-color] hover:bg-[#f56a0d] hover:scale-105"
              aria-label={`Open ${title} on GitHub`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
              GitHub
            </a>
          ) : null}
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#3498DB]/60 bg-white px-3 py-1.5 text-xs font-semibold text-[#1a1a1a] shadow-sm transition-[transform,background-color] hover:bg-[#3498DB]/10 hover:scale-105 dark:border-[#38bdf8]/50 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-[#38bdf8]/10"
              aria-label={`Open live demo for ${title}`}
            >
              <ExternalLink className="h-3.5 w-3.5 text-[#3498DB] dark:text-[#38bdf8]" aria-hidden />
              Live
            </a>
          ) : null}
        </div>

        {/* Title + meta — right padding so text never goes under the buttons */}
        <div className="p-5 pb-3 pr-36">
          <h3 className="text-[15px] font-bold leading-tight tracking-tight text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer">
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                aria-label={`Open ${title} on GitHub`}
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          {meta ? (
            <p className="mt-1 text-xs font-semibold text-amber-600 dark:text-amber-500">{meta}</p>
          ) : null}
        </div>

        {/* Description + divider + tech tags */}
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

          <div className="mt-4 flex flex-wrap gap-3">
            {tech.slice(0, 6).map((t) => {
              const iconData = getTechIcon(t);
              const { icon: Icon, color } = iconData;
              return (
                <div
                  key={t}
                  className="relative flex items-center justify-center p-2.5"
                  // style={{ boxShadow: `0 0 0 1px ${accent}10 inset` }}
                >
                  {(Icon || iconData.image) && (
                    <div className="relative">
                      {iconData.image ? (
                        <img
                          src={iconData.image}
                          alt={t}
                          className={`h-8 w-8 transition-transform hover:scale-110 cursor-pointer`}
                          onMouseEnter={() => setHoveredTech(t)}
                          onMouseLeave={() => setHoveredTech(null)}
                        />
                      ) : (
                        <Icon
                          className={`h-8 w-8 ${color} transition-transform hover:scale-110 cursor-pointer`}
                          onMouseEnter={() => setHoveredTech(t)}
                          onMouseLeave={() => setHoveredTech(null)}
                        />
                      )}
                      {hoveredTech === t && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-neutral-900 px-2 py-1 text-xs font-bold text-white whitespace-nowrap z-50 pointer-events-none">
                          {t}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </article>
  )
}

export default function ProjectsContent() {
  const GITHUB_PROFILE_URL = 'https://github.com/ajaygugul8'
  const GITHUB_USERNAME = 'ajaygugul8'
  const toGithub = (repo) => `https://github.com/${GITHUB_USERNAME}/${repo}`

  const projects = [
    {
      title: 'HaveIt',
      meta: 'Founder and Developer',
      description: 'Food. Groceries. HaveIt. Hyperlocal delivery in Warangal, Telangana: university belt food + Hanamkonda groceries, starting with phased WhatsApp ordering.',
      tech: ['React', 'Vite', 'JavaScript'],
      githubUrl: toGithub('haveit-in'),
      liveUrl: 'https://haveit-in.github.io/',
      have_more: false
    },
    {
      title: 'Cyber Ireland Agent',
      meta: 'RAG Agent',
      description: 'Agentic Q&A backend over the Cyber Ireland 2022 report with FastAPI, LangChain, and ChromaDB. Multi-step reasoning with citations and a calculator.',
      tech: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'RAG'],
      githubUrl: toGithub('cyber-ireland-agent'),
      have_more: false
    },
    {
      title: 'Fraud Detection',
      meta: 'Updated last month',
      description: 'Financial transaction fraud detection pipeline exposed via a Python REST API using an XGBoost ensemble model (23% precision, 85% recall on an imbalanced dataset).',
      tech: ['Python', 'FastAPI', 'XGBoost', 'REST'],
      githubUrl: toGithub('fraud-detection-system'),
      have_more: false
    },
    {
      title: 'Groww Movie Auth',
      meta: 'Movie Authentication',
      description: 'Investing on the Movies.',
      tech: ['JavaScript'],
      githubUrl: toGithub('groww-movie-auth'),
      have_more: false
    },
    {
      title: 'Village Website',
      meta: 'Updated on Dec 14, 2025',
      description: 'Forked and updated my village website.',
      tech: ['HTML'],
      githubUrl: toGithub('balunakthanda.github.io'),
      liveUrl: 'https://balunakthanda.github.io/',
      have_more: true
    },
    {
      title: 'Blackcoffer',
      meta: 'Updated on Oct 19, 2025',
      description: 'Website URL dashboard project.',
      tech: ['JavaScript'],
      githubUrl: toGithub('Blackcoffer_Dashboard'),
      have_more: true
    },
    {
      title: 'Creator Circle',
      meta: 'Updated on Jul 18, 2025',
      description: 'Social backend API.',
      tech: ['TypeScript'],
      githubUrl: toGithub('creator_circle'),
      have_more: true
    },
    {
      title: 'Merton Jump Diffusion',
      meta: 'Updated on Mar 21, 2025',
      description: 'Merton jump diffusion notebook project.',
      tech: ['Jupyter Notebook'],
      githubUrl: toGithub('merton-jump-diffusion'),
      have_more: true
    },
    {
      title: 'Analysis-and-Design-of-Algorithms',
      meta: 'Updated on Jan 27, 2025',
      description: 'NPTEL course programs (analysis & design).',
      tech: ['Python'],
      githubUrl: toGithub('Analysis-and-Design-of-Algorithms'),
      have_more: true
    },
    {
      title: 'Bidirectional LSTM Sentiment Analysis',
      meta: 'Updated on Jul 17, 2024',
      description: 'Trained a BiLSTM-based sentiment classifier with text preprocessing, tokenization, and sequence padding (IMDB).',
      tech: ['Python'],
      githubUrl: toGithub('bidirectional-lstm'),
      have_more: true
    },
    {
      title: 'Option-price-calculator',
      meta: 'Updated on Jul 27, 2024',
      description: 'Option pricing notebook project.',
      tech: ['Jupyter Notebook'],
      githubUrl: toGithub('Option-price-calculator'),
      have_more: true
    },
    {
      title: 'Object-Detection',
      meta: 'Updated on May 14, 2024',
      description: 'Object detection notebook project.',
      tech: ['Jupyter Notebook'],
      githubUrl: toGithub('Object-Detection'),
      have_more: true
    },
    {
      title: 'Startup-work-on-Agri-Business-website',
      meta: 'Updated on May 14, 2024',
      description: 'Agri-business prediction.',
      tech: ['Jupyter Notebook'],
      githubUrl: toGithub('Startup-work-on-Agri-Business-website'),
      have_more: true
    },
    {
      title: 'work-on-neural-network',
      meta: 'Updated on Jan 26, 2022',
      description: 'Forecasting with conventional neural networks.',
      tech: ['C', 'Other'],
      githubUrl: toGithub('work-on-neural-network'),
      have_more: true
    }
  ]

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = projects.some(p => p.have_more)
  const canShowMore = visibleCount < projects.length
  const canShowLess = visibleCount > PAGE_SIZE

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + PAGE_SIZE, projects.length))
  }

  const handleShowLess = () => {
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="bg-[#faf9f6] dark:bg-neutral-950">

      {/* ── Hero Section ── */}
      <section
        className="flex min-h-[60vh] items-center px-3 py-8 sm:px-5 sm:py-12 md:py-16 lg:px-6"
        aria-labelledby="projects-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-6 xl:max-w-7xl xl:gap-10">
          <ProjectsHeroArt />
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

      {/* ── Divider ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            {visibleCount} of {projects.length} Projects
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </div>
      </div>

      {/* ── Cards Section ── */}
      <section className="mx-auto mt-10 max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 md:pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
          {visibleProjects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        {/* ── Pagination buttons ── */}
        {hasMore && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              {canShowMore && (
                <button
                  onClick={handleShowMore}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-sm transition-all hover:border-[#A366FF] hover:text-[#A366FF] hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-[#7dd3fc] dark:hover:text-[#7dd3fc]"
                >
                  <ChevronDown className="h-4 w-4" aria-hidden />
                  View More
                </button>
              )}
              {canShowLess && (
                <button
                  onClick={handleShowLess}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-sm transition-all hover:border-[#F43F5E] hover:text-[#F43F5E] hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-[#f87171] dark:hover:text-[#f87171]"
                >
                  <ChevronUp className="h-4 w-4" aria-hidden />
                  Show Less
                </button>
              )}
            </div>

            <Magnet padding={50} magnetStrength={50}>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(124,58,237,0.8)] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
              >
                All Projects on GitHub
              </a>
            </Magnet>
          </div>
        )}

        {!hasMore && (
          <div className="mt-10 flex justify-center">
            <Magnet padding={50} magnetStrength={50}>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(124,58,237,0.8)] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
              >
                More Projects on GitHub
              </a>
            </Magnet>
          </div>
        )}
      </section>
    </div>
  )
}