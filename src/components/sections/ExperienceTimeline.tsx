import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

export default function ExperienceTimeline() {
  return (
    <section
      className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24"
      id="experience"
    >
      {/* Header */}
      <div className="flex flex-col items-start">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.24em]">
          <BriefcaseBusiness className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>Track Record</span>
        </div>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-base sm:mt-4 sm:text-4xl md:text-5xl">
          The work behind the work.
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative mt-10 border-l border-border/70 pl-6 sm:mt-14 sm:pl-8 md:pl-12">
        {portfolioData.experience.map((item) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-40px 0px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative pb-12 last:pb-0 sm:pb-16"
          >
            {/* Responsive Layered Node Indicator */}
            <span className="absolute -left-[1.95rem] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent/60 bg-canvas ring-4 ring-canvas transition-colors duration-300 group-hover:border-accent group-hover:bg-accent sm:-left-[2.35rem] sm:top-1.5 sm:h-4 sm:w-4 md:-left-[3.35rem]">
              <span className="h-1 w-1 rounded-full bg-accent transition-colors duration-300 group-hover:bg-canvas sm:h-1.5 sm:w-1.5" />
            </span>

            {/* Header: Role, Company & Period */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-text-base sm:text-xl md:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-accent sm:mt-1 sm:text-sm">
                  {item.company}
                </p>
              </div>

              <time className="inline-flex w-fit items-center rounded-full border border-border/70 bg-surface/60 px-2.5 py-0.5 font-mono text-[11px] text-text-muted backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs">
                {item.period}
              </time>
            </div>

            {/* Summary */}
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-text-muted sm:mt-4 sm:text-sm md:text-base">
              {item.summary}
            </p>

            {/* Achievements List */}
            <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
              {item.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex items-start gap-2 text-xs leading-relaxed text-text-muted sm:gap-2.5 sm:text-sm"
                >
                  <ArrowRight
                    size={14}
                    className="mt-0.5 shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5 sm:mt-1"
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
