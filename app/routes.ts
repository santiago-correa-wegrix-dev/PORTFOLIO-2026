import { index, route,type RouteConfig } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("projects/:slug", "routes/projects.$slug.tsx"),
    route("api/chat", "routes/api.chat.ts"),
    route("api/contact", "routes/api.contact.ts")
] satisfies RouteConfig;
