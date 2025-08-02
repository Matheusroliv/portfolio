import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LOCALES = ["pt", "en"] as const;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    lng: "pt",
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LOCALES,
    interpolation: { escapeValue: false },
    returnNull: false,
  });

export default i18n;
