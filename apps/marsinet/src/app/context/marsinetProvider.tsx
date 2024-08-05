import { locale } from 'primereact/api';
import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const MarsinetContext = createContext<{
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  access_token: string;
  setAccessToken: (access_token: string) => void;
  languageContext: string;
  setLanguageContext: (language: string) => void;
  role: string;
  setRole: (role: string) => void;
  admin: boolean;
  setAdmin: (type: boolean) => void;
  refresh_token: string;
  setRefreshToken: (refresh_token: string) => void;
}>(null);

export function MarsinetProvider(props) {
  const { children } = props;
  const { i18n } = useTranslation();

  const [languageContext, setLanguageContext] = useState<string>(null);

  const [isLogged, setIsLogged] = useState(false);
  const [access_token, setAccessToken] = useState<string>(null);
  const [refresh_token, setRefreshToken] = useState<string>(null);
  const [role, setRole] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('at');
    const refreshToken = localStorage.getItem('rt');
    if (token) {
      setIsLogged(true);
      setAccessToken(token);
      setRefreshToken(refreshToken);
    }

    const language = localStorage.getItem('ln');
    const browserLanguage = navigator.language.split('-')[0];

    if (!language) {
      localStorage.setItem('ln', browserLanguage);
    }

    setLanguageContext(language);
    i18n.changeLanguage(language);
    locale(language);
  }, [i18n.language, isLogged, access_token, i18n]);

  return (
    <MarsinetContext.Provider
      value={{
        isLogged,
        setIsLogged,
        access_token,
        setAccessToken,
        languageContext,
        setLanguageContext,
        role,
        setRole,
        admin,
        setAdmin,
        refresh_token,
        setRefreshToken,
      }}
    >
      {children}
    </MarsinetContext.Provider>
  );
}
