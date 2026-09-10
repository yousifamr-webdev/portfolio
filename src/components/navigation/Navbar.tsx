import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseBusiness,
  Compass,
  Menu,
  Moon,
  RefreshCw,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePersona } from "../../context/PersonaContext";
import { useTheme } from "../../context/ThemeContext";
import { PersonalLogo } from "../ui/Logo";

interface NavigationLink {
  label: string;
  href: string;
}

const recruiterLinks: NavigationLink[] = [
  { label: "Overview", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const showcaseLinks: NavigationLink[] = [
  { label: "Work", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const getNavigationLinks = (isRecruiter: boolean) =>
  isRecruiter ? recruiterLinks : showcaseLinks;

// Matching spring physics with IntroOverlay
const springTransition = {
  type: "spring" as const,
  stiffness: 160,
  damping: 24,
};

export default function Navbar() {
  const { persona, reopenIntro } = usePersona();
  const { theme, toggleTheme } = useTheme();
  const [activeHref, setActiveHref] = useState("#top");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isRecruiter = persona === "recruiter";
  const links = getNavigationLinks(isRecruiter);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect()
  }, [links]);

  const closeMenu = () => setIsMenuOpen(false);

  const personaConfig = {
    recruiter: { label: "Recruiter", icon: Terminal },
    client: { label: "Client", icon: BriefcaseBusiness },
    curious: { label: "Curious", icon: Compass },
  };

  const CurrentPersonaIcon = persona
    ? personaConfig[persona]?.icon || Terminal
    : Terminal;
  const currentPersonaLabel = persona
    ? personaConfig[persona]?.label || "Explorer"
    : "Explorer";

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/80 bg-canvas/80 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl"
          : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 md:px-10">
        {/* Brand Monogram & Lockup */}
        <a
          className="group flex items-center gap-3.5 text-text-base transition-opacity hover:opacity-90"
          href="#top"
          onClick={closeMenu}
        >
          <motion.div
            layoutId="brand-monogram"
            transition={springTransition}
            className="shrink-0 text-accent"
          >
            {/* Removed transition-transform to prevent CSS fighting Framer Motion */}
            <PersonalLogo tight className="h-9 w-9 text-accent" />
          </motion.div>
         
        </a>

        {/* Center Desktop Navigation */}
        <div className="hidden items-center rounded-full border border-border/60 bg-surface/50 p-1 backdrop-blur-md lg:flex">
          {links.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-text-base"
                    : "text-text-muted hover:text-text-base"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full border border-border bg-surface-elevated shadow-sm"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Persona Switcher */}
          <button
            type="button"
            onClick={reopenIntro}
            aria-label="Switch persona view"
            className="group hidden items-center gap-2.5 rounded-full border border-border/70 bg-surface/60 py-1.5 pl-3 pr-3 text-xs backdrop-blur-md transition-all hover:border-accent hover:bg-surface-elevated sm:flex"
          >

            <span className="text-text-muted">
              Mode:{" "}
              <strong className="font-semibold text-text-base">
                {currentPersonaLabel}
              </strong>
            </span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-surface text-text-muted transition-colors group-hover:text-accent">
              <RefreshCw
                size={11}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </div>
          </button>

          {/* Theme Toggle */}
          <button
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface/60 text-accent backdrop-blur-md transition-all hover:border-accent hover:bg-surface-elevated"
            type="button"
            onClick={toggleTheme}
          >
            <motion.span
              animate={{ rotate: theme === "dark" ? 0 : 180, scale: [0.9, 1] }}
              transition={{ duration: 0.3 }}
              className="block"
            >
              {theme === "dark" ? <Moon size={17} /> : <Sun size={17} />}
            </motion.span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            aria-expanded={isMenuOpen}
            aria-label="Open navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface/60 text-text-base backdrop-blur-md transition-all hover:border-accent lg:hidden"
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/60 bg-canvas/95 px-6 py-5 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((link, idx) => {
                const isActive = activeHref === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "border border-border bg-surface text-accent font-semibold"
                        : "text-text-muted hover:bg-surface/50 hover:text-text-base"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                  </motion.a>
                );
              })}

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.04 }}
                type="button"
                onClick={() => {
                  closeMenu();
                  reopenIntro();
                }}
                className="mt-2 flex items-center justify-between rounded-xl border border-border/80 bg-surface/80 px-4 py-3 text-left text-sm font-medium text-text-base transition-colors hover:border-accent"
              >
                <div className="flex items-center gap-2.5">
                  <CurrentPersonaIcon size={16} className="text-accent" />
                  <span>
                    Viewing as:{" "}
                    <strong className="font-semibold text-accent">
                      {currentPersonaLabel}
                    </strong>
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wider text-text-muted">
                  Change
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}