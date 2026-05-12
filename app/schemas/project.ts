import type { Project } from "~/data/projects";

const BASE_URL = "https://wegrix.dev";

export function projectSchema(project: Project) {
  const projectUrl = `${BASE_URL}/projects/${project.id}`;
  const image = project.imageUrl
    ? `${BASE_URL}${project.imageUrl}`
    : `${BASE_URL}/og-image.jpg`;
  const stack = project.stack?.join(", ") || "";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": projectUrl,
        "@type": "WebPage",
        name: project.title,
        url: projectUrl,
      },
      {
        "@id": `${projectUrl}#project`,
        "@type": "SoftwareSourceCode",
        author: {
          "@id": `${BASE_URL}/#person`,
        },
        creator: {
          "@id": `${BASE_URL}/#person`,
        },
        description: project.description,
        image: {
          "@type": "ImageObject",
          url: image,
        },
        keywords: stack,
        mainEntityOfPage: {
          "@id": projectUrl,
        },
        name: project.title,
        programmingLanguage: stack,
        url: projectUrl,
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            item: BASE_URL,
            name: "Projects",
            position: 1,
          },
          {
            "@type": "ListItem",
            item: projectUrl,
            name: project.title,
            position: 2,
          },
        ],
      },
    ],
  };
}
