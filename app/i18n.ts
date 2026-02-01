import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: ["en", "es", "fr", "de"],
        load: "languageOnly", // Fixes en-US -> en 404s
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}/translation.json",
        },
        react: {
            useSuspense: false, // Avoid suspense for now to prevent hydration mismatches if not handled
        }
    });

export default i18n;
