export interface Testimonial {
  highlight: string;
  id: string;
  name: string;
  quote: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    highlight: "Consistently produces code that is easy for his teammates to read.",
    id: "christopher",
    name: "Christopher Skoglund",
    quote:
      "Santiago excels across all areas of development. No matter the size, scope, or complexity of the project he consistently produces code that is easy for his teammates to read, maintain, and build upon. He is a delight to work with. He is a delight to work with.",
    role: "Software Development Team Lead",
  },
  {
    highlight: "His attention to detail and direct diligence make him stand out.",
    id: "fiana",
    name: "Fiana Avergon",
    quote:
      "I am always impressed with his professionalism, self-driven attitude, and the teamwork spirit he brings to every project. His attention to detail and direct diligence make him stand out in our organization.",
    role: "Project Manager at Innovative Solutions",
  },
  {
    highlight: "One of the best professionals I've ever worked with.",
    id: "jean",
    name: "Jean Roa",
    quote:
      "Santiago is one of the best professionals I've ever worked with. He's a great person, always open to help with soft skills and a lot of tech skills that make him a world class professional.",
    role: "Software Wizard",
  },
  {
    highlight: "Super responsive and attentive.",
    id: "michael",
    name: "Michael Hanson",
    quote:
      "Santiago helped me create 2 great websites in the space of 4 weeks. He is super responsive and attentive. Highly recommend him as a web developer.",
    role: "B2B Growth & News Stories",
  },
];
