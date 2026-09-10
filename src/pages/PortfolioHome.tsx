import { usePersona } from '../context/PersonaContext'
import ClientHero from '../components/hero/ClientHero'
import RecruiterHero from '../components/hero/RecruiterHero'
import ProjectsSection from '../components/sections/ProjectsSection'
import ExperienceTimeline from '../components/sections/ExperienceTimeline'
import TechStackBento from '../components/sections/TechStackBento'
import ContactSection from '../components/sections/ContactSection'

export default function PortfolioHome() {
  const { view } = usePersona()
  return (
    <>
      <div id="top">
        {view === 'VIEW_TECHNICAL' ? <RecruiterHero /> : <ClientHero />}
      </div>
      <ProjectsSection />
      <ExperienceTimeline />
      <TechStackBento />
      <ContactSection />
    </>
  )
}
