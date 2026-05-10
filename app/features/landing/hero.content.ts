import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    headline: t({ en: "Santiago Correa" }),
    tagline: t({
      en: "Senior engineer building consumer products at scale. Nine years of closing the gap between what a product can do and what users actually experience.",
    }),
    subline: t({
      en: "Always shipping, always learning, always happy to talk shop.",
    }),
    cta: t({ en: "Explore Work" }),
    scroll: t({ en: "Scroll" }),
  },
} satisfies Dictionary;

export default heroContent;
