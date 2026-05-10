import { t, type Dictionary } from "intlayer";

const skillsContent = {
  key: "skills",
  content: {
    title: t({ en: "Tech" }),
    titleAccent: t({ en: "Stack" }),
    description: t({
      en: "A production-grade technical stack specialized for high-performance, scalable applications.",
    }),
  },
} satisfies Dictionary;

export default skillsContent;
