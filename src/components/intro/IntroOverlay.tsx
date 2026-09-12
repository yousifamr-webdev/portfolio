import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, Compass, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { usePersona } from "../../context/PersonaContext";
import { PersonalLogo } from "../ui/Logo";

const springTransition = {
  type: "spring" as const,
  stiffness: 160,
  damping: 24,
};

const THEATRICAL_INTRO_KEY = "has_seen_theatrical_intro";

function checkHasSeenIntro(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(THEATRICAL_INTRO_KEY) === "true";
}

export default function IntroOverlay() {
  const { persona, selectPersona } = usePersona();

  // Instantly true if the intro ran once or if an active persona already exists
  const [isReopening] = useState(() => checkHasSeenIntro() || Boolean(persona));
  const [isRevealed, setIsRevealed] = useState(isReopening);

  useEffect(() => {
    // Lock the flag immediately into session storage on first mount
    sessionStorage.setItem(THEATRICAL_INTRO_KEY, "true");

    if (!isReopening) {
      const timer = window.setTimeout(() => setIsRevealed(true), 1500);
      return () => window.clearTimeout(timer);
    }
  }, [isReopening]);

  const handleSelect = (nextPersona: "client" | "recruiter" | "curious") => {
    sessionStorage.setItem(THEATRICAL_INTRO_KEY, "true");
    selectPersona(nextPersona);
  };

  const handleSkip = () => {
    sessionStorage.setItem(THEATRICAL_INTRO_KEY, "true");
    selectPersona("recruiter");
  };

  return (
    <motion.section
      aria-label="Welcome screen"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-canvas px-4 sm:px-6 md:px-12"
      exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeInOut" } }}
      initial={{ opacity: 1 }}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-accent/5 blur-2xl sm:blur-[120px]" />
      </div>

      {/* Skip button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute right-6 top-6 sm:right-8 sm:top-8 z-10 text-xs font-semibold uppercase tracking-[0.25em] text-text-muted transition-colors hover:text-text-base cursor-pointer"
      >
        Skip →
      </button>

      {/* Main Container */}
      <motion.div
        transition={springTransition}
        className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center gap-8 md:flex-row md:gap-14 lg:gap-20"
      >
        {/* Left Column: Monogram + Wordmark */}
        <motion.div
          layout
          transition={springTransition}
          className="flex flex-col items-center justify-center origin-center shrink-0"
        >
          <motion.div
            layout
            layoutId="brand-monogram"
            initial={isReopening ? false : { scale: 3.8, opacity: 0 }}
            animate={{
              scale: isReopening ? 1 : isRevealed ? 1 : 1.38,
              opacity: 1,
            }}
            transition={{
              layout: springTransition,
              default: springTransition,
              scale: isReopening
                ? springTransition
                : isRevealed
                  ? springTransition
                  : { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: isReopening ? 0.2 : 0.65, ease: "easeOut" },
            }}
            className="relative flex shrink-0 transform-gpu items-center justify-center text-accent will-change-transform"
          >
            <div className="pointer-events-none absolute h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
            <PersonalLogo
              tight
              aria-label="Yousif Amr Monogram"
              className="h-28 w-28 text-accent sm:h-36 sm:w-36 md:h-48 md:w-48 lg:h-60 lg:w-60"
            />
          </motion.div>

          <AnimatePresence>
            {isRevealed && (
              <motion.div
                layout
                initial={isReopening ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: springTransition,
                  opacity: {
                    duration: isReopening ? 0.2 : 0.6,
                    delay: isReopening ? 0 : 0.15,
                    ease: "easeOut",
                  },
                  y: {
                    duration: isReopening ? 0.2 : 0.6,
                    delay: isReopening ? 0 : 0.15,
                    ease: "easeOut",
                  },
                }}
                className="mt-2 flex flex-col items-center text-center select-none"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-[0.42em] [word-spacing:-0.22em] text-text-base uppercase pl-[0.42em] whitespace-nowrap">
                  YOUSIF AMR
                </h2>
                <p className="mt-0.5 sm:mt-2 text-[0.6rem] md:text-sm font-semibold uppercase tracking-[0.38em] text-text-muted pl-[0.38em]">
                  Web Development
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subtle Architectural Divider */}
        {isRevealed && (
          <motion.div
            initial={isReopening ? { opacity: 0 } : { opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{
              duration: isReopening ? 0.2 : 0.4,
              delay: isReopening ? 0 : 0.2,
            }}
            className="hidden md:block h-64 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent"
          />
        )}

        {/* Right Column: Question + Mode Buttons */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={
                isReopening
                  ? { opacity: 0, x: 0 }
                  : { opacity: 0, x: 36 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{
                ...springTransition,
                delay: isReopening ? 0 : 0.1,
                opacity: { duration: isReopening ? 0.2 : 0.4 },
              }}
              className="flex w-full max-w-xl flex-col items-center text-center"
            >
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-text-base sm:text-4xl md:text-5xl lg:text-6xl">
                Who is visiting?
              </h1>

              <div className="mt-7 sm:mt-8 grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full max-w-[340px] sm:max-w-[460px] md:max-w-[500px]">
                {/* Potential client */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, borderColor: "var(--accent)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect("client")}
                  className="group flex w-full items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border border-border/80 bg-surface/70 py-3 sm:py-3.5 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-text-base backdrop-blur-md shadow-sm transition-all hover:border-accent hover:bg-surface-elevated hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap cursor-pointer"
                >
                  <BriefcaseBusiness className="h-4 w-4 sm:h-[18px] sm:w-[18px] shrink-0 text-text-muted transition-colors group-hover:text-accent" />
                  <span>Potential client</span>
                </motion.button>

                {/* Recruiter */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, borderColor: "var(--accent)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect("recruiter")}
                  className="group flex w-full items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border border-border/80 bg-surface/70 py-3 sm:py-3.5 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-text-base backdrop-blur-md shadow-sm transition-all hover:border-accent hover:bg-surface-elevated hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap cursor-pointer"
                >
                  <Terminal className="h-4 w-4 sm:h-[18px] sm:w-[18px] shrink-0 text-text-muted transition-colors group-hover:text-accent" />
                  <span>Recruiter</span>
                </motion.button>

                {/* Just Curious */}
                <div className="col-span-2 flex justify-center w-full">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleSelect("curious")}
                    className="flex w-[calc(50%-5px)] sm:w-[calc(50%-7px)] items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border border-accent bg-accent py-3 sm:py-3.5 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-bold text-accent-contrast shadow-[0_0_30px_rgba(217,184,255,0.35)] transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap cursor-pointer"
                  >
                    <Compass className="h-4 w-4 sm:h-[18px] sm:w-[18px] shrink-0" />
                    <span>Just curious</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
