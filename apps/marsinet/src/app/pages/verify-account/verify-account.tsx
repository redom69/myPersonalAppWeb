import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormikHelpers, useFormik } from 'formik';
import { Toast, ToastMessage } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { AxiosResponse } from 'axios';

import { UserNotAuthenticatedApiFactory } from '../../typescript-axios';
import { useEmailValidationSchema } from '../../validations';

export interface VerifyAccountProps {
  is_active: boolean;
}

const apiService = UserNotAuthenticatedApiFactory();

export const VerifyAccount: React.FC<VerifyAccountProps> = ({ is_active }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);

  const show = useCallback(
    (severity: ToastMessage['severity'], summary: string, detail: string) => {
      toast.current?.show({
        severity,
        summary,
        detail,
        life: 3000,
      });
    },
    []
  );

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: useEmailValidationSchema(),
    onSubmit: async (
      data,
      { setSubmitting }: FormikHelpers<{ email: string }>
    ) => {
      try {
        const response = (await apiService.appControllerEmailVerification(
          data.email
        )) as unknown as AxiosResponse<boolean>;

        const isVerified = response.data;

        if (isVerified) {
          show('success', 'Success', t('pages.notVerified.success'));
          setTimeout(() => {
            navigate('/authenticated');
          }, 1000);
        } else {
          show('error', 'Error', t('pages.notVerified.error'));
        }
      } catch (error) {
        console.error('Error during email verification', error);
        show('error', 'Error', t('pages.notVerified.error'));
      } finally {
        setSubmitting(false);
      }
    },
  });

  const isFormFieldInvalid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) =>
    isFormFieldInvalid(name) ? (
      <small className="p-error">{t(formik.errors[name] as string)}</small>
    ) : null;

  return (
    <div className="col-12">
      <Toast ref={toast} />
      <div className="flex justify-content-center align-items-center min-h-screen">
        <div
          className="flex flex-column align-items-center px-4 py-5 surface-100 shadow-2 border-round-2xl"
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <div className="text-center mb-4">
            <img
              src="/assets/icons8-laravel-96.png"
              alt="logo"
              style={{ width: '293px' }}
            />
          </div>
          <div className="mt-6 mb-5 font-bold text-3xl text-900 text-center">
            {t('accountNotVerriyed')}
          </div>
          <p className="text-700 text-xl mt-0 mb-6 text-center">
            {t('verifyEmail')}
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-column gap-2 py-4 w-full"
          >
            <span className="p-float-label">
              <InputText
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={(e) => formik.setFieldValue('email', e.target.value)}
                className={`w-full ${
                  isFormFieldInvalid('email') ? 'p-invalid' : ''
                }`}
              />
              <label htmlFor="email">
                {t('pages.requestResetPassword.email')}
              </label>
            </span>
            {getFormErrorMessage('email')}

            <Button
              type="submit"
              className="w-full"
              label={t('pages.requestResetPassword.send')}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
