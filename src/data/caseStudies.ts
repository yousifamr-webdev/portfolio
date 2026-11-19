export interface CaseStudyDecision {
  decision: string;
  why: string;
  tradeoff?: string;
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudySection {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  bullets?: string[];
  decisions?: CaseStudyDecision[];
  stats?: CaseStudyStat[];
  image?: { src: string; alt: string; caption?: string };
}

export interface CaseStudy {
  slug: string;
  projectId: string;
  title: string;
  tagline: string;
  meta: { role: string; timeline: string; type: string; tools: string[] };
  sections: CaseStudySection[];
}

const caseStudies: CaseStudy[] = [
  {
    slug: "portfolio",
    projectId: "portfolio",
    title: "A Portfolio That Speaks to Two Audiences",
    tagline:
      "One portfolio, two very different readers. How I designed a site that serves clients and recruiters without making either of them search for what matters.",
    meta: {
      role: "Design, development, and copywriting",
      timeline: "3 days",
      type: "Personal project · Frontend",
      tools: [
        "React 19",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    sections: [
      {
        id: "brief",
        eyebrow: "Overview",
        title: "The brief I gave myself",
        body: [
          "A portfolio has to do two jobs for two different readers. A recruiter scans for stack, ownership, and availability in under a minute. A potential client wants to know, in plain language, whether a stranger can make their business work better.",
          "I'm a full-stack developer who came to software from civil engineering, so I also wanted the site itself to be evidence of how I think: structured, deliberate, and precise.",
        ],
      },
      {
        id: "problem",
        eyebrow: "Problem",
        title: "Why one-size-fits-all portfolios fail",
        body: [
          "Most portfolios open with the same hero for everyone. Technical terms loses clients, and generic claims loses recruiters. I set six goals:",
        ],
        bullets: [
          "Let each visitor self-identify in one click, then tailor the first screen to them.",
          "Address clients with clear marketing language, no random technical terms.",
          "Show recruiters what i do and how i do it, clear and simple without generic claims like 23ms respnse time.",
          "Keep projects, experience, and skills shared, so there is one source of truth and only the framing changes.",
          "Feel fast and polished on a mid-range phone, not just a developer laptop.",
          "Stay maintainable: adding a project should mean editing data, not components.",
        ],
      },
      {
        id: "audience",
        eyebrow: "Audience",
        title: "Letting visitors choose their own path",
        body: [
          "The first screen asks one question, \"Who is visiting?\", and the answer shapes everything that follows.",
        ],
        decisions: [
          {
            decision:
              "Ask up front with three options: Potential client, Recruiter, Just curious.",
            why: "Self-selection is more reliable than guessing from a referrer, and it costs one tap. The three answers collapse into two views (showcase and technical), so the content set stays small.",
            tradeoff:
              "It adds a step before content. I reduced the cost with a Skip control that defaults to the technical view, an intro that plays theatrically only once per session, and a Mode switcher in the navbar.",
          },
          {
            decision:
              "Store the persona in sessionStorage instead of localStorage.",
            why: "A shared device or a returning visitor in a different role should be asked again. Session scope keeps the choice honest.",
            tradeoff:
              "Returning visitors see the prompt each new session, so the reopen animation is shortened to keep it painless.",
          },
          {
            decision: "Route \"Just curious\" to the showcase view.",
            why: "Casual visitors respond better to outcome-led framing than to a spec sheet.",
          },
        ],
      },
      {
        id: "content",
        eyebrow: "Content",
        title: "Two voices, one source of truth",
        body: [
          "The client hero leads with a benefit (\"Your Website Should Work As Hard As You Do\") and three plain-language trust points. The recruiter hero leads with the role title, core stack, resume download, location, timezone, and availability.",
        ],
        decisions: [
          {
            decision: "Keep one typed data object (portfolioData) behind both views.",
            why: "Projects, experience, and skills never drift apart. The persona only changes the hero and the navigation labels (About vs Overview).",
            tradeoff:
              "Client visitors still see technical stack chips on project cards. I accepted that because the chips double as proof.",
          },
          {
            decision:
              "Write project descriptions around specifics, such as endpoint counts and schema counts, instead of adjectives.",
            why: "Recruiters can verify numbers, and clients read the same numbers as scale.",
          },
          {
            decision:
              "Give section headings a voice: \"Projects with a point of view\", \"The work behind the work\", \"A stack that stays useful\", \"Let's build something durable\".",
            why: "Distinct headings make the site memorable and signal that the copy was written with intent.",
          },
          {
            decision:
              "Show experience as short role summaries.",
            why: "Scannability. The summary answers \"what did you do\". Nobody really reads the detailed descriptions",
          },
        ],
      },
      {
        id: "identity",
        eyebrow: "Visual identity",
        title: "A visual language borrowed from engineering drawings",
        body: [
          "My degree is in civil engineering, so the interface borrows from technical drawings: a faint drafting grid behind the page that fades toward the edges on desktop, and soft lift/sink separators between sections like section cuts. The YA monogram, built from my initials, works as the logo, the intro centerpiece, a ghost watermark, and the favicon.",
        ],
        decisions: [
          {
            decision:
              "Default to a dark theme with a lavender accent (#D9B8FF on #0D0D0D), with a light theme in indigo (#263BAA) on slate.",
            why: "Dark suits a developer audience and lets the accent glow, while the light theme respects visitor preference. Each theme has its own accent so contrast holds in both.",
            tradeoff:
              "Two palettes to verify. Centralizing them in tokens keeps that manageable.",
          },
        
          {
            decision:
              "Animate the monogram from the intro screen into the navbar as a shared element (Framer Motion).",
            why: "It creates a brand moment that also catches the eye of the visitor and makes his experience memorable.",
          },
          {
            decision: "Build the components by hand instead of using a UI kit.",
            why: "It gives the site a distinct identity and keeps the bundle small.",
          },
        ],
      },
      {
        id: "interaction",
        eyebrow: "Interaction",
        title: "Motion and navigation with a purpose",
        body: [],
        decisions: [
     
          {
            decision:
              "Link the hero's featured-project badge to the project card with a scroll-and-highlight effect.",
            why: "It guides the eye from a claim to the evidence behind it.",
            tradeoff:
              "It uses a window custom event, which is loose coupling, but acceptable at this scale.",
          },
          {
            decision:
              "Add a keyboard-accessible gallery lightbox with scroll lock and an image-count badge on each card.",
            why: "Cards stay compact while still signalling that there is more to see.",
          },
          {
            decision:
              "Reveal content once (viewport once: true) and use a sliding pill for the project filter.",
            why: "Reveals that replay on every scroll become noise, and the sliding pill gives cheap spatial feedback.",
          },
        ],
      },
      {
        id: "performance",
        eyebrow: "Performance and accessibility",
        title: "Built to feel fast on a phone",
        body: ["Traffic mostly comes from mobile phones nowadays, so i made sure the website feels smooth on your phone."],
        decisions: [
          {
            decision:
              "Gate expensive effects by breakpoint: heavy backdrop blur only from the sm breakpoint up, the radial mask on the grid disabled on mobile, and the grid layer promoted with paint containment.",
            why: "Blur and masks are the most common cause of scroll jank on mid-range phones.",
          },
          {
            decision:
              "Keep scroll handlers passive and throttled with requestAnimationFrame, updating state only when the value actually changes.",
            why: "It avoids pointless re-renders during scrolling.",
          },
          {
            decision:
              "Use modern image formats, lazy loading, async decoding, and a small portrait variant with high fetch priority in the above-the-fold hero.",
            why: "It protects first paint and Largest Contentful Paint.",
          },
          {
            decision:
              "Use semantic landmarks, aria-labels, aria-hidden on decorative layers, and honor prefers-reduced-motion in the technical hero.",
            why: "Accessibility should be built in, not bolted on.",
          },
        ],
        stats: [
        
        ],
      },
      {
        id: "contact",
        eyebrow: "Contact",
        title: "A contact flow that matches how people reach out",
        body: [
          "Recruiters and clients contact people differently, so the section offers several channels instead of one form.",
        ],
        decisions: [
          {
            decision:
              "Add intent tags to the form: Full-Time Role, Contract / MVP, Backend Architecture, General Inquiry.",
            why: "Each message arrives pre-sorted, so I can reply with the right context immediately.",
          },
          {
            decision:
              "Send the form through Web3Forms and fall back to a prefilled mailto link if the request fails.",
            why: "There is no backend to maintain, and a message is never lost.",
            tradeoff:
              "It depends on a third-party endpoint, which the fallback mitigates.",
          },
          {
            decision:
              "Offer a WhatsApp deep link with a prefilled message, one-click email copy, and clear location, timezone, and response-time details.",
            why: "WhatsApp is a common channel for clients in my region, and clear logistics remove the back-and-forth.",
          },
        ],
      },
      {
        id: "engineering",
        eyebrow: "Engineering",
        title: "Technical decisions",
        body: [],
        decisions: [
          {
            decision: "Build a React 19 + TypeScript + Vite single-page app.",
            why: "The content is static and the persona is purely a client-side concern, so a server adds nothing. Vite gives instant feedback while building and a static deploy.",
            tradeoff:
              "There is no server-side rendering, so link previews and SEO are weaker. Prerendering and meta tags are on my next-steps list.",
          },
          {
            decision:
              "Drive every section, and these case studies, from typed data files.",
            why: "Adding a project or a case study means adding an object, not editing components.",
          },
          {
            decision:
              "Use two small React context providers (theme and persona) instead of a state library.",
            why: "That is all the global state the site has.",
          },
          {
            decision:
              "Use Tailwind with design tokens, and Framer Motion for the animations CSS can't do cleanly: shared-element transitions and exit animations.",
            why: "It keeps styling consistent and the motion code readable.",
          },
        
        ],
      },
      // {
      //   id: "outcomes",
      //   eyebrow: "Outcomes",
      //   title: "Results",
      //   body: [
      //     "[ADD: what happened after launch, such as feedback, interviews, or inquiries]",
      //   ],
      //   stats: [
      //     { value: "[ADD]", label: "Visits since launch" },
      //     { value: "[ADD]", label: "Persona split (client / recruiter / curious)" },
      //     { value: "[ADD]", label: "Contact submissions" },
      //   ],
      // },
      // {
      //   id: "next",
      //   eyebrow: "Next",
      //   title: "What I'd improve next",
      //   body: [],
      //   bullets: [
      //     "Prerender pages and add Open Graph meta tags so shared links show a proper preview.",
      //     "Track persona selection to find out whether the split matches reality.",
      //     "Honor reduced-motion preferences across every animation.",
      //     "Restore the hidden achievement bullets as expandable details on the experience timeline.",
      //     "Write case studies for the other projects.",
      //     "Add automated accessibility checks to the build.",
      //   ],
      // },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
