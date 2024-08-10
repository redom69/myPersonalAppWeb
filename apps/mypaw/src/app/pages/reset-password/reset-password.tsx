import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { environment } from 'apps/mypaw/src/environments/environment';

import { UserNotAuthenticatedApiFactory } from '../../typescript-axios';
import { useResetPasswordValidationSchema } from '../../validations';

const apiService = UserNotAuthenticatedApiFactory();

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const query = useQuery();
  const [messageSent, setMessageSent] = useState(false);

  const formik = useFormik({
    initialValues: environment.resetPasswordForm,
    validationSchema: useResetPasswordValidationSchema(),
    onSubmit: async (data) => {
      const r = query.get('r');
      const id = query.get('id');
      try {
        const response = await apiService.appControllerResetPassword({
          id,
          r,
          new_password: data.password,
          confirm_new_password: data.confirmPassword,
        });

        if (response.data.success) {
          setMessageSent(true);
        }
        formik.resetForm();
      } catch (error) {
        console.error('Error during password reset', error);
      }
    },
  });

  const isFormFieldInvalid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) => (
    <small className="p-error mb-3">
      {isFormFieldInvalid(name) ? t(formik.errors[name]) : '\u00A0'}
    </small>
  );

  return (
    <div
      className="flex align-items-center justify-content-center py-8 min-h-screen"
      style={{ background: 'linear-gradient(60deg, #6C1AFF 0%,#C822FF 100%)' }}
    >
      {!messageSent ? (
        <div className="px-6 surface-100 shadow-2 text-center w-11 md:w-25rem lg:w-30rem formgrid p-fluid border-round-3xl">
          <div className="text-4xl font-medium">
            <img
              src="/assets/icons8-laravel-96.png"
              alt="logo"
              style={{ width: '300px' }}
            />
          </div>
          <h1 className="text-2xl font-medium">
            {t('pages.resetPassword.title')}
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-column gap-2 py-4"
          >
            <span className="p-float-label">
              <Password
                id="password_input"
                name="password"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={classNames({
                  'p-invalid': isFormFieldInvalid('password'),
                })}
                toggleMask
              />
              <label htmlFor="password_input">
                {t('pages.resetPassword.password')}
              </label>
            </span>
            {getFormErrorMessage('password')}
            <span className="p-float-label">
              <Password
                id="confirm_password_input"
                name="confirmPassword"
                autoComplete="off"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                className={classNames({
                  'p-invalid': isFormFieldInvalid('confirmPassword'),
                })}
                toggleMask
              />
              <label htmlFor="confirm_password_input">
                {t('pages.resetPassword.confirmPassword')}
              </label>
            </span>
            {getFormErrorMessage('confirmPassword')}
            <Button type="submit" label={t('pages.resetPassword.reset')} />
            <div className="text-center">
              <Button
                className="cursor-pointer font-medium block text-center py-4 no-underline hover:text-cyan-600 hover:underline"
                onClick={() => navigate('/login')}
                type="button"
              >
                <i className="pi pi-chevron-left mr-2"></i>
                {t('pages.resetPassword.back')}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="px-4 py-5 surface-100 shadow-2 text-center mx-2 w-10 md:w-7 formgrid p-fluid border-round-3xl">
          <div>
            <img
              src="/assets/icons8-laravel-96.png"
              className="w-5 lg:w-3"
              alt="logo"
            />
          </div>
          <div className="text-xl lg:text-2xl font-medium">
            {t('pages.resetPassword.success')}
          </div>
          <div className="text-center">
            <Button
              className="cursor-pointer font-medium block text-center py-4 no-underline hover:text-cyan-600 hover:underline"
              onClick={() => navigate('/login')}
              type="button"
            >
              <i className="pi pi-chevron-left mr-2"></i>
              {t('pages.resetPassword.back')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
