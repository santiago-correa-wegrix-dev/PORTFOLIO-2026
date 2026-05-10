// oxlint-disable-next-line id-length
import { type Dictionary, t } from "intlayer";

const heroContent = {
  content: {
    cta: t({ en: "Explore Work" }),
    scroll: t({ en: "Scroll" }),
    subline: t({
      en: "Let's build something great together.",
    }),
    tagline: t({
      en: "Senior engineer building consumer products at scale. Nine years of closing the gap between what a product can do and what users actually experience.",
    }),
  },
  key: "hero",
} satisfies Dictionary;

export default heroContent;
