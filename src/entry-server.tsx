import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { PersonaProvider } from "./context/PersonaContext";
import { ThemeProvider } from "./context/ThemeContext";
import {
  getCaseStudySeo,
  getHomeSeo,
  renderHeadTags,
  SITE_URL,
} from "./utils/seo";

export function render(url: string): { html: string; head: string } {
  const pathname = new URL(url, SITE_URL).pathname;
  const caseStudyMatch = pathname.match(/^\/case-study\/([^/]+)\/?$/);
  const seo = caseStudyMatch
    ? getCaseStudySeo(decodeURIComponent(caseStudyMatch[1]))
    : getHomeSeo();

  const html = renderToString(
    <StaticRouter location={url}>
      <ThemeProvider>
        <PersonaProvider>
          <App />
        </PersonaProvider>
      </ThemeProvider>
    </StaticRouter>,
  );

  return { html, head: renderHeadTags(seo) };
}
