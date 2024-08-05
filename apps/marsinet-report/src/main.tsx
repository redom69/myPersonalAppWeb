import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import axios from 'axios';

import './i18n';
import './chart';
import { environment } from './environments/environment';

axios.defaults.baseURL = environment.apiBaseUrl;
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
