export default function SectionLayout({ titleId, title, children }) {
  return (
    <section className="py-16 sm:py-20 md:py-24" aria-labelledby={titleId}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-8 xl:max-w-7xl xl:gap-12">
        <div className="mx-auto w-full max-w-lg text-center lg:mx-0 lg:max-w-sm lg:justify-self-end lg:pr-2 lg:text-left xl:max-w-md">
          <h1
            id={titleId}
            className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-neutral-50 sm:text-4xl"
          >
            {title}
          </h1>
        </div>
        <div className="mx-auto max-w-2xl text-pretty text-center leading-relaxed text-[#555555] dark:text-neutral-400 lg:mx-0 lg:max-w-none lg:text-left">
          {children}
        </div>
      </div>
    </section>
  )
}
