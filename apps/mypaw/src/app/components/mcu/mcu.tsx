import { useEffect, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';

import {
  AdminApiFactory,
  UsersApiFactory,
} from 'apps/mypaw/src/app/typescript-axios';
import { Context } from 'apps/mypaw/src/app/context/provider';
import { useUserValidationSchema } from 'apps/mypaw/src/app/validations/userValidationSchema';

/* eslint-disable-next-line */
export interface ModalCreateUserProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  createUserFunction: (values: CreateUser) => Promise<boolean>;
}

interface CreateUser {
  name: string;
  surnames: string;
  email: string;
  password: string;
  phone: string;
  birth_date: string;
  nationality: string;
  organization_id: string;
}

const apiService = AdminApiFactory();
const userService = UsersApiFactory();

export function ModalCreateUser(props: Readonly<ModalCreateUserProps>) {
  const { t } = useTranslation();
  const { role, access_token } = useContext(Context);
  const toast = useRef(null);

  // HEADER Y FOOTER PICK PASSWORD
  const headerPickPassword = (
    <div className="font-bold mb-3">{t('pages.register.pickPassword')}</div>
  );

  const footerPickPassword = (
    <>
      <Divider />
      <p className="mt-2">{t('pages.register.suggestion')}</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>{t('pages.register.suggestionLetterLower')}</li>
        <li>{t('pages.register.suggestionLetterUpper')}</li>
        <li>{t('pages.register.suggestionNumber')}</li>
        <li>{t('pages.register.suggestionMinLength')}</li>
        <li>{t('pages.register.suggestionSpecial')}</li>
      </ul>
    </>
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      surnames: '',
      email: '',
      password: '',
      phone: '',
      birth_date: '',
      nationality: '',
      organization_id: '',
    },
    validationSchema: useUserValidationSchema(),
    onSubmit: async (values) => {
      try {
        const response = await props.createUserFunction(values);
        if (response) {
          formik.resetForm();
          props.setVisible(false);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onpagehide = () => {
    formik.resetForm();
    props.setVisible(false);
  };

  // Comprobar si el campo es válido
  const isFormFieldInvalid = (name: string) => {
    return !!(formik.touched[name] && formik.errors[name]);
  };

  // Obtener mensaje de error del campo
  const getFormErrorMessage = (name: string) => {
    return isFormFieldInvalid(name) ? (
      <div className="flex align-items-center justify-content-start mt-1 mx-2">
        <small className="p-error">*{t(formik.errors[name])}</small>
      </div>
    ) : null;
  };

  useEffect(() => {
    if (!props.visible) return;
    getInstitutions();
  }, [props.visible]);

  const getInstitutions = async () => {
    const tokenParts = access_token.split('.');
    const encodedPayload = tokenParts[1];

    // Decodificar la carga útil usando atob
    const decodedPayload = atob(encodedPayload);

    // Parsear el JSON decodificado
    const payloadObject = JSON.parse(decodedPayload);
    try {
      if (role === 'admin') {
        await apiService.adminControllerAllOrganizations();
      } else {
        await userService.usersControllerGetOrganization(payloadObject.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const canCreate = () => {
    if (formik.errors && !formik.isValid) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={t('pages.users.add')}
        visible={props.visible}
        className="mx-2 md:w-12 lg:w-8"
        onHide={onpagehide}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <div className="grid formgrid p-fluid">
            {/* DIVIDER DATOS USUARIO */}
            <div className="col-12 my-3">
              <div className="flex w-full relative align-items-center justify-content-start my-3 px-4">
                <div className="border-top-1 surface-border top-50 left-0 absolute w-full"></div>
                <div className="px-2 z-1 surface-0 flex align-items-center">
                  <i className="pi pi-user text-900 mr-2"></i>
                  <span className="text-900 font-bold">
                    {t('pages.users.createUser.data')}
                  </span>
                </div>
              </div>
            </div>
            {/* Nombre */}
            <div className="field mb-5 col-12 md:col-6">
              <span className="p-float-label font-bold">
                <InputText
                  id="input-add-user-name"
                  name="name"
                  autoComplete="off"
                  value={formik.values.name}
                  onChange={(e) => {
                    formik.setFieldValue('name', e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('name'),
                  })}
                />
                <label htmlFor="input_name">{t('pages.register.name')}</label>
              </span>
              {getFormErrorMessage('name')}
            </div>
            {/* Apellidos */}
            <div className="field mb-5 col-12 md:col-6">
              <span className="p-float-label font-bold">
                <InputText
                  onBlur={formik.handleBlur}
                  id="input-add-user-surnames"
                  name="surnames"
                  autoComplete="off"
                  value={formik.values.surnames}
                  onChange={(e) =>
                    formik.setFieldValue('surnames', e.target.value)
                  }
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('surnames'),
                  })}
                />
                <label htmlFor="input_surnames">
                  {t('pages.register.surnames')}
                </label>
              </span>
              {getFormErrorMessage('surnames')}
            </div>
            {/* Email */}
            <div className="field mb-5 col-12 md:col-6">
              <span className="p-float-label font-bold">
                <InputText
                  onBlur={formik.handleBlur}
                  id="input-add-user-email"
                  name="email"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.setFieldValue('email', e.target.value);
                  }}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('email'),
                  })}
                />
                <label htmlFor="input_username">
                  {t('pages.register.email')}
                </label>
              </span>
              {getFormErrorMessage('email')}
            </div>
            {/* Password */}
            <div className="field mb-5 col-12 md:col-6">
              <span className="p-float-label font-bold">
                <Password
                  id="input-add-user-password"
                  name="password"
                  autoComplete="off"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={(e) =>
                    formik.setFieldValue('password', e.target.value)
                  }
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('password'),
                  })}
                  header={headerPickPassword}
                  footer={footerPickPassword}
                  toggleMask
                />
                <label htmlFor="input_password">
                  {t('pages.register.password')}
                </label>
              </span>
              {getFormErrorMessage('password')}
            </div>
            {/* Teléfono */}
            <div className="field mb-5 col-12 md:col-4">
              <span className="p-float-label font-bold">
                <InputText
                  onBlur={formik.handleBlur}
                  id="input-add-user-phone"
                  name="phone"
                  autoComplete="off"
                  value={formik.values.phone}
                  onChange={(e) =>
                    formik.setFieldValue('phone', e.target.value)
                  }
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('phone'),
                  })}
                />
                <label htmlFor="input_phone">{t('pages.register.phone')}</label>
              </span>
              {getFormErrorMessage('phone')}
            </div>
            {/* Fecha Nacimiento */}
            <div className="field mb-5 col-12 md:col-5">
              <span className="p-float-label font-bold">
                <Calendar
                  id="input-add-user-birth_date"
                  onBlur={formik.handleBlur}
                  value={new Date(formik.values.birth_date)}
                  onChange={(e) => {
                    formik.setFieldValue('birth_date', e.target.value);
                  }}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('birth_date'),
                  })}
                  dateFormat="yy-mm-dd"
                  minDate={new Date('1900-01-01')}
                  maxDate={new Date()}
                  showIcon
                />
                <label htmlFor="birth_date">
                  {t('pages.register.birthDate')}
                </label>
              </span>
              {getFormErrorMessage('birth_date')}
            </div>
            {/* Nacionalidad */}
            <div className="field mb-5 col-12 md:col-3">
              <span className="p-float-label font-bold">
                <InputText
                  onBlur={formik.handleBlur}
                  id="input-add-user-nationality"
                  name="nationality"
                  autoComplete="off"
                  value={formik.values.nationality}
                  onChange={(e) => {
                    formik.setFieldValue('nationality', e.target.value);
                  }}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('nationality'),
                  })}
                />
                <label htmlFor="input_nationality">
                  {t('pages.register.nationality')}
                </label>
              </span>
              {getFormErrorMessage('nationality')}
            </div>

            {/* DIVIDER ORGANIZACION */}
            <div className="col-12">
              <div className="flex w-full relative align-items-center justify-content-start my-3 px-4">
                <div className="border-top-1 surface-border top-50 left-0 absolute w-full"></div>
                <div className="px-2 z-1 surface-0 flex align-items-center">
                  <i className="pi pi-user text-900 mr-2"></i>
                  <span className="text-900 font-bold">
                    {t('pages.users.dividerClinic')}
                  </span>
                </div>
              </div>
              {/* organization_id */}
              <div className="field mb-5 my-6 col-12 md:col-12">
                <span className="p-float-label font-bold">
                  <InputText
                    onBlur={formik.handleBlur}
                    id="input-add-user-organization_id"
                    name="organization_id"
                    autoComplete="off"
                    value={formik.values.organization_id}
                    onChange={(e) => {
                      formik.setFieldValue('organization_id', e.target.value);
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('organization_id'),
                    })}
                  />
                  <label htmlFor="input_nationality">
                    {t('pages.register.o_id')}
                  </label>
                </span>
                {getFormErrorMessage('organization_id')}
              </div>
            </div>
          </div>
          <div className="flex align-items-center justify-content-end">
            <Button
              id="button-create-user"
              severity="secondary"
              icon="pi pi-save"
              label={t('save')}
              className="p-button-raised"
              disabled={canCreate()}
              type="submit"
            ></Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default ModalCreateUser;
