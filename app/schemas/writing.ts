import type { Post } from "~/utils/posts.server";

const BASE_URL = "https://wegrix.dev";

export function writingSchema(post: Post) {
  const postUrl = `${BASE_URL}/writing/${post.slug}`;
  const tags = post.tags.join(", ");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": postUrl,
        "@type": "WebPage",
        name: post.title,
        url: postUrl,
      },
      {
        "@id": `${postUrl}#article`,
        "@type": "BlogPosting",
        author: {
          "@id": `${BASE_URL}/#person`,
        },
        dateModified: post.date,
        datePublished: post.date,
        description: post.description,
        headline: post.title,
        image: {
          "@type": "ImageObject",
          url: `${BASE_URL}/og-image.jpg`,
        },
        inLanguage: "en",
        keywords: tags,
        mainEntityOfPage: {
          "@id": postUrl,
        },
        publisher: {
          "@id": `${BASE_URL}/#person`,
        },
        url: postUrl,
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            item: `${BASE_URL}/writing`,
            name: "Writing",
            position: 1,
          },
          {
            "@type": "ListItem",
            item: postUrl,
            name: post.title,
            position: 2,
          },
        ],
      },
    ],
  };
}
