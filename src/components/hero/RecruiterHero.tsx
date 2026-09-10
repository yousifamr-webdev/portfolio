import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  Check,
  Clock,
  Code2,
  Copy,
  Mail,
  MapPin,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { portfolioData } from "../../data/portfolioData";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { PersonalLogo } from "../ui/Logo";

const springTransition = {
  type: "spring" as const,
  stiffness: 240,
  damping: 24,
};

export default function RecruiterHero() {
  const [isCopied, setIsCopied] = useState(false);
  const { identity, recruiter } = portfolioData;

  const copyEmail = () => {
    void navigator.clipboard.writeText(identity.email).then(() => {
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    });
  };

  return (
    <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 md:px-10 md:pt-24 lg:pt-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute right-1/4 top-1/4 -translate-y-1/2">
        <div className="h-[320px] w-[320px] rounded-full bg-accent/10 blur-[130px] sm:h-[480px] sm:w-[480px]" />
      </div>

      <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Left Column: Fast Technical Scanning */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="flex flex-col items-start"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-accent backdrop-blur-sm">
            <Terminal size={13} />
            <span>Technical Engineering Profile</span>
          </div>

          {/* Title & Core Stack */}
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-text-base sm:text-5xl md:text-6xl lg:text-7xl">
            {recruiter.title}
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-muted sm:mt-6 sm:text-base sm:leading-8">
            Building resilient full-stack architectures from type-safe database
            schemas and high-throughput APIs to fluid interactive frontends.
          </p>

          {/* Core Recruiter Quick-Actions */}
          <div className="mt-8 flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast shadow-[0_0_24px_rgba(217,184,255,0.3)] transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              href="/resume.pdf"
              download="Yousif_Amr_Resume.pdf"
            >
              <ArrowDownToLine size={16} />
              <span>Download Resume</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface/70 px-5 py-3 text-sm font-semibold text-text-base backdrop-blur-sm transition-colors hover:border-accent hover:bg-surface-elevated hover:text-accent"
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              <span>{isCopied ? "Email Copied" : "Copy Email"}</span>
            </button>

            {/* Direct Verification Links */}
            <div className="flex items-center gap-2">
              <a
                aria-label="GitHub profile"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-surface/70 text-text-base transition-colors hover:border-accent hover:text-accent"
                href={identity.github}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>

              <a
                aria-label="LinkedIn profile"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-surface/70 text-text-base transition-colors hover:border-accent hover:text-accent"
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>

              <a
                aria-label="Send direct email"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-surface/70 text-text-base transition-colors hover:border-accent hover:text-accent"
                href={`mailto:${identity.email}`}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Clearance & Logistics */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-accent" />
              <span>Cairo, Egypt · Remote worldwide</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-accent" />
              <span>UTC+2 · Immediate availability</span>
            </span>
          </div>
        </motion.div>

        {/* Right Column: Engineering Dossier ID Card */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springTransition, delay: 0.12 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="overflow-hidden rounded-[2.5rem] border border-border/80 bg-surface/60 p-5 shadow-2xl backdrop-blur-xl">
            {/* Header Lockup */}
            <div className="flex items-center gap-3.5 border-b border-border/60 pb-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border bg-canvas">
                <img
                  src="/portrait.webp"
                  alt="Yousif Amr"
                  className="h-full w-full object-cover object-top contrast-105"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-text-base">
                    {identity.name}
                  </h2>
                  <PersonalLogo tight className="h-4 w-4 text-accent" />
                </div>
                <p className="text-xs text-text-muted">
                  Full-Stack Software Engineer
                </p>
              </div>
            </div>

            {/* Core Stack Pill Cloud */}
            <div className="mt-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                <Code2 size={13} className="text-accent" />
                <span>Primary Technical Stack</span>
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {recruiter.stack.map((technology) => (
                  <span
                    key={technology}
                    className="inline-flex items-center rounded-xl border border-border/70 bg-canvas/70 px-3 py-1.5 text-xs font-medium text-text-base transition-colors hover:border-accent hover:text-accent"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      </section>

      {/* Bottom Architectural Metrics */}
      <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recruiter.metrics.map((metric, index) => (
          <motion.div
            key={metric}
            className="group rounded-2xl border border-border/80 bg-surface/60 p-5 backdrop-blur-sm transition-all hover:border-accent/60 hover:bg-surface-elevated/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.15 + index * 0.05 }}
          >
            <span className="font-mono text-xl font-bold text-accent">
              0{index + 1}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-text-muted transition-colors group-hover:text-text-base">
              {metric}
            </p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
