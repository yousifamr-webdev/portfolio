import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { useMemo, useState } from "react";
import { usePersona } from "../../context/PersonaContext";
import { portfolioData, type ProjectCategory } from "../../data/portfolioData";
import { GitHubIcon } from "../ui/SocialIcons";

type ProjectFilter = "All" | ProjectCategory;
const filters: ProjectFilter[] = ["All", "Full-Stack", "Frontend"];

export default function ProjectsSection() {
  const { persona } = usePersona();
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const projects = useMemo(() => {
    const visible = portfolioData.projects.filter(
      (project) => filter === "All" || project.category === filter,
    );
    return [...visible].sort((a, b) =>
      persona === "recruiter"
        ? b.technicalScore - a.technicalScore
        : b.visualScore - a.visualScore,
    );
  }, [filter, persona]);

  return (
    <section
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24"
      id="projects"
    >
      {/* Header & Filter Controls */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.24em]">
            <FolderGit2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Selected Work</span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-base sm:mt-4 sm:text-4xl md:text-5xl">
            Projects with a point of view.
          </h2>
        </div>

        {/* Sliding Filter Bar */}
        <div
          className="flex w-fit items-center gap-1 rounded-full border border-border/70 bg-surface/60 p-1 backdrop-blur-md"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((item) => {
            const isActive = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "font-semibold text-text-base"
                    : "text-text-muted hover:text-text-base"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-project-filter"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full border border-border bg-surface-elevated shadow-sm"
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface/60 p-4 backdrop-blur-md transition-colors hover:border-accent/60 hover:bg-surface-elevated/70 sm:rounded-3xl sm:p-6 md:p-7"
          >
            <div>
              {/* Media Preview */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/70 bg-canvas/50 sm:rounded-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              
              </div>

              {/* Title & Category Header */}
              <div className="mt-4 flex items-start justify-between gap-3 sm:mt-5">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-lg font-bold tracking-tight text-text-base transition-colors group-hover:text-accent sm:text-xl md:text-2xl">
                    {project.title}
                  </h3>
                </div>
                <span className="font-mono text-xs font-semibold text-text-muted/60">
                  0{index + 1}
                </span>
              </div>

              {/* Impact / Summary */}
              <p className="mt-3 text-xs leading-relaxed text-text-muted sm:text-sm">
                {project.impact}
              </p>
            </div>

            {/* Stack Pills & CTA Actions */}
            <div className="mt-6 pt-2">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-lg border border-border/70 bg-canvas/60 px-2.5 py-1 text-[11px] font-medium text-text-base backdrop-blur-sm sm:rounded-xl sm:px-3 sm:py-1 sm:text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface-elevated/70 px-3.5 py-2 text-xs font-semibold text-text-base transition-all hover:border-accent hover:text-accent sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface-elevated/70 px-3.5 py-2 text-xs font-semibold text-text-base transition-all hover:border-accent hover:text-accent sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  <GitHubIcon className="h-4 w-4 shrink-0" />
                  <span>Source</span>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
