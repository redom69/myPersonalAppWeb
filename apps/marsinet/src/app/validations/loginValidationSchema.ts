import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useLoginValidationSchema = () => {
  const { t } = useTranslation();

  const emailValidation = Yup.string()
    .email(t('pages.login.invalidEmail'))
    .matches(
      /^[\w.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      t('pages.login.invalidEmail')
    )
    .matches(/^[^<>]*$/, t('pages.login.invalidCharacters'))

    .required(t('pages.login.requiredEmail'));

  const passwordValidation = Yup.string().required(
    t('pages.login.requiredPassword')
  );

  return Yup.object({
    username: emailValidation,
    password: passwordValidation,
  });
};
