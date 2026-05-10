// oxlint-disable-next-line id-length
import { type Dictionary, t } from "intlayer";

const kudosContent = {
  content: {
    label: t({ en: "Testimonials" }),
    title: t({ en: "Trusted by" }),
    titleAccent1: t({ en: "Leaders" }),
    titleAccent2: t({ en: "Engineers" }),
  },
  key: "kudos",
} satisfies Dictionary;

export default kudosContent;
