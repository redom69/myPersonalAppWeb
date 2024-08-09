import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

import { UserNotAuthenticatedApiFactory } from '../../typescript-axios';
import { MarsinetContext } from '../../context/marsinetProvider';
import SelectorLanguageComponent from '../../components/selector-language-component/selector-language-component';
import { useLoginValidationSchema } from '../../validations';
import {
  environment,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from '../../../environments/environment';

const apiService = UserNotAuthenticatedApiFactory();

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsLogged, setAccessToken, setRefreshToken } =
    useContext(MarsinetContext);
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const show = (error: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: t('pages.login.invalidCredentials'),
    });
  };

  const formik = useFormik({
    initialValues: environment.loginForm,
    validationSchema: useLoginValidationSchema(),
    onSubmit: async () => {
      await login();
    },
  });

  const login = async () => {
    setLoading(true);
    try {
      const {
        data: { access_token, refresh_token },
      } = await apiService.appControllerLogin(formik.values);
      loginSuccess(access_token, refresh_token);
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error?.response?.data?.message) {
        show(error.response.data.message);
      }
    }
  };

  const isFormFieldInvalid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) =>
    isFormFieldInvalid(name) ? (
      <div className="flex align-items-center justify-content-start mt-1 mx-2">
        <small className="p-error">*{t(formik.errors[name])}</small>
      </div>
    ) : null;

  const loginSuccess = (token: string | null, refreshToken: string | null) => {
    if (token && refreshToken) {
      setLoading(false);
      setIsLogged(true);
      setAccessToken(token);
      setRefreshToken(refreshToken);
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
    loginSuccess(token, refreshToken);
  }, []);

  return (
    <div
      className="min-h-screen pb-6"
      style={{
        background: 'linear-gradient(60deg, #6C1AFF 0%,#C822FF 100%)',
      }}
    >
      <div className="absolute right-0 top-0">
        <Button
          className="flex align-items-center justify-content-center cursor-pointer p-3 border-round hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
          style={{
            color: hover ? 'black' : 'white',
            background: 'transparent',
            border: 'none',
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <SelectorLanguageComponent />
        </Button>
      </div>

      <div className="flex align-items-center justify-content-center pt-6">
        <div
          className={`px-3 md:px-4 surface-100 shadow-2 text-center w-10 md:w-25rem formgrid p-fluid border-round-3xl mt-4 lg:mt-0 ${loading ? 'h-21rem' : ''}`}
        >
          <div className="mb-5">
            {loading ? (
              <div
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  paddingTop: '80px',
                }}
              >
                <img
                  src="/assets/icons8-laravel-96.png"
                  alt="logo"
                  style={{ width: '150px' }}
                  className="text-center"
                />
              </div>
            ) : (
              <img
                src="/assets/icons8-laravel-96.png"
                alt="logo"
                style={{ width: '100px', paddingTop: '30px' }}
                className="text-center"
              />
            )}
          </div>
          <Toast ref={toast} position="top-center" />

          {!loading && (
            <>
              <form onSubmit={formik.handleSubmit} method="post">
                <div className="grid formgrid p-fluid">
                  <div className="field mb-5 col-12">
                    <span className="p-float-label mt-4">
                      <InputText
                        id="email-login"
                        name="username"
                        type="email"
                        autoComplete="off"
                        value={formik.values.username}
                        onChange={(e) =>
                          formik.setFieldValue('username', e.target.value)
                        }
                        className={classNames({
                          'p-invalid': isFormFieldInvalid('username'),
                        })}
                      />
                      <label htmlFor="username_input">
                        {t('pages.login.email')}
                      </label>
                    </span>
                    {getFormErrorMessage('username')}
                  </div>
                  <div className="field col-12">
                    <span className="p-float-label">
                      <Password
                        id="password-login"
                        name="password"
                        autoComplete="off"
                        value={formik.values.password}
                        onChange={(e) =>
                          formik.setFieldValue('password', e.target.value)
                        }
                        className={classNames({
                          'p-invalid': isFormFieldInvalid('password'),
                        })}
                        feedback={false}
                        toggleMask
                      />
                      <label htmlFor="password_input">
                        {t('pages.login.password')}
                      </label>
                    </span>
                    {getFormErrorMessage('password')}
                  </div>
                </div>

                <div className="mb-3 text-right">
                  <button
                    onClick={() => navigate('/request-reset-password')}
                    className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                    style={{
                      border: 'none',
                      background: 'none',
                      padding: 0,
                      outline: 'none',
                    }}
                  >
                    {t('pages.login.forgotPassword')}
                  </button>
                </div>

                <Button
                  id="button-login-submit"
                  type="submit"
                  label={t('pages.login.login')}
                />
              </form>
              <div className="col-12">
                <div className="flex w-full relative align-items-center justify-content-center my-3 px-4">
                  <div className="border-top-1 surface-border top-50 left-0 absolute w-full"></div>
                  <div className="px-2 z-1 surface-100 flex align-items-center">
                    <span className="text-900 font-bold">
                      {t('pages.login.or')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <Button
                  id="button-login-register"
                  severity="secondary"
                  onClick={() => navigate('/register')}
                  label={t('pages.login.register')}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
