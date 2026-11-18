import { AnimatePresence, LayoutGroup } from 'framer-motion'
import type { ReactElement } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { usePersona } from './context/PersonaContext'
import IntroOverlay from './components/intro/IntroOverlay'
import Navbar from './components/navigation/Navbar'
import Footer from './components/footer/Footer'
import PortfolioHome from './pages/PortfolioHome'
import CaseStudyPage from './pages/CaseStudyPage'

function App(): ReactElement {
  return (
    <LayoutGroup>
      <Routes>
        <Route path="/case-study/:slug" element={<CaseStudyRoute />} />
        <Route path="*" element={<HomeRoute />} />
      </Routes>
    </LayoutGroup>
  )
}

function HomeRoute() {
  const { isIntroComplete, persona } = usePersona()

  return (
    <>
      {persona !== null && (
        <div key="portfolio" inert={!isIntroComplete}>
          <Navbar />
          <PortfolioHome />
          <Footer />
        </div>
      )}
      <AnimatePresence>
        {!isIntroComplete && <IntroOverlay key="intro" />}
      </AnimatePresence>
    </>
  )
}

function CaseStudyRoute() {
  const { slug = '' } = useParams()

  return (
    <>
      <Navbar />
      <CaseStudyPage slug={slug} />
      <Footer />
    </>
  )
}

export default App
