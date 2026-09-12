import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Clock,
  Code2,
  Database,
  GitBranch,
  Layers,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { MouseEvent } from "react";
import { portfolioData } from "../../data/portfolioData";

const springTransition = {
  type: "spring" as const,
  stiffness: 240,
  damping: 24,
};

const flagshipBenchmarks = [
  {
    project: "E-Commerce Engine",
    githubUrl: "https://github.com/yousifamr-webdev/E-Commerce-NestJS-",
    metric: "68 Endpoints",
    title: "Modular NestJS Architecture",
    description:
      "Enterprise REST API structured with dependency injection, DTOs, custom interceptors, and centralized exception filters.",
    icon: Zap,
    tag: "Backend Core",
  },
  {
    project: "E-Commerce Data Layer",
    githubUrl: "https://github.com/yousifamr-webdev/E-Commerce-NestJS-",
    metric: "11 Schemas",
    title: "Relational Mongoose Models",
    description:
      "Normalized NoSQL data structures with deep population, indexed search queries, and automated validation rules.",
    icon: Database,
    tag: "Database Design",
  },
  {
    project: "Social Platform",
    githubUrl: "https://github.com/yousifamr-webdev/Social_App_BE",
    metric: "Sub-50ms",
    title: "Real-Time WebSocket Pipeline",
    description:
      "Bidirectional Socket.io rooms with MVC state separation, instant messaging streams, and live interaction events.",
    icon: Layers,
    tag: "Event Systems",
  },
  {
    project: "Security Architecture",
    metric: "Zero-Trust",
    title: "JWT RBAC & Zod Validation",
    description:
      "Stateless bearer token authentication paired with role-based route guards and strict runtime payload validation.",
    icon: ShieldCheck,
    tag: "Auth & Security",
  },
];

export default function RecruiterHero() {
  const shouldReduceMotion = useReducedMotion();
  const { identity, recruiter } = portfolioData;

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

  const leftAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: springTransition,
      };

  const rightAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        transition: { ...springTransition, delay: 0.12 },
      };

  return (
    <main
      aria-labelledby="recruiter-hero-heading"
      className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 md:px-10 md:pb-24 md:pt-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-[22%] -translate-y-1/2"
      >
        <div className="h-[280px] w-[280px] rounded-full bg-accent/8 blur-2xl sm:h-[420px] sm:w-[420px] sm:blur-[120px]" />
      </div>

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Left Column: Role & Hiring Conversion Actions */}
        <motion.div {...leftAnimation} className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
            <span>Technical Profile</span>
          </div>

          <h1
            id="recruiter-hero-heading"
            className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-text-base"
          >
            {recruiter.title}
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-text-muted sm:mt-6 sm:text-base sm:leading-8">
            Building comprehensive full-stack systems from type-safe database
            schemas and high-throughput modular APIs to fluid responsive
            frontends.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="/resume.pdf"
              download="Yousif_Amr_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_0_24px_rgba(217,184,255,0.22)] transition-all duration-200 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas cursor-pointer"
            >
              <ArrowDownToLine size={16} aria-hidden="true" />
              <span>Download Resume</span>
            </a>

            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, "projects")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface/70 px-5 py-3.5 text-sm font-semibold text-text-base backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:bg-surface-elevated hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "contact")}
              className="inline-flex items-center justify-center rounded-xl border border-border/80 bg-surface/70 px-6 py-3.5 text-sm font-semibold text-text-base backdrop-blur-sm transition-colors hover:border-accent hover:bg-surface-elevated hover:text-accent cursor-pointer"
            >
              Let&apos;s Talk
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" className="text-accent" />
              <span>Cairo, Egypt · Remote worldwide</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" className="text-accent" />
              <span>UTC+2 · Available to start immediately</span>
            </span>
          </div>
        </motion.div>

        {/* Right Column: Profile Dossier Card */}
        <motion.aside
          {...rightAnimation}
          aria-label="Professional profile and technical focus"
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface/60 p-5 shadow-2xl backdrop-blur-md sm:rounded-[2.25rem] sm:p-6 sm:backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />

            <div className="flex items-center gap-4 sm:gap-5 border-b border-border/60 pb-5">
              <div className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-border/80 bg-canvas shadow-md sm:h-28 sm:w-28">
                <img
                  src="/portrait-small.webp"
                  alt="Yousif Amr"
                  decoding="async"
                  className="aspect-square h-full w-full object-cover object-top contrast-105 transition-transform duration-500 group-hover:scale-105"
                  fetchPriority="high"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/40" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface px-2.5 py-0.5 text-[10px] font-medium text-text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Available for Full-Time Roles</span>
                </div>

                <h2 className="mt-2 text-lg font-bold tracking-tight text-text-base sm:text-xl truncate">
                  {identity.name}
                </h2>

                <p className="mt-0.5 text-xs font-semibold text-accent tracking-wide">
                  Backend Architecture &amp; Type-Safe Systems
                </p>

                <p className="mt-1 text-[11px] text-text-muted/80">
                  M-E-R-N Stack
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  <Code2 size={13} aria-hidden="true" className="text-accent" />
                  <span>Core Stack</span>
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {recruiter.stack.map((technology) => (
                  <span
                    key={technology}
                    className="inline-flex items-center rounded-xl border border-border/70 bg-canvas/70 px-3 py-1.5 text-xs font-medium text-text-base transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Flagship Engineering Benchmarks */}
      <section
        aria-labelledby="benchmarks-heading"
        className="mt-14 sm:mt-16 border-t border-border/60 pt-10 sm:pt-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Architectural Proof
            </p>
            <h2
              id="benchmarks-heading"
              className="mt-1 text-2xl font-bold tracking-tight text-text-base sm:text-3xl"
            >
              Flagship Implementation Specs
            </h2>
          </div>

          <a
            href="https://github.com/yousifamr-webdev/"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-accent"
          >
            <span>Inspect repository implementations</span>
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flagshipBenchmarks.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-surface/50 p-5 backdrop-blur-sm transition-all duration-200 hover:border-accent/60 hover:bg-surface-elevated/70"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        ...springTransition,
                        delay: 0.15 + index * 0.05,
                      }
                }
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-border/70 bg-canvas/60 px-2 py-0.5 text-[10px] font-mono font-medium text-text-muted tracking-wider">
                      {item.project}
                    </span>
                    <span className="font-mono text-xs font-bold text-accent">
                      {item.metric}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Icon size={16} className="shrink-0 text-accent" />
                    <h3 className="text-sm font-bold tracking-tight text-text-base">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-text-muted group-hover:text-text-base/90 transition-colors">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-text-muted/70 font-mono">
                  <span>{item.tag}</span>
                  {item.githubUrl ? (
                    <a
                      href={item.githubUrl}
                      className="opacity-0 group-hover:opacity-100 text-accent transition-opacity"
                    >
                      Verify Specs →
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
