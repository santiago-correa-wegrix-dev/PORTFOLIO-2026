export interface Testimonial {
    id: string;
    name: string;
    role: string;
    quote: string;
    highlight: string;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: "christopher",
        name: "Christopher Skoglund",
        role: "Software Development Team Lead",
        quote: "Santiago excels across all areas of development. No matter the size, scope, or complexity of the project he consistently produces code that is easy for his teammates to read, maintain, and build upon. He is a delight to work with. He is a delight to work with.",
        highlight: "Consistently produces code that is easy for his teammates to read."
    },
    {
        id: "fiana",
        name: "Fiana Avergon",
        role: "Project Manager at Innovative Solutions",
        quote: "I am always impressed with his professionalism, self-driven attitude, and the teamwork spirit he brings to every project. His attention to detail and direct diligence make him stand out in our organization.",
        highlight: "His attention to detail and direct diligence make him stand out."
    },
    {
        id: "jean",
        name: "Jean Roa",
        role: "Software Wizard",
        quote: "Santiago is one of the best professionals I've ever worked with. He's a great person, always open to help with soft skills and a lot of tech skills that make him a world class professional.",
        highlight: "One of the best professionals I've ever worked with."
    },
    {
        id: "michael",
        name: "Michael Hanson",
        role: "B2B Growth & News Stories",
        quote: "Santiago helped me create 2 great websites in the space of 4 weeks. He is super responsive and attentive. Highly recommend him as a web developer.",
        highlight: "Super responsive and attentive."
    }
];
