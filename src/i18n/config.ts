import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import faTranslations from "@/i18n/locales/fa/translations.json";
import enTranslations from "@/i18n/locales/en/translations.json";

export const defaultNS = "translations";
export const resources = {
    fa: {translations: {...faTranslations}},
    en: {translations: {...enTranslations}},
} as const;

i18n.use(initReactI18next).init({
    fallbackLng: "fa",
    lng: "fa",
    resources,
    defaultNS,
    ns: ["translations"],
});

i18n.languages = ["fa", "en"];

export default i18n;