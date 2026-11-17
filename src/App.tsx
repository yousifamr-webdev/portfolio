import { AnimatePresence, LayoutGroup } from 'framer-motion'
import type { ReactElement } from 'react'
import { usePersona } from './context/PersonaContext'
import IntroOverlay from './components/intro/IntroOverlay'
import Navbar from './components/navigation/Navbar'
import Footer from './components/footer/Footer'
import PortfolioHome from './pages/PortfolioHome'

function App(): ReactElement {
  const { isIntroComplete, persona } = usePersona()

  return (
    <LayoutGroup>
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
    </LayoutGroup>
  )
}

export default App
