import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { usePersona } from './context/PersonaContext'
import IntroOverlay from './components/intro/IntroOverlay'
import Navbar from './components/navigation/Navbar'
import Footer from './components/Footer/Footer'
import PortfolioHome from './pages/PortfolioHome'

function App() {
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
