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
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePersona } from "../../context/PersonaContext";
import { useTheme } from "../../context/ThemeContext";
import { getNavigationLinks } from "../../data/navigation";
import { springTransition } from "../../utils/motion";
import { scrollToElement } from "../../utils/scroll";
import { PersonalLogo } from "../ui/Logo";
import { HamburgerButton } from "../ui/HamburgerButton";

const personaConfig = {
  recruiter: { label: "Recruiter", icon: Terminal },
  client: { label: "Client", icon: BriefcaseBusiness },
  curious: { label: "Curious", icon: Compass },
};

export default function Navbar() {
  const {
    isIntroComplete,
    persona,
    reopenIntro,
    shouldAnimateIntroExit,
  } = usePersona();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isCaseStudy = location.pathname.startsWith("/case-study/");
  const [activeHref, setActiveHref] = useState("#top");
  const activeNavHref = isCaseStudy ? "#projects" : activeHref;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollFrame = useRef<number | null>(null);
  const scrolledState = useRef(false);

  const isRecruiter = persona === "recruiter";
  const links = useMemo(() => getNavigationLinks(isRecruiter), [isRecruiter]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrame.current !== null) return;

      scrollFrame.current = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const nextIsScrolled = scrollY > 20;

        if (scrolledState.current !== nextIsScrolled) {
          scrolledState.current = nextIsScrolled;
          setIsScrolled(nextIsScrolled);
        }
        if (scrollY < 80) {
          setActiveHref("#top");
        }

        scrollFrame.current = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = links
      .map(({ href }) =>
        href !== "#top" ? document.querySelector(href) : null,
      )
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
    return () => observer.disconnect();
  }, [links, location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: href } });
      return;
    }

    setTimeout(() => {
      if (href === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveHref("#top");
        return;
      }

      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        scrollToElement(target);
        setActiveHref(href);
      }
    }, 100);
  };

  const handleSwitchPersona = () => {
    reopenIntro();
    navigate("/");
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    event.preventDefault();
    navigate("/", { state: { scrollTo: "#top" } });
  };

  const CurrentPersonaIcon = persona
    ? personaConfig[persona].icon
    : Terminal;
  const currentPersonaLabel = persona
    ? personaConfig[persona].label
    : "Explorer";

  return (
    <header className="sticky top-0 z-40 w-full">
      <nav aria-label="Primary navigation" className="w-full">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 border-b bg-canvas/80 backdrop-blur-md sm:backdrop-blur-xl transition-opacity duration-300 ease-out ${
          isScrolled || isMenuOpen
            ? "opacity-100 border-border/80 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            : "opacity-0 border-transparent"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 border-b border-border/80 bg-canvas transition-opacity duration-200 ease-out lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Top Header Bar Layer */}
      <div className="w-full">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 md:px-10">
            {/* Brand Monogram Only */}
            <Link
              aria-label="Yousif Amr — Home"
              className="group flex items-center gap-3.5 text-text-base transition-opacity hover:opacity-90"
              to="/"
              onClick={handleLogoClick}
            >
              <motion.div
                layoutId="brand-monogram"
                layoutDependency={isIntroComplete}
                transition={
                  isCaseStudy || !shouldAnimateIntroExit
                    ? { duration: 0 }
                    : springTransition
                }
                className="shrink-0 text-accent"
              >
                <PersonalLogo tight className="h-9 w-9 text-accent" aria-hidden="true" />
              </motion.div>
            </Link>

            {/* Center Desktop Navigation */}
            <div className="hidden items-center rounded-full border border-border/60 bg-surface/50 p-1 sm:backdrop-blur-md lg:flex">
              {links.map((link) => {
                const isActive = activeNavHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-text-base"
                        : "text-text-muted hover:text-text-base"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        key={isCaseStudy ? "case-study" : "home"}
                        layoutId={
                          isCaseStudy
                            ? "active-nav-pill-case-study"
                            : "active-nav-pill"
                        }
                        layoutDependency={activeNavHref}
                        transition={
                          isCaseStudy
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 350, damping: 30 }
                        }
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
                onClick={handleSwitchPersona}
                aria-label="Switch persona view"
                className="group hidden items-center gap-2.5 rounded-full border border-border/70 bg-surface/60 py-1.5 pl-3 pr-3 text-xs sm:backdrop-blur-md transition-colors hover:border-accent hover:bg-surface-elevated sm:flex"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface/60 text-accent sm:backdrop-blur-md transition-colors hover:border-accent hover:bg-surface-elevated"
                type="button"
                onClick={toggleTheme}
              >
                <motion.span
                  animate={{
                    rotate: theme === "dark" ? 0 : 180,
                    scale: [0.9, 1],
                  }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  {theme === "dark" ? <Moon size={17} /> : <Sun size={17} />}
                </motion.span>
              </button>

              {/* Mobile Animated Hamburger Button */}
              <HamburgerButton
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen((prev) => !prev)}
                size={14}
              />
            </div>
          </div>
        </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute left-0 top-full w-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-border/80 bg-canvas px-6 py-5 shadow-lg lg:hidden"
          >
              <div className="flex flex-col gap-2 touch-manipulation">
                {links.map((link, idx) => {
                  const isActive = activeNavHref === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
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
                  transition={{ delay: links.length * 0.03 }}
                  type="button"
                  onClick={() => {
                    closeMenu();
                    handleSwitchPersona();
                  }}
                  className="mt-2 flex items-center justify-between rounded-xl border border-border/80 bg-surface/80 px-4 py-3 text-left text-sm font-medium text-text-base transition-colors hover:border-accent cursor-pointer"
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
    </header>
  );
}
