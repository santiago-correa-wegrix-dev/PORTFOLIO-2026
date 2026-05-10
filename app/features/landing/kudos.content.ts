import { t, type Dictionary } from "intlayer";

const kudosContent = {
  key: "kudos",
  content: {
    label: t({ en: "Testimonials" }),
    title: t({ en: "Trusted by" }),
    titleAccent1: t({ en: "Leaders" }),
    titleAccent2: t({ en: "Engineers" }),
  },
} satisfies Dictionary;

export default kudosContent;
