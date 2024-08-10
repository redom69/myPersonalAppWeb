import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useEditUserValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\sñÑ]*$/, t('pages.register.invalidName'))
      .matches(/^[^<>]*$/, t('pages.register.invalidCharactersName'))
      .required(t('pages.register.nameRequired')),
    surnames: Yup.string()
      .matches(/^[a-zA-Z\sñÑ]*$/, t('pages.register.invalidSurnames'))
      .matches(/^[^<>]*$/, t('pages.register.invalidCharactersSurnames'))

      .required(t('pages.users.createUser.surnamesRequired')),
    phone: Yup.string()
      .matches(/^\+\d{11}$/, t('pages.register.phoneInvalid'))
      .matches(/^[^<>]*$/, t('pages.register.phoneInvalidCharacters'))
      .required(t('pages.register.phoneRequired')),
    birth_date: Yup.date()
      .required(t('pages.register.birthdateRequired'))
      .nullable(),
    nationality: Yup.string()
      .matches(/^[a-zA-Z\sñÑ]*$/, t('pages.register.invalidNationality'))
      .matches(/^[^<>]*$/, t('pages.register.invalidCharactersNationality'))

      .required(t('pages.register.nationalityRequired')),
  });
};
