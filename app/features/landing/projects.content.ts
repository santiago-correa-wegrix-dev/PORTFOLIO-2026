// oxlint-disable-next-line id-length
import { type Dictionary, t } from "intlayer";

const projectsContent = {
  content: {
    title: t({ en: "Selected" }),
    titleAccent: t({ en: "Work" }),
    years: t({ en: "(2017 — 2025)" }),
  },
  key: "projects",
} satisfies Dictionary;

export default projectsContent;
