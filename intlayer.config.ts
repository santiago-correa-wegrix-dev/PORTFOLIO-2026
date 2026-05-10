import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  content: {
    contentDir: ["./app"],
  },
  editor: {
    enabled: false,
  },
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH],
  },
};

export default config;
