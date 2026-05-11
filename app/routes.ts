import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("projects/:slug", "routes/projects.$slug.tsx"),
  route("api/contact", "routes/api.contact.ts"),
  route("writing", "routes/writing.tsx", [
    index("routes/writing._index.tsx"),
    route(":slug", "routes/writing.$slug.tsx"),
  ]),
] satisfies RouteConfig;
