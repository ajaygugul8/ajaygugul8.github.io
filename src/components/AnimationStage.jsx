/**
 * Reserved canvas for hero / section visuals (3D, Lottie, canvas).
 * Glow + frame read as intentional space, similar to a split portfolio hero.
 */
export default function AnimationStage({ children, className = '' }) {
  return (
    <div className={`relative w-full ${className}`} aria-hidden>
      <div
        className="pointer-events-none absolute left-1/2 top-[45%] z-0 h-[min(92vw,460px)] w-[min(92vw,460px)] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(52,152,219,0.24)_0%,rgba(163,102,255,0.08)_45%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,rgba(232,160,144,0.08)_42%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative z-1 flex min-h-[min(40vh,360px)] w-full items-stretch justify-center overflow-hidden rounded-4xl bg-[#fff9f5]/90 shadow-[inset_0_0_90px_rgba(52,152,219,0.09)] dark:border-neutral-700/55 dark:bg-neutral-950/50 dark:shadow-[inset_0_0_110px_rgba(139,92,246,0.06)] lg:min-h-[min(58vh,540px)]">
        {children}
      </div>
    </div>
  )
}
