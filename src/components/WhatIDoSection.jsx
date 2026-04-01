import { Zap } from 'lucide-react'

function TechChips({ items }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {items.map(name => (
        <li key={name}>
          <span className="inline-flex rounded-lg border border-neutral-200/90 bg-white/90 px-2.5 py-1 text-xs font-medium text-[#333] shadow-sm dark:border-neutral-600 dark:bg-neutral-800/90 dark:text-neutral-200">
            {name}
          </span>
        </li>
      ))}
    </ul>
  )
}

function BulletList({ items }) {
  return (
    <ul className="mt-5 space-y-3 text-left text-sm leading-relaxed text-[#444] dark:text-neutral-400 sm:text-[0.9375rem]">
      {items.map(text => (
        <li key={text} className="flex gap-3">
          <Zap
            className="mt-0.5 h-4 w-4 shrink-0 fill-amber-400/25 text-amber-500 dark:fill-amber-400/20 dark:text-amber-400"
            aria-hidden
          />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

function Panel({ title, techs, bullets }) {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-xl font-bold tracking-tight text-[#1a1a1a] dark:text-neutral-50 sm:text-2xl">
        {title}
      </h3>
      <div className="mt-4">
        <TechChips items={techs} />
      </div>
      <BulletList items={bullets} />
    </div>
  )
}

function IllustrationFullStack() {
  return (
    <img
      src="/src/assets/1.gif"
      alt="Full Stack Development animation"
      className="w-full h-full max-w-sm rounded-lg object-contain"
      aria-hidden
    />
  )
}

function IllustrationGenAI() {
  return (
    <div
      className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-indigo-50 via-white to-violet-50 dark:border-neutral-700 dark:from-indigo-950/40 dark:via-neutral-900 dark:to-violet-950/40 sm:min-h-[280px]"
      aria-hidden
    >
      <video
        src="/src/assets/Code typing.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover rounded-3xl"
      />
    </div>
  )
}

function IllustrationCloud() {
  return (
    <img
      src="/src/assets/2.gif"
      alt="Cloud and DevOps animation"
      className="w-full h-96 object-contain"
      aria-hidden
    />
  )
}

const FULL_STACK_TECH = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Java',
  // 'Spring Boot',
  'FastAPI',
  'Flask',
  'HTML5',
  'CSS3',
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  // 'C++',
  // 'PHP',
  'Bootstrap',
  'Tailwind CSS',
  'Git',
  'GitHub'
]

const GEN_AI_TECH = [
  'Python',
  'LangChain',
  'Llama',
  'TensorFlow',
  'Keras',
  'PyTorch',
  'OpenCV',
  // 'Hugging Face',
  'scikit-learn',
  'RAG',
  // 'CrewAI',
  'Groq',
  'ChromaDB'
]

const CLOUD_TECH = [
  // 'GCP',
  'AWS',
  'Azure',
  'Docker',
  // 'Kubernetes',
  'Firebase',
  'MongoDB',
  // 'Heroku',
  'Netlify',
  'Vercel',
  'CI/CD',
  'GitHub Actions'
]

export default function WhatIDoSection() {
  return (
    <section
      id="what-i-do"
      tabIndex={-1}
      className="scroll-mt-24 bg-[#fff9f5] py-16 outline-none dark:bg-neutral-950 sm:py-20 md:py-24"
      aria-labelledby="what-i-do-heading"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-5 lg:px-6 xl:max-w-7xl">
        <h2
          id="what-i-do-heading"
          className="text-center text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-neutral-50 sm:text-4xl"
        >
          Here's what I do
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
          End-to-end product work across the stack, intelligent systems, and
          cloud operations.
        </p>

        <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="order-1 lg:order-1">
              <IllustrationFullStack />
            </div>
            <div className="order-2 lg:order-2">
              <Panel
                title="Full Stack Development"
                techs={FULL_STACK_TECH}
                bullets={[
                  'Building responsive, high-performance web apps with React, FastAPI and Node.js.',
                  'Developing RESTful APIs with payment, auth and scheduling integrations baked in.',
                  'Database design and optimization across PostgreSQL, MongoDB and Redis.',
                  'Real-time applications with WebSockets, live feeds and event-driven notifications.'
                ]}
              />
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Panel
                title="Gen AI & Machine Learning"
                techs={GEN_AI_TECH}
                bullets={[
                  'Production-ready AI apps with RAG pipelines, LangChain and vector databases.',
                  'Agentic systems that retrieve, reason and respond with zero hallucinations.',
                  'ML models across NLP, time-series forecasting and fraud detection — taken to deployment.',
                  '10+ AI/ML projects built from experiment to production-style delivery.'
                ]}
              />
            </div>
            <div>
              <IllustrationGenAI />
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="order-1 lg:order-1">
              <IllustrationCloud />
            </div>
            <div className="order-2 lg:order-2">
              <Panel
                title="Cloud & DevOps"
                techs={CLOUD_TECH}
                bullets={[
                  'Cloud infrastructure on AWS (EC2, S3, RDS) with Git-based CI/CD pipelines.',
                  'Container workflows with Docker and deployment automation via GitHub Actions.',
                  'High-throughput data pipelines processing 200K+ records with 99% uptime.',
                  'Microservices architecture with async processing, Redis caching and modular boundaries.'
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
