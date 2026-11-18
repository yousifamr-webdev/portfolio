import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCaseStudy,
  type CaseStudySection,
} from "../data/caseStudies";
import { portfolioData } from "../data/portfolioData";
import { NAVBAR_OFFSET } from "../utils/scroll";

function CaseStudyBodySection({
  section,
  index,
}: {
  section: CaseStudySection;
  index: number;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 rounded-2xl border border-border/80 bg-surface/60 p-5 sm:backdrop-blur-md sm:rounded-3xl sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {String(index + 1).padStart(2, "0")} · {section.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-base sm:text-3xl">
        {section.title}
      </h2>
      <div className="mt-5 grid gap-4 text-sm leading-relaxed text-text-muted sm:text-base">
        {section.body.map((paragraph, paragraphIndex) => (
          <p key={`${section.id}-paragraph-${paragraphIndex}`}>{paragraph}</p>
        ))}
      </div>

      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-6 grid gap-3 text-sm text-text-muted">
          {section.bullets.map((bullet) => (
            <li
              key={bullet}
              className="rounded-xl border border-border/70 bg-surface-elevated/60 px-4 py-3"
            >
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {section.stats && section.stats.length > 0 && (
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {section.stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="rounded-xl border border-border/70 bg-surface-elevated/60 p-4"
            >
              <p className="text-2xl font-bold text-accent">{stat.value}</p>
              <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {section.decisions && section.decisions.length > 0 && (
        <div className="mt-7 grid gap-4">
          {section.decisions.map((decision, decisionIndex) => (
            <div
              key={`${section.id}-decision-${decisionIndex}`}
              className="rounded-xl border border-border/70 bg-surface-elevated/50 p-4 sm:p-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Decision
                  </p>
                  <p className="mt-1.5 text-sm text-text-base">
                    {decision.decision}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Why
                  </p>
                  <p className="mt-1.5 text-sm text-text-muted">
                    {decision.why}
                  </p>
                </div>
                {decision.tradeoff && (
                  <div className="sm:col-span-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      Trade-off
                    </p>
                    <p className="mt-1.5 text-sm text-text-muted">
                      {decision.tradeoff}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {section.image && (
        <figure className="mt-7 overflow-hidden rounded-2xl border border-border/70 bg-canvas">
          <img
            src={section.image.src}
            alt={section.image.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-cover"
          />
          {section.image.caption && (
            <figcaption className="border-t border-border/70 px-4 py-3 text-xs text-text-muted">
              {section.image.caption}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
}

function CaseStudyNotFound() {
  return (
    <main className="relative z-10 mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:backdrop-blur-sm">
        Case Study
      </span>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-text-base sm:text-5xl">
        Case study not found
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-muted sm:text-base">
        This case study may have moved or is not available yet. Explore the
        project collection to find another one.
      </p>
      <Link
        to="/"
        state={{ scrollTo: "#projects" }}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
      >
        <ArrowDownLeft size={16} />
        Back to projects
      </Link>
    </main>
  );
}

export default function CaseStudyPage({ slug }: { slug: string }) {
  const caseStudy = getCaseStudy(slug);
  const caseStudyTitle = caseStudy?.title;
  const [activeSection, setActiveSection] = useState(
    caseStudy?.sections[0]?.id ?? "",
  );
  const project = caseStudy
    ? portfolioData.projects.find(
        (portfolioProject) => portfolioProject.id === caseStudy.projectId,
      )
    : undefined;

  useEffect(() => {
    document.title = caseStudyTitle
      ? `${caseStudyTitle} | Yousif Amr`
      : "Case Study Not Found | Yousif Amr";
  }, [caseStudyTitle, slug]);

  useEffect(() => {
    const routeCaseStudy = getCaseStudy(slug);
    if (!routeCaseStudy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );
        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: `-${NAVBAR_OFFSET}px 0px -65% 0px` },
    );

    routeCaseStudy.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [slug]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-canvas text-text-base">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-architectural-grid [contain:paint] max-sm:[mask-image:none] md:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] [transform:translate3d(0,0,0)]"
      />
      {caseStudy ? (
        <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10 md:px-10">
          <Link
            to="/"
            state={{ scrollTo: "#projects" }}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent"
          >
            <ArrowDownLeft size={16} />
            Back to projects
          </Link>

          <div className="mt-8 rounded-2xl border border-border/80 bg-surface/60 p-5 sm:backdrop-blur-md sm:rounded-3xl sm:p-8 lg:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:backdrop-blur-sm">
              Case Study
            </span>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-text-base sm:text-5xl md:text-6xl">
              {caseStudy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-muted sm:text-lg">
              {caseStudy.tagline}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Role", value: caseStudy.meta.role },
                { label: "Timeline", value: caseStudy.meta.timeline },
                { label: "Type", value: caseStudy.meta.type },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border/70 bg-surface-elevated/50 p-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-text-base">
                    {item.value}
                  </p>
                </div>
              ))}
              <div className="rounded-xl border border-border/70 bg-surface-elevated/50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Tools
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {caseStudy.meta.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-border/70 bg-surface px-2.5 py-1 text-[10px] font-medium text-text-base"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {(project?.liveUrl || project?.githubUrl) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface-elevated/70 px-4 py-2.5 text-sm font-semibold text-text-base transition-colors hover:border-accent hover:text-accent"
                  >
                    Live project
                    <ArrowUpRight size={15} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface-elevated/70 px-4 py-2.5 text-sm font-semibold text-text-base transition-colors hover:border-accent hover:text-accent"
                  >
                    Source
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
            <aside className="hidden lg:block">
              <nav
                aria-label="Case study sections"
                className="sticky top-[calc(76px+2rem)] rounded-2xl border border-border/80 bg-surface/60 p-4 sm:backdrop-blur-md"
              >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  On this page
                </p>
                <ul className="grid gap-1">
                  {caseStudy.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          const target = document.getElementById(section.id);
                          if (target) {
                            window.scrollTo({
                              top:
                                target.getBoundingClientRect().top +
                                window.scrollY -
                                NAVBAR_OFFSET,
                              behavior: "smooth",
                            });
                          }
                        }}
                        className={`block rounded-lg px-3 py-2 text-xs transition-colors ${
                          activeSection === section.id
                            ? "bg-surface-elevated text-accent"
                            : "text-text-muted hover:text-text-base"
                        }`}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="grid min-w-0 gap-5">
              {caseStudy.sections.map((section, index) => (
                <CaseStudyBodySection
                  key={section.id}
                  section={section}
                  index={index}
                />
              ))}

              <div className="rounded-2xl border border-border/80 bg-surface/60 p-6 sm:backdrop-blur-md sm:rounded-3xl sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Next step
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-base sm:text-3xl">
                  Have a project in mind?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
                  Let&apos;s talk about what you&apos;re building and how I can
                  help.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    state={{ scrollTo: "#projects" }}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface-elevated/70 px-4 py-2.5 text-sm font-semibold text-text-base transition-colors hover:border-accent hover:text-accent"
                  >
                    <ArrowDownLeft size={16} />
                    Back to projects
                  </Link>
                  <Link
                    to="/"
                    state={{ scrollTo: "#contact" }}
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
                  >
                    Let&apos;s talk
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <CaseStudyNotFound />
      )}
    </div>
  );
}

