// src/pages/PortfolioHome.tsx
import { usePersona } from "../context/PersonaContext";
import ClientHero from "../components/hero/ClientHero";
import RecruiterHero from "../components/hero/RecruiterHero";
import ProjectsSection from "../components/sections/ProjectsSection";
import ExperienceTimeline from "../components/sections/ExperienceTimeline";
import TechStackBento from "../components/sections/TechStackBento";
import ContactSection from "../components/sections/ContactSection";
import { WatermarkMonogram } from "../components/ui/WatermarkMonogram";

export default function PortfolioHome() {
  const { view } = usePersona();

  return (
    <div className="relative flex flex-col w-full bg-canvas text-text-base overflow-x-hidden">
      {/* Drafting Grid Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-architectural-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)]"
      />

      {/* 1. HERO: Top-right quadrant crop */}
      <div className="relative z-10 w-full overflow-hidden">
        <WatermarkMonogram
          variant="ghost"
          className="sm:w-[150%] lg:w-[100%] min-w-[500px] top-[5%] -right-[50%] sm:top-[5%] sm:-right-[20%] lg:-top-[5%] lg:right-[20%]"
        />
        <div id="top">
          {view === "VIEW_TECHNICAL" ? <RecruiterHero /> : <ClientHero />}
        </div>
      </div>

      {/* Section Transition Datum Line */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between border-t border-border/40 py-2">
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted/40">
            SYS // 01 · SELECTED_WORKS
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted/40">
            +
          </span>
        </div>
      </div>

      {/* 2. PROJECTS */}
      <div className="relative z-10 w-full">
        <ProjectsSection />
      </div>

      {/* Section Transition Datum Line */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between border-t border-border/40 py-2">
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted/40">
            SYS // 02 · TRACK_RECORD
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted/40">
            +
          </span>
        </div>
      </div>

      {/* 3. EXPERIENCE: Left edge watermark */}
      <div className="relative z-10 w-full overflow-hidden">
        <WatermarkMonogram
          variant="ghost"
          className="sm:w-[150%] lg:w-[100%] min-w-[560px] top-[35%] -left-[15%] sm:top-[5%] sm:-left-[20%] lg:-top-[5%] lg:left-[20%]"
        />
        <ExperienceTimeline />
      </div>

      {/* Section Transition Datum Line */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between border-t border-border/40 py-2">
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted/40">
            SYS // 03 · SPECIFICATIONS
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted/40">
            +
          </span>
        </div>
      </div>

      {/* 4. TECH STACK */}
      <div className="relative z-10 w-full">
        <TechStackBento />
      </div>

      {/* Section Transition Datum Line */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between border-t border-border/40 py-2">
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted/40">
            SYS // 04 · DISPATCH
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted/40">
            +
          </span>
        </div>
      </div>

      {/* 5. CONTACT */}
      <div className="relative z-10 w-full">
        <ContactSection />
      </div>
    </div>
  );
}
