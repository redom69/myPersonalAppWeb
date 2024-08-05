import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useInstitutionValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\sñÑ]*$/, t('pages.register.invalidName'))
      .matches(/^[^<>]*$/, t('pages.register.invalidCharactersName'))
      .required(t('pages.register.nameRequired')),
    street_name: Yup.string()
      .matches(/^[a-zA-Z\sñÑ]*$/, t('pages.register.street_nameInvalid'))
      .matches(/^[^<>]*$/, t('pages.register.street_nameInvalidCharacters'))
      .required(t('pages.register.street_nameRequired')),
    street_number: Yup.string()
      .matches(/^[a-zA-Z0-9\s]*$/, t('pages.register.street_numberInvalid'))
      .matches(/^[^<>]*$/, t('pages.register.street_numberInvalidCharacters'))
      .required(t('pages.register.street_numberRequired')),
    city: Yup.string()
      .matches(/^[a-zA-Z\sñÑ]*$/, t('pages.register.cityInvalid'))
      .matches(/^[^<>]*$/, t('pages.register.cityInvalidCharacters'))
      .required(t('pages.register.cityRequired')),
    postal_code: Yup.string()
      .matches(/^[0-9]{5}$/, t('pages.register.postal_codeInvalid'))
      .matches(/^[^<>]*$/, t('pages.register.postal_codeInvalidCharacters'))
      .required(t('pages.register.postal_codeRequired')),
    country: Yup.string()
      .matches(/^[a-zA-Z\sñÑ]*$/, t('pages.register.countryInvalid'))
      .matches(/^[^<>]*$/, t('pages.register.countryInvalidCharacters'))
      .required(t('pages.register.countryRequired')),
  });
};
