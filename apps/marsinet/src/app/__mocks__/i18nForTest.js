// __mocks__/i18nForTests.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      key: 'value', // Agrega las claves de traducción que necesites en tus pruebas
      // Ejemplo:
      legalNoticeTitle: 'Legal Notice',
      // Asegúrate de incluir todos los textos necesarios para tus pruebas.
    },
  },
  // Agrega otros idiomas si es necesario
};

i18n
  .use(initReactI18next) // Pasa la instancia i18n a react-i18next.
  .init({
    resources,
    lng: 'en', // Lenguaje que quieres usar en tus pruebas, asegúrate de tener los recursos correspondientes.
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // No necesitamos escapar valores en las pruebas.
    },
  });

export default i18n;
