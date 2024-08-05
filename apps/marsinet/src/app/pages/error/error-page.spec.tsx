import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page'; // Asegúrate de que la ruta de importación es correcta

describe('ErrorPage', () => {
  // Mock useNavigate y useTranslation si es necesario
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // importa y retiene las implementaciones originales
    useNavigate: () => jest.fn(), // sobrescribe useNavigate con una versión mock
  }));

  jest.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key) => key, // Implementa una función t que simplemente devuelve la clave
    }),
  }));

  it('should initially display a loading indicator', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    expect(getByRole('progressbar')).toBeInTheDocument();
  });
});
