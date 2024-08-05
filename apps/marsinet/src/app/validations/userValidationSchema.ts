import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useUserValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, t('pages.register.invalidName'))
      .matches(/^[^<>]*$/, t('pages.register.invalidCharactersName'))
      .required(t('pages.register.nameRequired')),
    surnames: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, t('pages.register.invalidSurnames'))
      .matches(/^[^<>]*$/, t('pages.register.invalidCharactersSurnames'))
      .required(t('pages.register.surnamesRequired')),
    phone: Yup.string()
      .matches(/^\+\d{11}$/, t('pages.register.phoneInvalid'))
      .matches(/^[^<>]*$/, t('pages.register.phoneInvalidCharacters'))
      .required(t('pages.register.phoneRequired')),
    birth_date: Yup.date()
      .required(t('pages.register.birthdateRequired'))
      .nullable(),
    email: Yup.string()
      .email(t('pages.register.emailInvalid'))
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        t('pages.register.emailInvalid')
      )
      .matches(/^[^<>]*$/, t('pages.login.invalidCharacters'))
      .required(t('pages.register.emailRequired')),
    password: Yup.string()
      .min(8, t('pages.register.passwordMin'))
      .matches(/[a-z]/, t('pages.register.passwordLowercase'))
      .matches(/[A-Z]/, t('pages.register.passwordUppercase'))
      .matches(/[0-9]/, t('pages.register.passwordNumber'))
      .required(t('pages.register.passwordRequired')),
    organization_id: Yup.string().required(
      t('pages.register.organizationRequired')
    ),
    nationality: Yup.string()
      .matches(/^[a-zA-Z\sñÑ]*$/, t('pages.register.invalidNationality'))
      .required(t('pages.register.nationalityRequired')),
  });
};
