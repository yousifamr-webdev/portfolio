import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Images } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  portfolioData,
  type Project,
  type ProjectCategory,
} from "../../data/portfolioData";
import { scrollToElement } from "../../utils/scroll";
import { GitHubIcon } from "../ui/SocialIcons";
import { ProjectGalleryModal } from "../ui/ProjectGalleryModal";

type ProjectFilter = "All" | ProjectCategory;
const filters: ProjectFilter[] = ["All", "Full-Stack", "Backend", "Frontend"];

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [wigglingProjectId, setWigglingProjectId] = useState<string | null>(
    null,
  );

  // Gallery Modal State
  const [activeGalleryProject, setActiveGalleryProject] =
    useState<Project | null>(null);

  const projects = portfolioData.projects.filter(
    (project) => filter === "All" || project.category === filter,
  );
  const horizontalProjectIds = new Set<string>();
  const featuredProjectId = portfolioData.showcase.featuredProject.projectId;
  if (filter === "All" && projects.some((project) => project.id === featuredProjectId)) {
    horizontalProjectIds.add(featuredProjectId);
  }
  const verticalProjects = projects.filter(
    (project) => !horizontalProjectIds.has(project.id),
  );
  if (verticalProjects.length % 2 === 1) {
    horizontalProjectIds.add(verticalProjects[verticalProjects.length - 1].id);
  }

  const projectLayouts: {
    project: Project;
    isHorizontal: boolean;
    cardClass: string;
    mediaClass: string;
    detailsClass: string;
  }[] = [];
  let verticalIndex = 0;
  for (const project of projects) {
    const isHorizontal = horizontalProjectIds.has(project.id);
    if (isHorizontal) {
      projectLayouts.push({
        project,
        isHorizontal,
        cardClass:
          "md:col-span-2 lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center",
        mediaClass: "aspect-[16/10]",
        detailsClass: project.image
          ? "mt-4 lg:mt-0 lg:col-span-5 lg:pl-2"
          : "lg:col-span-12",
      });
      continue;
    }

    const row = Math.floor(verticalIndex / 2);
    const isLeftCard = verticalIndex % 2 === 0;
    const takesSevenColumns =
      row % 2 === 0 ? isLeftCard : !isLeftCard;
    projectLayouts.push({
      project,
      isHorizontal,
      cardClass: takesSevenColumns
        ? "md:col-span-1 lg:col-span-7"
        : "md:col-span-1 lg:col-span-5",
      mediaClass: "h-44 sm:h-52",
      detailsClass: project.image ? "mt-4" : "",
    });
    verticalIndex += 1;
  }

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

        scrollToElement(el, 8);

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
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent sm:backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.24em]">
            <span>Selected Work</span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-base sm:mt-4 sm:text-4xl md:text-5xl">
            Projects with a point of view.
          </h2>
        </div>

        {/* Sliding Filter Bar */}
        <div
          className="flex w-fit items-center gap-1 rounded-full border border-border/70 bg-surface/60 p-1 sm:backdrop-blur-md"
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
      <div className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-12">
        {projectLayouts.map(
          (
            { project, isHorizontal, cardClass, mediaClass, detailsClass },
            index,
          ) => {
          const isFeatured =
            filter === "All" && project.id === featuredProjectId;
          const isWiggling = wigglingProjectId === project.id;
          const hasCompactStack = !isHorizontal && Boolean(project.image);
          const visibleStack = hasCompactStack
            ? project.stack.slice(0, 5)
            : project.stack;
          const hiddenStackCount = project.stack.length - visibleStack.length;
          const galleryImages =
            project.gallery && project.gallery.length > 0
              ? project.gallery
              : [project.image];

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
              className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-surface/60 p-4 sm:backdrop-blur-md transition-colors duration-300 scroll-mt-28 sm:rounded-3xl sm:p-6 md:p-7 ${cardClass} ${
                isWiggling
                  ? "border-accent bg-surface-elevated shadow-[0_0_35px_rgba(217,184,255,0.35)] ring-2 ring-accent/40"
                  : "border-border/80 hover:border-accent/60 hover:bg-surface-elevated/70"
              }`}
            >
              {project.image ? (
                <div className={isHorizontal ? "lg:col-span-7" : ""}>
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
                    className={`group/img relative w-full cursor-pointer overflow-hidden rounded-xl border border-border/70 bg-canvas/50 sm:rounded-2xl ${mediaClass}`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity group-hover/img:opacity-80" />

                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-accent/15 shadow-lg sm:backdrop-blur-lg transition-colors duration-100 hover:border-accent hover:bg-surface-elevated bg-surface-elevated px-2.5 py-1 text-[11px] font-medium text-accent">
                      <Images size={13} className="text-accent" />
                      <span>
                        {galleryImages.length}{" "}
                        {galleryImages.length === 1 ? "Image" : "Images"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}

              <div
                className={`flex flex-col ${detailsClass}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 sm:mt-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
                          {project.category}
                        </span>
                        {isFeatured && (
                          <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-accent">
                            {portfolioData.showcase.featuredProject.label}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`mt-1.5 text-lg font-bold tracking-tight text-text-base transition-colors group-hover:text-accent sm:text-xl md:text-2xl ${
                          hasCompactStack ? "line-clamp-2" : ""
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-semibold text-text-muted/60">
                      0{index + 1}
                    </span>
                  </div>

                  <p
                    className={`mt-3 text-xs leading-relaxed text-text-muted sm:text-sm ${
                      hasCompactStack ? "line-clamp-4" : ""
                    }`}
                  >
                    {project.impact}
                  </p>
                </div>

                <div className="mt-6 pt-2">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {visibleStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-lg border border-border/70 bg-canvas/60 px-2.5 py-1 text-[11px] font-medium text-text-base sm:backdrop-blur-sm sm:rounded-xl sm:px-3 sm:py-1 sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {hiddenStackCount > 0 && (
                      <span className="inline-flex items-center rounded-lg border border-border/70 bg-canvas/60 px-2.5 py-1 text-[11px] font-medium text-text-muted sm:rounded-xl sm:px-3 sm:py-1 sm:text-xs">
                        +{hiddenStackCount}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {project.caseStudySlug && (
                      <Link
                        to={`/case-study/${project.caseStudySlug}`}
                        className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-3.5 py-2 text-xs font-semibold text-accent-contrast transition-opacity hover:opacity-90 sm:px-4 sm:py-2.5 sm:text-sm"
                      >
                        <BookOpen className="h-4 w-4 shrink-0" />
                        <span>Case Study</span>
                      </Link>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface-elevated/70 px-3.5 py-2 text-xs font-semibold text-text-base transition-colors hover:border-accent hover:text-accent sm:px-4 sm:py-2.5 sm:text-sm"
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
                      className="group/btn inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface-elevated/70 px-3.5 py-2 text-xs font-semibold text-text-base transition-colors hover:border-accent hover:text-accent sm:px-4 sm:py-2.5 sm:text-sm"
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
      </div>
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
