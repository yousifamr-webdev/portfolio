import { motion } from "framer-motion";
import { ArrowUpRight, Images } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePersona } from "../../context/PersonaContext";
import {
  portfolioData,
  type Project,
  type ProjectCategory,
} from "../../data/portfolioData";
import { GitHubIcon } from "../ui/SocialIcons";
import { ProjectGalleryModal } from "../ui/ProjectGalleryModal";

type ProjectFilter = "All" | ProjectCategory;
const filters: ProjectFilter[] = ["All", "Full-Stack","Backend"];

export default function ProjectsSection() {
  const { persona } = usePersona();
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [wigglingProjectId, setWigglingProjectId] = useState<string | null>(
    null,
  );

  // Gallery Modal State
  const [activeGalleryProject, setActiveGalleryProject] =
    useState<Project | null>(null);

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

  useEffect(() => {
    const handleFocusProject = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId: string }>;
      const targetId = customEvent.detail?.projectId;
      if (!targetId) return;

      const targetProj = portfolioData.projects.find((p) => p.id === targetId);
      if (targetProj && filter !== "All" && targetProj.category !== filter) {
        setFilter("All");
      }

      setTimeout(() => {
        const el = document.getElementById(`project-${targetId}`);
        if (!el) return;

        const navbarHeight = 84;
        const targetTop =
          el.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });

        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
              observer.disconnect();
              setTimeout(() => {
                setWigglingProjectId(targetId);
                setTimeout(() => setWigglingProjectId(null), 900);
              }, 180);
            }
          },
          { threshold: 0.25 },
        );

        observer.observe(el);
        setTimeout(() => observer.disconnect(), 3000);
      }, 50);
    };

    window.addEventListener("focus-project", handleFocusProject);
    return () =>
      window.removeEventListener("focus-project", handleFocusProject);
  }, [filter]);

  return (
    <section
      className="relative mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 md:px-10 md:pb-24 md:pt-8"
      id="projects"
    >
      {/* Header & Filter Controls */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.24em]">
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
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-12"
      >
        {projects.map((project, index) => {
          const isFlagship = index === 0 && filter === "All";
          const isWiggling = wigglingProjectId === project.id;
          const galleryImages =
            project.gallery && project.gallery.length > 0
              ? project.gallery
              : [project.image];

          // Editorial column weighting: Flagship spans full 12 cols with side-by-side arrangement on large screens;
          // subsequent projects form balanced 6-column pairs.
          const gridSpanClass = isFlagship
            ? "lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center"
            : "lg:col-span-6";

          return (
            <motion.article
              id={`project-${project.id}`}
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              animate={
                isWiggling
                  ? {
                      rotate: [0, -1.8, 1.8, -1.2, 1.2, -0.5, 0.5, 0],
                      scale: [1, 1.02, 1.02, 1.01, 1],
                    }
                  : undefined
              }
              transition={
                isWiggling
                  ? { duration: 0.75, ease: "easeInOut" }
                  : { duration: 0.45, delay: index * 0.06 }
              }
              whileHover={{ y: -4 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-surface/60 p-4 backdrop-blur-md transition-all duration-300 scroll-mt-28 sm:rounded-3xl sm:p-6 md:p-7 ${gridSpanClass} ${
                isWiggling
                  ? "border-accent bg-surface-elevated shadow-[0_0_35px_rgba(217,184,255,0.35)] ring-2 ring-accent/40"
                  : "border-border/80 hover:border-accent/60 hover:bg-surface-elevated/70"
              }`}
            >
              {/* Media Container: On Flagship, spans 7 columns */}
              {project.image ? (
                <div className={isFlagship ? "lg:col-span-7" : ""}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveGalleryProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveGalleryProject(project);
                      }
                    }}
                    className="group/img relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-xl border border-border/70 bg-canvas/50 sm:rounded-2xl"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity group-hover/img:opacity-80" />

                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-accent/15 shadow-lg backdrop-blur-lg transition-all duration-100 hover:border-accent hover:bg-surface-elevated bg-surface-elevated px-2.5 py-1 text-[11px] font-medium text-accent">
                      <Images size={13} className="text-accent" />
                      <span>
                        {galleryImages.length}{" "}
                        {galleryImages.length === 1 ? "Image" : "Images"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* Details Container: On Flagship, spans 5 columns with enhanced hierarchy */}
              <div
                className={`flex flex-col justify-between ${isFlagship ? "mt-5 lg:mt-0 lg:col-span-5 lg:pl-2" : "mt-4"}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 sm:mt-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
                          {project.category}
                        </span>
                        {isFlagship && (
                          <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-accent">
                            Flagship Architecture
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1.5 text-lg font-bold tracking-tight text-text-base transition-colors group-hover:text-accent sm:text-xl md:text-2xl">
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-semibold text-text-muted/60">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-text-muted sm:text-sm">
                    {project.impact}
                  </p>
                </div>

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
                    {project.liveUrl && (
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
                    )}

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
              </div>
            </motion.article>
          );
        })}
      </motion.div>
      {/* Lightbox Carousel Modal */}
      {activeGalleryProject && (
        <ProjectGalleryModal
          isOpen={Boolean(activeGalleryProject)}
          onClose={() => setActiveGalleryProject(null)}
          projectTitle={activeGalleryProject.title}
          images={
            activeGalleryProject.gallery &&
            activeGalleryProject.gallery.length > 0
              ? activeGalleryProject.gallery
              : [activeGalleryProject.image]
          }
        />
      )}
    </section>
  );
}
