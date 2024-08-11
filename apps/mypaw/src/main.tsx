import React from 'react';
import * as ReactDOM from 'react-dom/client';

import axios from 'axios';
import AppRoutes from './routes/appRoutes';
import { Provider } from './app/context/provider';
import { environment } from './environments/environment';
import { setupAxiosInterceptors } from './setupAxios';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './i18n';
import './chart';

setupAxiosInterceptors();

axios.defaults.baseURL = environment.apiBaseUrl;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider>
      <SpeedInsights />
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
