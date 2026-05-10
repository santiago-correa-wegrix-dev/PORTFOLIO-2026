// oxlint-disable-next-line id-length
import { type Dictionary, t } from "intlayer";

const experienceContent = {
  content: {
    description: t({
      en: "A proven track record of technical leadership and shipping mission-critical products.",
    }),
    title: t({ en: "Career" }),
    titleAccent: t({ en: "History" }),
  },
  key: "experience",
} satisfies Dictionary;

export default experienceContent;
