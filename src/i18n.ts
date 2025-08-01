import en from "@/locales/en.json";
import es from "@/locales/es.json";
import pt from "@/locales/pt.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
    },
    lng: localStorage.getItem("locale") ?? "pt",
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
  });

export default i18n;
