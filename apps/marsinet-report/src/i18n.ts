import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './assets/i18n/en';
import { es } from './assets/i18n/es';
import { locale, addLocale } from 'primereact/api';
const DEFAULT_LANGUAGE = 'es';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    lng: DEFAULT_LANGUAGE, // if you're using a language detector, do not define the lng option
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

addLocale('en', en.primeng);
addLocale('es', es.primeng);
locale(DEFAULT_LANGUAGE);
