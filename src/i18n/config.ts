import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import faApp from "@/i18n/locales/fa/app.json";
import faGodfather from "@/i18n/locales/fa/godfather.json";
import enApp from "@/i18n/locales/en/app.json";
import enGodfather from "@/i18n/locales/en/godfather.json";

export const resources = {
    fa: {...faApp, ...faGodfather},
    en: {...enApp, ...enGodfather},
} as const;

i18n.use(initReactI18next).init({
    fallbackLng: "fa",
    lng: "fa",
    resources,
    defaultNS: "app",
    ns: ["app", "godfather"],
});

i18n.languages = ["fa", "en"];

export default i18n;