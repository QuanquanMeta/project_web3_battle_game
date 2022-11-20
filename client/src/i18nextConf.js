import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./assets/locales/en/translation.json";
import translationZH from "./assets/locales/zh/translation.json";

const fallbackLng = ["zh"];
const availableLanguages = ["zh", "en"];

const resources = {
  zh: {
    translation: translationZH
  },
  en: {
    translation: translationEN
  }
 
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    //fallbackLng:'zh',

    detection: {
      checkWhitelist: true
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
