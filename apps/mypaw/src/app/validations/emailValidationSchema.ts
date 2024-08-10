import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useEmailValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    email: Yup.string()
      .email(t('pages.register.emailInvalid'))
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        t('pages.register.emailInvalid')
      )
      .required(t('pages.users.createUser.emailRequired')),
  });
};
