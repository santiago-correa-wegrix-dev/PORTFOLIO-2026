import { t, type Dictionary } from "intlayer";

const projectsContent = {
  key: "projects",
  content: {
    title: t({ en: "Selected" }),
    titleAccent: t({ en: "Work" }),
    years: t({ en: "(2017 — 2025)" }),
  },
} satisfies Dictionary;

export default projectsContent;
