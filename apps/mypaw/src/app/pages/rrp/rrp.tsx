import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserNotAuthenticatedApiFactory } from '../../typescript-axios';
import { LOCAL_STORAGE_TOKEN } from 'apps/mypaw/src/environments/environment';
import { useEmailValidationSchema } from '../../validations';

const apiSerivice = UserNotAuthenticatedApiFactory();

export function RequestResetPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useRef(null);
  const [messageSent, setMessageSent] = useState(false);

  async function requestResetPassword() {
    try {
      const response = await apiSerivice.appControllerRequestResetPassword({
        username: formik.values.email,
      });
      const { success } = response.data;

      if (!success) {
        show(
          'error',
          'Error',
          t('pages.patients.messages.requestPasswordError')
        );
      } else {
        setMessageSent(true);
      }
    } catch (error) {
      show(
        'error',
        'Error',
        t('pages.patients.messages.somethingUnexpectedHappened')
      );
    }
  }

  const show = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: useEmailValidationSchema(),
    onSubmit: async () => {
      await requestResetPassword();
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{t(formik.errors[name])}</small>
    ) : null;
  };

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (token) {
      navigate('/login');
    }
  }, [navigate]);

  return !messageSent ? (
    <>
      <Toast ref={toast} />
      <div
        className="flex align-items-center justify-content-center py-8 min-h-screen"
        style={{
          background: 'linear-gradient(60deg, #6C1AFF 0%,#C822FF 100%)',
        }}
      >
        <div className="px-4 surface-100 shadow-2 text-center mx-2 w-10 md:w-25rem lg:w-30rem formgrid p-fluid border-round-3xl">
          <div className="text-4xl font-medium">
            <img
              src="/assets/icons8-laravel-96.png"
              alt="logo"
              style={{ width: '300px' }}
              className="text-center"
            />
          </div>
          <h1 className="text-2xl font-medium">
            {t('pages.requestResetPassword.title')}
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-column gap-2 py-4"
          >
            <span className="p-float-label">
              <InputText
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={(e) => {
                  formik.setFieldValue('email', e.target.value);
                }}
                className={isFormFieldInvalid('email') ? 'p-invalid' : ''}
              />
              <label htmlFor="email_input">
                {t('pages.requestResetPassword.email')}
              </label>
            </span>
            {getFormErrorMessage('email')}

            <Button
              type="submit"
              label={t('pages.requestResetPassword.send')}
            />

            <Button
              onClick={() => navigate('/login')}
              className="font-medium no-underline text-blue-500 cursor-pointer"
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              <i className="pi pi-chevron-left mr-2"></i>
              {t('pages.requestResetPassword.back')}
            </Button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <div
      className="flex align-items-center justify-content-center py-8 min-h-screen"
      style={{
        background: 'linear-gradient(60deg, #6C1AFF 0%,#C822FF 100%)',
      }}
    >
      <div className="px-4 py-8 surface-100 shadow-2 text-center mx-2 formgrid p-fluid border-round-3xl">
        <div>
          <img src="/assets/icons8-laravel-96.png" className="w-3" alt="logo" />
        </div>
        <div className="text-3xl font-medium">
          {t('pages.requestResetPassword.messageSent')}
        </div>
        <Button
          onClick={() => navigate('/login')}
          className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            outline: 'none',
          }}
        >
          <i className="pi pi-chevron-left mr-2"></i>
          {t('pages.requestResetPassword.back')}
        </Button>
      </div>
    </div>
  );
}

export default RequestResetPassword;
