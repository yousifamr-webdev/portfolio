import { ArrowUp, ArrowUpRight, Check, Code2, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { usePersona } from "../../context/PersonaContext";
import { portfolioData } from "../../data/portfolioData";
import { getNavigationLinks } from "../navigation/Navbar";
import { PersonalLogo } from "../ui/Logo";
import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "../ui/SocialIcons";
import { WatermarkMonogram } from "../ui/WatermarkMonogram";



export default function Footer() {
  const { persona } = usePersona();
  const [isCopied, setIsCopied] = useState(false);
  const links = getNavigationLinks(persona === "recruiter");
  const email = portfolioData.identity.email.replace("mailto:", "");

  const copyEmail = () => {
    void navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    });
  };

  return (
    <footer className="relative border-t border-border bg-surface/60 backdrop-blur-md overflow-hidden">
      {/* Top Main Grid */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
         <WatermarkMonogram
                  variant="ghost"
                  className="sm:w-[250%] lg:w-[50%] min-w-[1000px] top-[5%] -right-[120%] sm:-top-[40%] sm:-right-[120%] lg:-top-[75%] lg:-right-[10%]"
                />
        {/* Brand Column */}
        <div className="flex flex-col">
          <a
            className="group flex items-center gap-3.5 text-text-base transition-opacity hover:opacity-90"
            href="#top"
          >
            <span className="shrink-0 text-accent">
              <PersonalLogo tight className="h-9 w-9 text-accent" />
            </span>
            <div className="flex flex-col select-none">
              <span className="text-sm font-semibold text-center tracking-[0.32em] [word-spacing:-0.22em] text-text-base uppercase pl-[0.32em] whitespace-nowrap">
                YOUSIF AMR
              </span>
              <p className="text-[8px] font-semibold text-center uppercase tracking-[0.32em] text-text-muted pl-[0.38em]">
                Web Development
              </p>
            </div>
          </a>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-muted">
            Building functional production ready web systems, clean database
            schemas, and modern interactive user interfaces.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
            Explore
          </h2>
          <nav className="mt-5 grid gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                className="w-fit text-sm text-text-muted transition-colors hover:text-accent hover:translate-x-1 duration-200"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Engineering & Colophon Column */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
            Engineering
          </h2>
          <div className="mt-5 flex flex-col gap-3.5">
            <a
              href="https://github.com/yousifamr-webdev/portfolio"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-between rounded-xl border border-border/80 bg-surface/80 p-3 text-xs font-medium text-text-base transition-all hover:border-accent hover:bg-surface-elevated"
            >
              <div className="flex items-center gap-2.5">
                <Code2 size={16} className="text-accent" />
                <span>View Source Code</span>
              </div>
              <ArrowUpRight
                size={14}
                className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </a>

            <div className="rounded-xl border border-border/60 bg-surface/40 p-3 text-xs text-text-muted">
              <p className="font-semibold text-text-base">Built With</p>
              <p className="mt-1">
                React 19, TypeScript, Tailwind CSS & Framer Motion
              </p>
            </div>
          </div>
        </div>

        {/* Connect Column */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
            Connect
          </h2>

          {/* Quick Copy Email Box */}
          <div className="mt-5 flex items-center justify-between rounded-xl border border-border/80 bg-surface/80 p-2 pl-3 text-xs">
            <span className="truncate text-text-muted select-all">{email}</span>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-surface-elevated px-2.5 py-1.5 font-medium text-text-base transition-colors hover:border-accent hover:text-accent shrink-0"
            >
              {isCopied ? (
                <Check size={13} className="text-accent" />
              ) : (
                <Copy size={13} />
              )}
              <span>{isCopied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Social Network Icon Row (Real Icons) */}
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              aria-label="GitHub Profile"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface/70 text-text-muted transition-all hover:border-accent hover:bg-surface-elevated hover:text-accent"
              href={portfolioData.identity.github}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              aria-label="LinkedIn Profile"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface/70 text-text-muted transition-all hover:border-accent hover:bg-surface-elevated hover:text-accent"
              href={portfolioData.identity.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              aria-label="Facebook Profile"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface/70 text-text-muted transition-all hover:border-accent hover:bg-surface-elevated hover:text-accent"
              href={portfolioData.identity.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              aria-label="Instagram Profile"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface/70 text-text-muted transition-all hover:border-accent hover:bg-surface-elevated hover:text-accent"
              href={portfolioData.identity.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              aria-label="Send Direct Email"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface/70 text-text-muted transition-all hover:border-accent hover:bg-surface-elevated hover:text-accent"
              href={`mailto:${email}`}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-border/80 bg-surface/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-xs text-text-muted sm:flex-row md:px-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} {portfolioData.identity.name}. All
              rights reserved.
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span>Cairo, Egypt / Remote</span>
          </div>

          <button
            className="group inline-flex items-center gap-2 font-medium text-text-base transition-colors hover:text-accent"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>Back to Top</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:border-accent">
              <ArrowUp
                size={12}
                className="text-text-muted group-hover:text-accent"
              />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
