import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  content: {
    contentDir: ["./app"],
  },
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH],
  },
};

export default config;
