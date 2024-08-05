import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SelectorLanguageComponent } from './selector-language-component';
import { MarsinetContext } from '../../context/marsinetProvider';

describe('SelectorLanguageComponent', () => {
  const mockSetLanguageContext = jest.fn();
  const mockSetIsLogged = jest.fn();
  const mockSetAccessToken = jest.fn();
  const mockSetRefreshToken = jest.fn();

  const wrapper = ({ children }) => (
    <MarsinetContext.Provider
      value={{
        isLogged: false,
        setIsLogged: mockSetIsLogged,
        access_token: '',
        setAccessToken: mockSetAccessToken,
        languageContext: 'es',
        setLanguageContext: mockSetLanguageContext,
        refresh_token: '',
        setRefreshToken: mockSetRefreshToken,
        // Asegúrate de incluir todos los estados y setters que tu componente espera
        role: '',
        setRole: jest.fn(),
        type: '',
        setType: jest.fn(),
      }}
    >
      {children}
    </MarsinetContext.Provider>
  );

  it('should render correctly and display the default language flag', () => {
    const { getByAltText } = render(<SelectorLanguageComponent />, { wrapper });
    expect(getByAltText('Bandera de idioma')).toBeInTheDocument();
  });
});
