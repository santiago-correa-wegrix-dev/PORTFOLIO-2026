export interface SocialLink {
  href: string;
  icon: "github" | "linkedin" | "mail" | "resume";
  label: string;
  tooltip: string;
}

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/scorrea-ui",
    icon: "github",
    label: "GitHub Profile",
    tooltip: "Check out my work",
  },
  {
    href: "https://www.linkedin.com/in/wegrix/",
    icon: "linkedin",
    label: "LinkedIn Profile",
    tooltip: "Let's connect",
  },
  {
    href: "mailto:scorrea.dev@gmail.com",
    icon: "mail",
    label: "Email Contact",
    tooltip: "Hiring someone awesome?",
  },
  {
    href: "/Santiago_Correa_CV.pdf",
    icon: "resume",
    label: "Download Resume",
    tooltip: "Grab my CV",
  },
];
