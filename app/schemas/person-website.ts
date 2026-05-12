const BASE_URL = "https://wegrix.dev";

export function rootSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${BASE_URL}/#person`,
        "@type": "Person",
        address: {
          "@type": "PostalAddress",
          addressCountry: "DE",
          addressLocality: "Berlin",
        },
        email: "mailto:scorrea.dev@gmail.com",
        image: `${BASE_URL}/og-image.jpg`,
        jobTitle: "Senior Frontend Engineer",
        knowsAbout: [
          "React",
          "TypeScript",
          "Remix",
          "Node.js",
          "Anthropic API",
          "Claude",
          "Python",
          "Three.js",
        ],
        name: "Santiago Correa",
        sameAs: [
          "https://github.com/scorrea-ui",
          "https://www.linkedin.com/in/wegrix/",
          "https://deliver-ai.xyz/",
        ],
        url: BASE_URL,
        worksFor: {
          "@type": "Organization",
          name: "Statista",
        },
      },
      {
        "@id": `${BASE_URL}/#website`,
        "@type": "WebSite",
        name: "Wegrix",
        publisher: {
          "@id": `${BASE_URL}/#person`,
        },
        url: BASE_URL,
      },
    ],
  };
}
