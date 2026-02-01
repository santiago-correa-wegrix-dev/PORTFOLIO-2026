export const loader = () => {
    const robotText = `User-agent: *
Allow: /
Sitemap: https://santicorrea.com/sitemap.xml

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /
`;

    return new Response(robotText, {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400", // 24 hours
        },
    });
};
