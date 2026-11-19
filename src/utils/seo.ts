import { getCaseStudy } from "../data/caseStudies";
import { portfolioData } from "../data/portfolioData";

export const SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://yousifamr.vercel.app";

export interface RouteSeo {
  title: string;
  description: string;
  path: string;
  robots?: string;
  ogType?: string;
  jsonLd?: unknown;
}

const HOME_DESCRIPTION =
  "Yousif Amr is a Full-Stack Software Engineer based in Cairo, Egypt, specializing in NestJS, Node.js, TypeScript, React, Next.js, Laravel, MongoDB, and MySQL.";

function getCanonicalUrl(path: string): string {
  const origin = SITE_URL.replace(/\/+$/, "");
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function getPersonId(): string {
  return `${SITE_URL.replace(/\/+$/, "")}/#person`;
}

export function getHomeSeo(): RouteSeo {
  return {
    title: "Yousif Amr | Full-Stack Software Engineer",
    description: HOME_DESCRIPTION,
    path: "/",
    robots: "index, follow",
    ogType: "website",
  };
}

export function getCaseStudySeo(slug: string): RouteSeo {
  const path = `/case-study/${encodeURIComponent(slug)}`;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Yousif Amr",
      description: "The requested case study could not be found.",
      path,
      robots: "noindex, follow",
      ogType: "article",
    };
  }

  const description = caseStudy.tagline;
  const canonicalUrl = getCanonicalUrl(path);
  const homeUrl = getCanonicalUrl("/");

  return {
    title: `${caseStudy.title} | Yousif Amr`,
    description,
    path,
    robots: "index, follow",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechArticle",
          "@id": `${canonicalUrl}#article`,
          headline: caseStudy.title,
          description,
          url: canonicalUrl,
          mainEntityOfPage: canonicalUrl,
          keywords: caseStudy.meta.tools,
          author: { "@id": getPersonId() },
          publisher: { "@id": getPersonId() },
          about: {
            "@type": "SoftwareSourceCode",
            name:
              portfolioData.projects.find(
                (project) => project.id === caseStudy.projectId,
              )?.title ?? caseStudy.title,
            codeRepository: portfolioData.projects.find(
              (project) => project.id === caseStudy.projectId,
            )?.githubUrl,
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: homeUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Projects",
              item: `${homeUrl}#projects`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: caseStudy.title,
              item: canonicalUrl,
            },
          ],
        },
      ],
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function serializeJsonLd(jsonLd: unknown): string {
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}

export function renderHeadTags(seo: RouteSeo): string {
  const canonicalUrl = getCanonicalUrl(seo.path);
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const ogType = escapeHtml(seo.ogType ?? "website");
  const jsonLdTag = seo.jsonLd
    ? `<script type="application/ld+json" data-route-seo="true">${serializeJsonLd(seo.jsonLd)}</script>`
    : "";

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots ?? "index, follow")}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    jsonLdTag,
  ]
    .filter(Boolean)
    .join("\n");
}

function updateMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

export function updatePageSeo(seo: RouteSeo): void {
  const canonicalUrl = getCanonicalUrl(seo.path);
  document.title = seo.title;

  updateMeta("name", "description", seo.description);
  updateMeta("name", "robots", seo.robots ?? "index, follow");
  updateMeta("property", "og:title", seo.title);
  updateMeta("property", "og:description", seo.description);
  updateMeta("property", "og:url", canonicalUrl);
  updateMeta("property", "og:type", seo.ogType ?? "website");
  updateMeta("name", "twitter:title", seo.title);
  updateMeta("name", "twitter:description", seo.description);

  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = canonicalUrl;

  document.head
    .querySelector('script[data-route-seo="true"]')
    ?.remove();
  if (seo.jsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.routeSeo = "true";
    script.textContent = serializeJsonLd(seo.jsonLd);
    document.head.append(script);
  }
}
