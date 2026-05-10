import { realProjects } from "~/data/projects";

export const loader = () => {
  const baseUrl = "https://wegrix.dev";

  // Static Routes
  const staticRoutes = [{ changefreq: "weekly", priority: 1, url: "/" }];

  // Dynamic Routes (Projects)
  const projectRoutes = realProjects.map((project) => ({
    changefreq: "monthly",
    priority: 0.8,
    url: `/projects/${project.id}`,
  }));

  const allRoutes = [...staticRoutes, ...projectRoutes];

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
