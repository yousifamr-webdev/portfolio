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

// Module-level session memory: survives component unmounting when switching modes
let hasCompletedInitialIntro = false;

export default function IntroOverlay() {
  const { persona, selectPersona } = usePersona();

  // If this session already ran the intro or has an active persona, it's a navbar switch
  const isReopening = hasCompletedInitialIntro || Boolean(persona);
  const [isRevealed, setIsRevealed] = useState(isReopening);

  useEffect(() => {
    // Only run the 1.5s theatrical hold on the very first page load
    if (!isReopening) {
      const timer = window.setTimeout(() => setIsRevealed(true), 1500);
      return () => window.clearTimeout(timer);
    }
  }, [isReopening]);

  const handleSelect = (nextPersona: "client" | "recruiter" | "curious") => {
    hasCompletedInitialIntro = true;
    selectPersona(nextPersona);
  };

  const handleSkip = () => {
    hasCompletedInitialIntro = true;
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
        <div className="h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      {/* Skip button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute right-6 top-6 sm:right-8 sm:top-8 z-10 text-xs font-semibold uppercase tracking-[0.25em] text-text-muted transition-colors hover:text-text-base"
      >
        Skip →
      </button>

      {/* Main Container: On reopening, both columns mount on frame 0 so the logo never centers */}
      <motion.div
        layout
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
            // If reopening, initial={false} glides smoothly from the navbar's exact screen position
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
            className="flex shrink-0 items-center justify-center text-accent"
          >
            <PersonalLogo
              tight
              aria-label="Yousif Amr Monogram"
              className="h-28 w-28 sm:h-36 sm:w-36 md:h-48 md:w-48 lg:h-60 lg:w-60 text-accent drop-shadow-[0_0_45px_rgba(217,184,255,0.38)]"
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
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-[0.42em] text-text-base uppercase pl-[0.42em]">
                  YOUSIF&nbsp;AMR
                </h2>
                <p className="mt-1.5 sm:mt-2 text-xs md:text-sm font-semibold uppercase tracking-[0.38em] text-text-muted pl-[0.38em]">
                  Web Developer
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

        {/* Right Column: Question + Pills */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={
                isReopening
                  ? { opacity: 0 }
                  : { opacity: 0, x: 36, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
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
                  className="group flex w-full items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border border-border/80 bg-surface/70 py-3 sm:py-3.5 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-text-base backdrop-blur-md shadow-sm transition-all hover:border-accent hover:bg-surface-elevated hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap"
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
                  className="group flex w-full items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border border-border/80 bg-surface/70 py-3 sm:py-3.5 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-text-base backdrop-blur-md shadow-sm transition-all hover:border-accent hover:bg-surface-elevated hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap"
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
                    className="flex w-[calc(50%-5px)] sm:w-[calc(50%-7px)] items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border border-accent bg-accent py-3 sm:py-3.5 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-bold text-accent-contrast shadow-[0_0_30px_rgba(217,184,255,0.35)] transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap"
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
