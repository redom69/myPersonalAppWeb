import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useResetPasswordValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    password: Yup.string()
      .required(t('pages.resetPassword.passwordRequired'))
      .min(8, t('pages.resetPassword.passwordMinLength')),
    confirmPassword: Yup.string()
      .required(t('pages.resetPassword.confirmPasswordRequired'))
      .oneOf(
        [Yup.ref('password'), null],
        t('pages.resetPassword.confirmPasswordMatch')
      ),
  });
};
