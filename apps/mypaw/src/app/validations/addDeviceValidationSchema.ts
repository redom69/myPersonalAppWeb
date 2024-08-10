import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useAddDeviceValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    serial: Yup.string()
      .required(t('pages.devices.serialRequired'))
      .matches(/^[a-zA-Z0-9_.-]*$/, t('pages.devices.serialInvalid'))
      .matches(/^[^<>]*$/, t('pages.devices.serialInvalidCharacters')),
    model: Yup.string()
      .required(t('pages.devices.modelRequired'))
      .matches(/^[a-zA-Z0-9-]*$/, t('pages.devices.modelInvalid'))
      .matches(/^[^<>]*$/, t('pages.devices.modelInvalidCharacters')),
    o_id: Yup.string()
      .required(t('pages.devices.codeRequired'))
      .matches(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        t('pages.devices.codeInvalid')
      )
      .matches(/^[^<>]*$/, t('pages.devices.codeInvalidCharacters')),
    password: Yup.string()
      .required(t('pages.devices.password_required'))
      .matches(/^[^<>]*$/, t('pages.devices.password_invalid_characters')),
    structure_version: Yup.string()
      .required(t('pages.devices.structureRequired'))
      .matches(/^[a-zA-Z0-9-]*$/, t('pages.devices.structureInvalid'))
      .matches(/^[^<>]*$/, t('pages.devices.structureInvalidCharacters')),
  });
};
