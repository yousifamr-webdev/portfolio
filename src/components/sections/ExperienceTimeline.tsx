// src/components/sections/ExperienceTimeline.tsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

export default function ExperienceTimeline() {
  return (
    <section
      className="relative mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 md:px-10 md:pb-24 md:pt-8"
      id="experience"
    >
      {/* Header */}
      <div className="flex flex-col items-start">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-accent backdrop-blur-sm">
          <span>Track Record</span>
        </div>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-text-base sm:text-4xl md:text-5xl">
          The work behind the work.
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative mt-12 border-l border-border/80 pl-6 sm:mt-16 sm:pl-10 md:pl-12">
        {portfolioData.experience.map((item) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative pb-14 last:pb-2 sm:pb-16"
          >
            {/* Precision Architectural Node Indicator */}
            <span className="absolute -left-[1.95rem] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent/80 bg-canvas ring-4 ring-canvas transition-transform duration-300 group-hover:scale-125 sm:-left-[2.85rem] sm:top-2 sm:h-4 sm:w-4 md:-left-[3.35rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>

            {/* Header: Dominant Role, Prominent Company & Accessible Date */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-text-base sm:text-2xl md:text-[1.65rem]">
                  {item.role}
                </h3>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-sm font-semibold text-accent sm:text-base">
                    {item.company}
                  </span>
                </div>
              </div>

              <time className="inline-flex w-fit items-center rounded-lg border border-border/80 bg-surface/80 px-3 py-1 font-mono text-xs font-medium text-text-muted sm:text-[13px]">
                {item.period}
              </time>
            </div>

            {/* Role Summary */}
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-muted/90 sm:text-base sm:leading-7">
              {item.summary}
            </p>

            {/* Scannable High-Hierarchy Achievements */}
            <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
              {item.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs leading-relaxed text-text-muted sm:text-sm sm:leading-6"
                >
                  <ArrowRight
                    size={15}
                    className="mt-1 shrink-0 text-accent/80 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
