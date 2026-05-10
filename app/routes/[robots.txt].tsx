export const loader = () => {
  const robotText = `User-agent: *
Allow: /
Sitemap: https://wegrix.dev/sitemap.xml

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /
`;

  return new Response(robotText, {
    headers: {
      "Cache-Control": "public, max-age=86400", // 24 hours
      "Content-Type": "text/plain",
    },
    status: 200,
  });
};
