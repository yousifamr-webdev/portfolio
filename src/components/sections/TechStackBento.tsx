import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Layers,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const iconMap: Record<string, typeof Code2> = {
  Frontend: Code2,
  Backend: Server,
  Databases: Database,
  "Dev Tools/Cloud": Terminal,
};

// Alternating Bento layout spanning 12 columns on large screens
const bentoSpanClasses = [
  "lg:col-span-7", // Card 1: Wide
  "lg:col-span-5", // Card 2: Compact
  "lg:col-span-5", // Card 3: Compact
  "lg:col-span-7", // Card 4: Wide
];

export default function TechStackBento() {
  return (
    <section
      className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 md:px-10 md:pb-24 md:pt-8"
      id="skills"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[260px] w-[300px] rounded-full bg-accent/5 blur-2xl sm:h-[380px] sm:w-[600px] sm:blur-[130px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-start">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.24em]">
          <span>Toolkit &amp; Architecture</span>
        </div>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-base sm:mt-4 sm:text-4xl md:text-5xl">
          A stack that stays useful.
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted sm:mt-4 sm:text-base">
          Modern technologies selected for type safety, maintainable
          architecture, and fast execution across the full lifecycle.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="relative z-10 mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
        {portfolioData.skillCategories.map((category, index) => {
          const Icon = iconMap[category.name] || Layers;
          const spanClass = bentoSpanClasses[index % bentoSpanClasses.length];

          return (
            <motion.article
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface/60 p-5 backdrop-blur-md transition-colors hover:border-accent/60 hover:bg-surface-elevated/70 sm:rounded-[2rem] sm:p-7 md:p-8 ${spanClass}`}
            >
              {/* Corner glow on hover */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/0 blur-2xl transition-all duration-300 group-hover:bg-accent/10" />

              <div>
                {/* Header row: Icon & category index */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-surface-elevated text-accent shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-accent/50 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                  </div>
                  <span className="font-mono text-[11px] font-semibold tracking-widest text-text-muted/60 sm:text-xs">
                    0{index + 1}
                  </span>
                </div>

                {/* Category title & description */}
                <h3 className="mt-5 text-lg font-bold tracking-tight text-text-base sm:mt-6 sm:text-xl md:text-2xl">
                  {category.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-text-muted sm:mt-2 sm:text-sm">
                  {category.description}
                </p>
              </div>

              {/* Skills pill tags */}
              <div className="mt-6 flex flex-wrap gap-1.5 pt-2 sm:mt-8 sm:gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-lg border border-border/70 bg-canvas/60 px-2.5 py-1 text-[11px] font-medium text-text-base backdrop-blur-sm transition-all duration-200 hover:border-accent hover:bg-surface hover:text-accent sm:rounded-xl sm:px-3.5 sm:py-1.5 sm:text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
