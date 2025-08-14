import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LOCALES = ["pt", "en"] as const;

function getInitialLng(): (typeof SUPPORTED_LOCALES)[number] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("locale");
    if (stored === "pt" || stored === "en") return stored;
  }
  return "pt";
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    lng: getInitialLng(),
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LOCALES,
    interpolation: { escapeValue: false },
    returnNull: false,
  });

export default i18n;
