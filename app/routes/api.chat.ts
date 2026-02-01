import Fuse from "fuse.js";
import { data, type LoaderFunctionArgs } from "react-router";

import { experiences } from "~/data/experience";
import { KNOWLEDGE_BASE } from "~/data/knowledge-base";
import { PATTERNS } from "~/features/chat/utils/constants";

// Initialize Fuse once (server-side cache)
const options = {
    includeScore: true,
    keys: ["title", "keywords", "content"],
    threshold: 0.4,
    ignoreLocation: true,
};
const fuse = new Fuse(KNOWLEDGE_BASE, options);

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) return data({ text: "I'm listening..." });

    const queryText = query.toLowerCase().trim();

    // 1. Direct Pattern Matching (Fast Path)
    if (!queryText) return data({ text: "I'm listening..." });

    if (PATTERNS.JIBBERISH.test(queryText)) {
        return data({ text: "Very articulate! 🧐 But I work better with actual questions like 'Projects' or 'Experience'." });
    }

    if (PATTERNS.SECURITY.test(queryText)) {
        return data({ text: "Nice try! 🛡️ But I'm a server-side bot. No XSS or SQL injection here. Let's stick to the portfolio." });
    }

    if (PATTERNS.HELP.test(queryText)) {
        return data({ text: "I can help you explore Santiago's profile. Try asking about:\n- **Projects**\n- **Experience**\n- **Tech Stack**\n- **Contact Info**\n- **Resume**" });
    }

    if (PATTERNS.CREATOR.test(queryText)) {
        return data({ text: "I was built by **Santi** himself!" });
    }

    if (PATTERNS.SMALL_TALK.test(queryText)) {
        return data({ text: "Glad you think so! Anything else you'd like to know?" });
    }

    if (queryText.includes("github") || queryText.includes("git")) {
        return data({
            text: "YUUP! Here's where the magic happens (the code). Check out my GitHub:",
            action: "https://github.com/santiago-correa-wegrix-dev"
        });
    }

    if (queryText.includes("linkedin")) {
        return data({
            text: "Let's connect! Here is my LinkedIn profile.",
            action: "https://www.linkedin.com/in/wegrix/"
        });
    }

    if (queryText.match(/(resume|cv|pdf|download)/)) {
        return data({
            text: "Smart move. Here is my full technical Resume (PDF).",
            action: "/SANTIAGO%20CORREA%20-%20RESUME.pdf"
        });
    }

    // High Priority: Hiring
    if (PATTERNS.HIRE.test(queryText) || (queryText.includes("why") && queryText.includes("santiago"))) {
        return data({
            text: "YES. Without a doubt. 🚀\n\nSantiago combines **Technical Excellence** with **Creative Vision**. He doesn't just write code; he builds experiences that convert. Hiring him is the easiest decision you'll make all quarter.",
            action: "/#contact"
        });
    }

    if (PATTERNS.GREETING.test(queryText)) {
        return data({ text: "Hello! I'm Santi-Bot. Ask me about my Code, Projects, or Career." });
    }

    if (PATTERNS.WHO_AM_I.test(queryText)) {
        return data({ text: "I am a smart agent designed to showcase Santiago's engineering value. I run on the server." });
    }

    if (PATTERNS.FUN.test(queryText)) {
        return data({ text: "I'm strictly professional. Let's talk about scalable architecture instead." });
    }

    if (PATTERNS.WORK_LOC.test(queryText)) {
        return data({
            text: "Santiago has engineered solutions for: " + experiences.map(e => e.company).join(", ") + ". Check the Experience section for details.",
            action: "/#experience"
        });
    }

    if (queryText.length < 3) {
        return data({ text: "Be a bit more specific? e.g., 'React projects' or 'Work history'." });
    }

    // 2. Fuzzy Search (Knowledge Base)
    // Clean query for better matching
    const cleanQuery = queryText
        .replace(/[?!.,;:]/g, "")
        .replace(/\b(santiago|santi|he|him|his|she|her|el|ella|lo|le|er|sie|ihm|il|lui|son)\b/g, '')
        .trim();

    const searchQuery = cleanQuery.length > 2 ? cleanQuery : queryText;
    const results = fuse.search(searchQuery);

    if (results.length > 0) {
        const topMatch = results[0];

        // If score is high (bad match), fallback. Lower is better.
        if (topMatch.score && topMatch.score <= 0.45) {
            const item = topMatch.item;

            if (item.type === "project") {
                return data({
                    text: `**${item.title}**: ${item.content}`,
                    action: `/projects/${item.id}`
                });
            }

            if (item.type === "experience") {
                return data({
                    text: `At **${item.title}**, Santiago served as a ${item.keywords.find(k => k.toLowerCase().includes("engineer")) || "Key Engineer"}. ${item.content.split('. ')[0]}.`,
                    action: undefined
                });
            }

            return data({ text: item.content, action: item.url || undefined });
        }
    }

    // 3. Fallback
    return data({
        text: "I didn't catch that. Try asking about 'Statista', 'skills', or just 'hire him'."
    });
}
