import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useAddDeviceToInstitutionValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    code: Yup.string()
      .required(t('pages.devices.codeRequired'))
      .matches(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        t('pages.devices.codeInvalid')
      )
      .matches(/^[^<>]*$/, t('pages.devices.codeInvalidCharacters')),
  });
};
