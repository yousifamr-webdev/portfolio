import { usePersona } from "../context/PersonaContext";
import ClientHero from "../components/hero/ClientHero";
import RecruiterHero from "../components/hero/RecruiterHero";
import ProjectsSection from "../components/sections/ProjectsSection";
import ExperienceTimeline from "../components/sections/ExperienceTimeline";
import TechStackBento from "../components/sections/TechStackBento";
import ContactSection from "../components/sections/ContactSection";
import { DepthSeparator } from "../components/ui/DepthSeparator";

export default function PortfolioHome() {
  const { view } = usePersona();

  return (
    <div className="flex flex-col w-full bg-canvas text-text-base overflow-x-hidden">
      {/* 1. HERO */}
      <div id="top" className="relative z-10 w-full bg-canvas">
        {view === "VIEW_TECHNICAL" ? <RecruiterHero /> : <ClientHero />}
      </div>

      <DepthSeparator variant="sink" />

      {/* 2. PROJECTS (Subtle recessed bed) */}
      <div className="relative z-0 w-full bg-black/[0.01] dark:bg-white/[0.012]">
        <ProjectsSection />
      </div>

      <DepthSeparator variant="lift" />

      {/* 3. EXPERIENCE */}
      <div className="relative z-10 w-full bg-canvas">
        <ExperienceTimeline />
      </div>

      <DepthSeparator variant="sink" />

      {/* 4. TECH STACK (Subtle recessed bed) */}
      <div className="relative z-0 w-full bg-black/[0.01] dark:bg-white/[0.012]">
        <TechStackBento />
      </div>

      <DepthSeparator variant="lift" />

      {/* 5. CONTACT */}
      <div className="relative z-10 w-full bg-canvas">
        <ContactSection />
      </div>
    </div>
  );
}
