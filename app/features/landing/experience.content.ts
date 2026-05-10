import { t, type Dictionary } from "intlayer";

const experienceContent = {
  key: "experience",
  content: {
    title: t({ en: "Career" }),
    titleAccent: t({ en: "History" }),
    description: t({
      en: "A proven track record of technical leadership and shipping mission-critical products.",
    }),
  },
} satisfies Dictionary;

export default experienceContent;
