import { realProjects } from "~/data/projects";

export const loader = () => {
    const baseUrl = "https://santicorrea.com";

    // Static Routes
    const staticRoutes = [
        { url: "/", changefreq: "weekly", priority: 1.0 },
    ];

    // Dynamic Routes (Projects)
    const projectRoutes = realProjects.map((project) => ({
        url: `/projects/${project.id}`,
        changefreq: "monthly",
        priority: 0.8,
    }));

    const allRoutes = [...staticRoutes, ...projectRoutes];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
            .map((route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
    `)
            .join("")}
</urlset>
`;

    return new Response(sitemap, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=86400", // 24 hours
        },
    });
};
