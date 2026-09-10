import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  Sparkles,
} from "lucide-react";
import { portfolioData } from "../../data/portfolioData";




const springTransition = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
};



export default function ClientHero() {
  const { showcase, identity } = portfolioData;

  return (
    <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-16 md:px-10 md:pt-24 lg:pt-10">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[320px] w-[320px] rounded-full bg-accent/10 blur-[130px] sm:h-[480px] sm:w-[480px]" />
      </div>

      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Left Column: Pitch & Conversion Actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="flex flex-col items-start"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-surface-elevated/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-accent backdrop-blur-sm">
            <Sparkles size={13} />
            <span>Digital Product Partner</span>
          </div>

          {/* Value Proposition Headline */}
          <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-text-base sm:text-5xl md:text-6xl lg:text-6xl">
            Scalable Web Apps &amp; High-Performance Digital Products.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-muted sm:mt-6 sm:text-base sm:leading-8">
            Full-stack engineer delivering production-grade web systems,
            resilient APIs, and responsive digital interfaces tailored to
            business momentum.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_0_24px_rgba(217,184,255,0.3)] transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              href={`mailto:${identity.email}?subject=Project%20Inquiry`}
            >
              Start a Project
            </a>

            <a
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface/70 px-6 py-3.5 text-sm font-semibold text-text-base backdrop-blur-sm transition-colors hover:border-accent hover:bg-surface-elevated hover:text-accent"
              href="#projects"
            >
              <span>View Case Studies</span>
              <ArrowDown
                size={15}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-2 sm:mt-12 sm:gap-2.5">
            {showcase.trustHighlights.map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface/40 px-3.5 py-1.5 text-xs font-medium text-text-muted backdrop-blur-sm"
              >
                <CheckCircle2 size={13} className="text-accent" />
                <span>{highlight}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Editorial Founder & Work Showcase Card */}
        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: 0.12 }}
        >
          {/* Layered Glass Frame */}
          <div className="relative overflow-hidden rounded-[2.25rem] border border-border/80 bg-surface/60 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            {/* Portrait & Project Overlap Container */}
            <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-2xl border border-border/60 bg-canvas sm:aspect-[4/4.5]">
              <img
                src="/portrait.webp"
                alt="Yousif Amr"
                className="h-full w-full object-cover object-top  contrast-105 transition-all duration-700 hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 dark:bg-gradient-to-t dark:from-canvas dark:via-canvas/20 dark:to-transparent dark:to-50%" />

              {/* Floating Featured Case Study Badge */}
              <div className="absolute inset-x-3 bottom-3 rounded-xl dark:border dark:border-border/80 bg-surface/80 p-3.5 shadow-lg backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span className="flex items-center gap-1.5 font-medium text-[blue]">
                    <Layers3 size={13} />
                    <span>Featured Delivery</span>
                  </span>
                  <span className="font-mono text-[10px]">01 / 04</span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold dark:text-text-base text-[white]  sm:text-base">
                      {showcase.featuredProject.name}
                    </h2>
                    <p className="line-clamp-1 text-xs dark:text-text-muted text-[gray]">
                      {showcase.featuredProject.description}
                    </p>
                  </div>

                  <a
                    href="#projects"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text-base transition-colors hover:border-accent hover:text-accent"
                    aria-label="View featured project"
                  >
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
