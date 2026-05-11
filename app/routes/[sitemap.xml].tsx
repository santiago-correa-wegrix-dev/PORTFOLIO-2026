import { realProjects } from "~/data/projects";
import { getAllPosts } from "~/utils/posts.server";

export const loader = () => {
  const baseUrl = "https://wegrix.dev";

  // Static Routes
  const staticRoutes = [
    { changefreq: "weekly", priority: 1, url: "/" },
    { changefreq: "weekly", priority: 0.9, url: "/writing" },
  ];

  // Dynamic Routes (Projects)
  const projectRoutes = realProjects.map((project) => ({
    changefreq: "monthly",
    priority: 0.8,
    url: `/projects/${project.id}`,
  }));

  // Dynamic Routes (Writing Posts)
  const posts = getAllPosts();
  const postRoutes = posts.map((post) => ({
    changefreq: "monthly",
    priority: 0.7,
    url: `/writing/${post.slug}`,
  }));

  const allRoutes = [...staticRoutes, ...projectRoutes, ...postRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
    `,
    )
    .join("")}
</urlset>
`;

  return new Response(sitemap, {
    headers: {
      "Cache-Control": "public, max-age=86400", // 24 hours
      "Content-Type": "application/xml",
    },
    status: 200,
  });
};
