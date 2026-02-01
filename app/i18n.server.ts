import { resolve } from "node:path";

import { RemixI18Next } from "remix-i18next/server";
import { createCookie } from "react-router";
import Backend from "i18next-fs-backend";

import i18n from "./i18n"; // Helper from client-side init (reuse config)

export const localeCookie = createCookie("lng", {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
});

const i18next = new RemixI18Next({
    detection: {
        supportedLanguages: i18n.options.supportedLngs as string[],
        fallbackLanguage: i18n.options.fallbackLng as string,
        cookie: localeCookie,
    },
    // This is the configuration for i18next used
    // when running this server-side bundle.
    i18next: {
        ...i18n.options,
        backend: {
            loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
        },
    },
    // The backend you want to use to load the translations
    // Tip: You could pass `resources` to the `i18next` configuration and avoid
    // a backend here
    backend: Backend,
});

export default i18next;
