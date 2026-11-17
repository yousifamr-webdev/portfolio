interface NavigationLink {
  label: string;
  href: string;
}

const recruiterLinks: NavigationLink[] = [
  { label: "Overview", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const showcaseLinks: NavigationLink[] = [
  { label: "About", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const getNavigationLinks = (isRecruiter: boolean) =>
  isRecruiter ? recruiterLinks : showcaseLinks;
