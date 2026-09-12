import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  Sparkles,
} from "lucide-react";
import type { MouseEvent } from "react";
import { portfolioData } from "../../data/portfolioData";

const springTransition = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
};

export default function ClientHero() {
  const { showcase, identity } = portfolioData;

  const featuredProjectId =
    (showcase.featuredProject as { id?: string }).id ??
    portfolioData.projects.find(
      (p) =>
        p.title.toLowerCase() === showcase.featuredProject.name.toLowerCase(),
    )?.id ??
    portfolioData.projects[0]?.id ??
    "featured";

  // Mobile-safe smooth scroll with navbar clearance
  const handleScrollTo = (
    e: MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const navbarHeight = 76;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  };

  const handleNavigateToFeaturedProject = (e: MouseEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById(
      `project-${featuredProjectId}`,
    );
    if (targetElement) {
      window.dispatchEvent(
        new CustomEvent("focus-project", {
          detail: { projectId: featuredProjectId },
        }),
      );
    } else {
      const fallbackSection = document.getElementById("projects");
      if (fallbackSection) {
        const navbarHeight = 76;
        window.scrollTo({
          top:
            fallbackSection.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-3 sm:px-6 sm:pb-24 sm:pt-6 md:px-10 md:pt-8 lg:pt-8">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[320px] w-[320px] rounded-full bg-accent/10 blur-2xl sm:h-[480px] sm:w-[480px] sm:blur-[130px]" />
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
              href="#projects"
              onClick={(e) => handleScrollTo(e, "projects")}
              className="group inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_0_24px_rgba(217,184,255,0.3)] transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowDown
                size={15}
                className="transition-transform group-hover:translate-y-0.5 ms-1"
              />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "contact")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface/70 px-6 py-3.5 text-sm font-semibold text-text-base backdrop-blur-sm transition-colors hover:border-accent hover:bg-surface-elevated hover:text-accent cursor-pointer"
            >
              Let&apos;s Talk
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
          <div className="relative overflow-hidden rounded-[2.25rem] border border-border/80 bg-surface/60 p-4 shadow-2xl backdrop-blur-md sm:p-5 sm:backdrop-blur-xl">
            <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-2xl border border-border/60 bg-canvas sm:aspect-[4/4.5]">
              <img
                src="/portrait.webp"
                alt="Yousif Amr"
                decoding="async"
                className="aspect-[4/4.2] h-full w-full object-cover object-top contrast-105 transition-all duration-700 hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 dark:bg-gradient-to-t dark:from-canvas dark:via-canvas/20 dark:to-transparent dark:to-50%" />

              {/* Floating Featured Case Study Badge */}
              <div
                onClick={handleNavigateToFeaturedProject}
                className="group/badge absolute inset-x-3 bottom-3 cursor-pointer rounded-xl border border-border/80  p-3.5 shadow-lg backdrop-blur-lg transition-all duration-200 hover:border-accent hover:bg-surface-elevated bg-surface-elevated sm:inset-x-4 sm:bottom-4 sm:p-4"
              >
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span className="flex items-center gap-1.5 font-medium text-accent">
                    <Layers3 size={13} />
                    <span>Featured Delivery</span>
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-text-base sm:text-base">
                      {showcase.featuredProject.name}
                    </h2>
                    <p className="line-clamp-1 text-xs text-text-muted">
                      {showcase.featuredProject.description}
                    </p>
                  </div>

                  <a
                    href={`#project-${featuredProjectId}`}
                    onClick={handleNavigateToFeaturedProject}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text-base transition-colors group-hover/badge:border-accent group-hover/badge:text-accent cursor-pointer"
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
