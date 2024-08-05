import axios from 'axios';

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Verificar si el error es 401 y la solicitud no ha sido reintentada aún
      if (error.response.status === 401 && !originalRequest._retry) {
        const errorMsg = error.response.data.message;
        if (errorMsg.includes('Token de acceso inválido o expirado')) {
          const refreshToken = localStorage.getItem('rt');

          if (!refreshToken) {
            redirectToLogin();
            return Promise.reject(error);
          }

          originalRequest._retry = true;

          try {
            const res = await axios.post(
              '/refresh-token',
              { refresh_token: refreshToken },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            if (res.status === 200) {
              localStorage.setItem('at', res.data);
              originalRequest.headers['Authorization'] = `Bearer ${res.data}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            redirectToLogin();
            return Promise.reject(refreshError);
          }
        } else {
          redirectToLogin();
        }
      }

      return Promise.reject(error);
    }
  );
};

function redirectToLogin() {
  localStorage.removeItem('rt');
  localStorage.removeItem('at');
  window.location.href = '/login';
}
