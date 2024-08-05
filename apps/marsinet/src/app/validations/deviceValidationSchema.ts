import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useDeviceValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    serial: Yup.string()
      .required(t('pages.devices.serialRequired'))
      .matches(/^[a-zA-Z0-9_.-]*$/, t('pages.devices.serialInvalid'))
      .matches(/^[^<>]*$/, t('pages.devices.serialInvalidCharacters')),
    model: Yup.string()
      .required(t('pages.devices.modelRequired'))
      .matches(/^[a-zA-Z0-9-]*$/, t('pages.devices.modelInvalid'))
      .matches(/^[^<>]*$/, t('pages.devices.modelInvadidCharacters')),

    structure_version: Yup.string()
      .required(t('pages.devices.structureRequired'))
      .matches(/^[^<>]*$/, t('pages.devices.structureInvalidCharacters')),
    password: Yup.string().matches(
      /^[^<>]*$/,
      t('pages.devices.password_invalid_characters')
    ),
  });
};
