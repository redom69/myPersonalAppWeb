import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { locale } from 'primereact/api';
import { MarsinetContext } from '../../context/marsinetProvider';
import { Dialog } from 'primereact/dialog';

export interface ILanguage {
  code: string;
  name: string;
  flag: string;
}

interface LanguageChangeEvent {
  value: string;
}

export const LANGUAGES: ILanguage[] = [
  {
    code: 'es',
    name: 'Español',
    flag: '/assets/spanish.svg',
  },
  {
    code: 'en',
    name: 'English',
    flag: '/assets/english.svg',
  },
];
/* eslint-disable-next-line */
export interface SelectorLanguageComponentProps {}

export function SelectorLanguageComponent(
  props: SelectorLanguageComponentProps
) {
  // Contexto de idioma
  const { languageContext, setLanguageContext } = useContext(MarsinetContext);

  // Traducciones
  const { t, i18n } = useTranslation();

  // Idioma Seleccionado
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    LANGUAGES.find((language) => language.code === languageContext)?.code
  );
  const [visible, setVisible] = useState(false);

  // Cambio de idioma
  const handleChangeLanguage = (e: LanguageChangeEvent) => {
    if (!e || !e.value) return;
    setSelectedLanguage(e.value);
    i18n.changeLanguage(e.value);
    setLanguageContext(e.value);
    localStorage.setItem('ln', e.value);
    locale(e.value);
  };

  useEffect(() => {
    setSelectedLanguage(
      LANGUAGES.find((language) => language.code === languageContext)?.code
    );
  }, [languageContext]);

  return (
    <>
      <img
        src={
          LANGUAGES.find((language) => language.code === selectedLanguage)?.flag
        }
        className="mr-2 rounded-full"
        style={{ width: '23px', height: '18px' }}
        alt="Bandera de idioma"
      />
      <span className="block font-medium" onClick={() => setVisible(true)}>
        {t('pages.menu.language')}
      </span>
      <Dialog
        header={t('pages.menu.language')}
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: '50vw' }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <div className="flex flex-wrap -mx-2">
          {LANGUAGES.map((language) => (
            <div
              key={language.code}
              className={`flex items-center justify-center my-2 mx-2 cursor-pointer p-3 relative ${
                language.code === selectedLanguage
                  ? 'bg-blue-500 bg-opacity-75 text-white rounded'
                  : ''
              }`}
              onClick={() => handleChangeLanguage({ value: language.code })}
              style={{ flex: '0 0 calc(33.333% - 0.5rem)' }}
            >
              <img
                src={language.flag}
                className="mr-3 rounded-full pt-2"
                style={{ width: '23px', height: '23px' }}
                alt={`Bandera de ${language.name}`}
              />
              <span className="text-lg ">{language.name}</span>
              {language.code === selectedLanguage && (
                <div className="ml-auto">
                  <span className="text-blue-900 text-xl font-bold pi pi-check pr-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
}

export default SelectorLanguageComponent;
