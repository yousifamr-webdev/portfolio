import { AnimatePresence, LayoutGroup } from "framer-motion";
import type { ReactElement } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Footer from "./components/footer/Footer";
import IntroOverlay from "./components/intro/IntroOverlay";
import Navbar from "./components/navigation/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { usePersona } from "./context/PersonaContext";
import CaseStudyPage from "./pages/CaseStudyPage";
import PortfolioHome from "./pages/PortfolioHome";
import { Analytics } from "@vercel/analytics/react";

function App(): ReactElement {
  return (
    <LayoutGroup>
      <SiteShell />
      <Analytics/>
    </LayoutGroup>
  );
}

function SiteShell() {
  const { isIntroComplete, persona } = usePersona();
  const { pathname } = useLocation();
  const isCaseStudy = pathname.startsWith("/case-study/");
  const showIntro = !isIntroComplete && !isCaseStudy;
  const showChrome = persona !== null || isCaseStudy;

  return (
    <>
      <ScrollToTop />
      <div inert={showIntro}>
        {showChrome && <Navbar />}
        <Routes>
          <Route path="/case-study/:slug" element={<CaseStudyContent />} />
          <Route path="*" element={<PortfolioHome />} />
        </Routes>
        <Footer />
      </div>
      <AnimatePresence>
        {showIntro && <IntroOverlay key="intro" />}
      </AnimatePresence>
    </>
  );
}

function CaseStudyContent() {
  const { slug = "" } = useParams();
  return <CaseStudyPage slug={slug} />;
}

export default App;
