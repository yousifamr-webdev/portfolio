import { AnimatePresence, LayoutGroup } from 'framer-motion'
import type { ReactElement } from 'react'
import { usePersona } from './context/PersonaContext'
import IntroOverlay from './components/intro/IntroOverlay'
import Navbar from './components/navigation/Navbar'
import Footer from './components/footer/Footer'
import PortfolioHome from './pages/PortfolioHome'

function App(): ReactElement {
  const { isIntroComplete } = usePersona()

  return (
    <LayoutGroup>
      <AnimatePresence>
        {isIntroComplete ? (
          <div key="portfolio">
            <Navbar />
            <PortfolioHome />
            <Footer />
          </div>
        ) : (
          <IntroOverlay key="intro" />
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}

export default App
