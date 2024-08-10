import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../__mocks__/i18nForTest.js';
import CookiePolicy from './cookie-policy';
import { Context } from '../../context/provider.js';
import { mockContextValue } from '../../__mocks__/mockContextValue.js';

describe('CookiePolicy Component', () => {
  it('renders correctly and includes key elements', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Context.Provider value={mockContextValue}>
            <CookiePolicy />
          </Context.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );
  });
});
