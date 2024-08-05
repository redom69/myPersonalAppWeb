import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { Link, useNavigate } from 'react-router-dom';
import { UserNotAuthenticatedApiFactory } from '../../typescript-axios';
import {
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
  environment,
} from 'apps/marsinet/src/environments/environment';
import { MarsinetContext } from '../../context/marsinetProvider';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import SelectorLanguageComponent from '../../components/selector-language-component/selector-language-component';
import { ProgressBar } from 'primereact/progressbar';
import { Dropdown } from 'primereact/dropdown';
import { useUserValidationSchema } from '../../validations';

/* eslint-disable-next-line */
export interface RegisterProps {}

const apiSerivice = UserNotAuthenticatedApiFactory();

export function Register(props: RegisterProps) {
  const navigate = useNavigate();
  const { setIsLogged, setAccessToken, setRefreshToken } =
    useContext(MarsinetContext);
  const { t } = useTranslation();

  const [confirmConfidentiality, setConfirmConfidentiality] =
    useState<boolean>(false);
  const [confirmLegalNotice, setConfirmLegalNotice] = useState<boolean>(false);
  const [confirmCookiesPolicy, setConfirmCookiesPolicy] =
    useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const [isEmailAlreadyExists, setIsEmailAlreadyExists] =
    useState<boolean>(false);

  const toast = useRef(null);

  const [loading, setLoading] = useState(false);

  // Formulario
  const formik = useFormik({
    initialValues: environment.registerForm,
    validationSchema: useUserValidationSchema(),
    onSubmit: async (data) => {
      await register();
    },
  });

  // HEADER Y FOOTER PICK PASSWORD
  const headerPickPAssword = (
    <div className="font-bold mb-3">{t('pages.register.pickPassword')}</div>
  );
  const footerPickPAssword = (
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

  async function register() {
    setLoading(true);
    try {
      const {
        data: { access_token, refresh_token },
      } = await apiSerivice.appControllerRegister(formik.values);

      setIsEmailAlreadyExists(false);
      registerSuccess(access_token, refresh_token);
    } catch (error) {
      // Usuario ya existe
      setLoading(false);
      if (error.response.status === 409) {
        show('error', 'Error', t('pages.patients.messages.emailAlreadyExists'));
        setIsEmailAlreadyExists(true);
        return;
      }

      if (error.response.status === 400) {
        show(
          'error',
          'Error',
          t('pages.patients.messages.organization_not_found')
        );

        return;
      }
      if (error.response.status !== 409) {
        show(
          'error',
          'Error',
          t('pages.patients.messages.somethingUnexpectedHappened')
        );
        return;
      }
    }
  }

  function registerSuccess(token: string, refreshToken: string) {
    if (token) {
      setIsLogged(true);
      setAccessToken(token);
      setRefreshToken(refreshToken);
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
      setAccessToken(token);
      // Set default axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
      setLoading(false);
    }
  }

  function isFormFieldInvalid(name) {
    const touched = formik.touched[name];
    const error = formik.errors[name];
    return touched && error ? true : false;
  }

  const getFormErrorMessage = (name: string) => {
    return isFormFieldInvalid(name) ? (
      <div className="flex align-items-center justify-content-start mt-1 mx-2">
        <small className="p-error">*{t(formik.errors[name])}</small>
      </div>
    ) : null;
  };

  // Función para mostrar Toast
  const show = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const handleChangeSelectedInstution = (e) => {
    setSelectedInstitution(e.value);
    formik.setFieldValue('organization_id', e.value.o_id);
  };

  const institutionTemplateDropwdown = (option) => {
    return (
      <div className="flex align-items-center">
        <span className="font-bold">{option.name}</span>
      </div>
    );
  };

  const selectedInstitutionTemplate = (option) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <span className="font-bold">{option.name}</span>
        </div>
      );
    }
    return <span>{t('selectInstitution')}</span>;
  };

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (token) {
      navigate('/login');
    }
  }, []);

  const handleChangeConfirmConfidentiality = () => {
    setConfirmConfidentiality(!confirmConfidentiality);
  };

  const handleChangeConfirmLegalNotice = () => {
    setConfirmLegalNotice(!confirmLegalNotice);
  };

  const handleChangeConfirmCookiesPolicy = () => {
    setConfirmCookiesPolicy(!confirmCookiesPolicy);
  };

  const enableButtonRegister = () => {
    if (confirmConfidentiality && confirmLegalNotice && confirmCookiesPolicy) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await apiSerivice.appControllerGetOrganizations();
        setInstitutions(response.data);
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
      }
    }

    fetchOrganizations();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <div
        className="min-h-screen pb-6"
        style={{
          background: 'linear-gradient(60deg, #13dfb6 0%,#004e78 100%)',
        }}
      >
        <div className="absolute right-0 top-0">
          <div className="flex p-3 justify-content-end">
            <SelectorLanguageComponent />
          </div>
        </div>
        {loading && (
          <div
            className={`flex align-items-center justify-content-center pt-6`}
          >
            <div
              className={`px-3 md:px-4 surface-100 shadow-2 text-center w-10 md:w-25rem formgrid p-fluid border-round-3xl mt-4 lg:mt-0 ${
                loading ? 'h-21rem' : ''
              }`}
            >
              <div className="mb-5">
                <img
                  src="/assets/marsi-azul-degradado-fondo-blanco.png"
                  alt="logo marsinet"
                  style={{ width: '300px' }}
                  className="text-center"
                />
              </div>
              <ProgressBar
                mode="indeterminate"
                style={{ height: '6px' }}
              ></ProgressBar>
            </div>
          </div>
        )}
        {!loading && (
          <div className="lg:max-width flex justify-content-center pt-8">
            <div className="px-2 mx-2 w-full md:w-11 lg:w-9 xl:w-7 lg:px-4 surface-100 shadow-2 text-center border-round-3xl relative">
              {/* Logo Marsinet */}
              <div className="absolute position-icon">
                <Button
                  rounded
                  text
                  raised
                  id="button-register-login"
                  tooltip={t('pages.register.goTooltipLogin')}
                  tooltipOptions={{
                    position: 'top',
                    mouseTrack: true,
                    mouseTrackTop: 15,
                  }}
                  icon="pi pi-home"
                  onClick={() => navigate('/login')}
                />
              </div>
              <div className="col-12 p-0">
                <img
                  className="w-18rem lg:w-20rem"
                  src="/assets/marsi-azul-degradado-fondo-blanco.png"
                  alt="logo marsinet"
                />
              </div>
              <div className="col-12 p-0">
                <p className="text-3xl lg:text-4xl m-0">
                  {t('pages.register.title')}
                </p>
              </div>
              {/* --------------------------------------------------------------------- */}

              {/* DIVIDER USER */}
              <div className="col-12">
                <div className="flex w-full relative align-items-center justify-content-start my-3 px-4">
                  <div className="border-top-1 surface-border top-50 left-0 absolute w-full"></div>
                  <div className="px-2 z-1 surface-100 flex align-items-center">
                    <i className="pi pi-user text-900 mr-2"></i>
                    <span className="text-900 font-bold">
                      {t('pages.register.user')}
                    </span>
                  </div>
                </div>
              </div>
              {/* --------------------------------------------------------------------- */}

              {/* Formulario */}
              <form
                className="col-12"
                onSubmit={formik.handleSubmit}
                autoComplete="off"
              >
                <div className="grid formgrid p-fluid">
                  {/* Nombre */}
                  <div className="field mb-5 col-12 md:col-6">
                    <span className="p-float-label font-bold ">
                      <InputText
                        id="input-register-name"
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
                      <label htmlFor="input_name">
                        {t('pages.register.name')}
                      </label>
                    </span>
                    {getFormErrorMessage('name')}
                  </div>

                  {/* Apellidos */}
                  <div className="field mb-5 col-12 md:col-6">
                    <span className="p-float-label font-bold">
                      <InputText
                        id="input-register-surnames"
                        name="surnames"
                        onBlur={formik.handleBlur}
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

                  {/* email */}
                  <div className="field mb-5 col-12 md:col-6">
                    <span className="p-float-label font-bold ">
                      <InputText
                        id="input-register-email"
                        name="email"
                        onBlur={formik.handleBlur}
                        autoComplete="off"
                        value={formik.values.email}
                        onChange={(e) => {
                          formik.setFieldValue('email', e.target.value);
                          setIsEmailAlreadyExists(false);
                        }}
                        className={classNames({
                          'p-invalid':
                            isFormFieldInvalid('email') || isEmailAlreadyExists,
                        })}
                      />
                      <label htmlFor="input-register-email">
                        {t('pages.register.email')}
                      </label>
                    </span>
                    {getFormErrorMessage('email')}
                  </div>

                  {/* Password */}
                  <div className="field mb-5 col-12 md:col-6">
                    <span className="p-float-label font-bold ">
                      <Password
                        id="input-register-password"
                        name="password"
                        onBlur={formik.handleBlur}
                        autoComplete="off"
                        value={formik.values.password}
                        onChange={(e) =>
                          formik.setFieldValue('password', e.target.value)
                        }
                        className={classNames({
                          'p-invalid': isFormFieldInvalid('password'),
                        })}
                        header={headerPickPAssword}
                        footer={footerPickPAssword}
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
                        id="input-register-phone"
                        name="phone"
                        onBlur={formik.handleBlur}
                        autoComplete="off"
                        value={formik.values.phone}
                        onChange={(e) =>
                          formik.setFieldValue('phone', e.target.value)
                        }
                        className={classNames({
                          'p-invalid': isFormFieldInvalid('phone'),
                        })}
                      />
                      <label htmlFor="input_phone">
                        {t('pages.register.phone')}
                      </label>
                    </span>
                    {getFormErrorMessage('phone')}
                  </div>

                  {/* Fecha Nacimiento */}
                  <div className="field mb-5 col-12 md:col-5">
                    <span className="p-float-label font-bold">
                      <Calendar
                        id="input-register-birth_date"
                        onBlur={formik.handleBlur}
                        value={formik.values.birth_date}
                        onChange={(e) => {
                          formik.setFieldValue('birth_date', e.target.value);
                        }}
                        className={classNames({
                          'p-invalid': isFormFieldInvalid('birth_date'),
                        })}
                        dateFormat="dd-mm-yy"
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
                        id="input-register-nationality"
                        name="nationality"
                        onBlur={formik.handleBlur}
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

                  {/* Organization */}
                  <div className="field mb-5 col-12 md:col-12">
                    <span className="p-float-label font-bold">
                      <Dropdown
                        value={selectedInstitution}
                        onChange={handleChangeSelectedInstution}
                        options={institutions}
                        optionLabel="name"
                        placeholder={t('selectInstitution')}
                        valueTemplate={selectedInstitutionTemplate}
                        itemTemplate={institutionTemplateDropwdown}
                        showClear
                        filter
                      />

                      <label htmlFor="input_organization_id">
                        {t('selectInstitution')}
                      </label>
                    </span>
                    {getFormErrorMessage('organization_id')}
                  </div>
                </div>
                {/* Checkbox legal-notice, confidentiality and cookie-policy */}
                {
                  <div className="col-12 mx-0 px-0 grid grid-nogutter">
                    <div className="col-12 grid grid-nogutter surface-200 p-4 surface-border border-round-2xl border-dashed">
                      <div className="col-12">
                        <div className="flex align-items-center gap-2 mb-3">
                          <Checkbox
                            id="checkbox-confirm-legal-notice"
                            checked={confirmLegalNotice}
                            onChange={handleChangeConfirmLegalNotice}
                          />
                          <label className="font-bold block ">
                            <Link
                              to="/legal-notice"
                              className="no-underline hover:text-color-secondary active:text-color-secondary"
                              target="_blank"
                            >
                              {t('pages.register.legalNotice')}
                            </Link>
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="flex align-items-center gap-2 mb-3">
                          <Checkbox
                            id="checkbox-confirm-confidentiality"
                            checked={confirmConfidentiality}
                            onChange={handleChangeConfirmConfidentiality}
                          />
                          <label className="font-bold block">
                            <Link
                              to="/confidentiality"
                              className="no-underline hover:text-color-secondary"
                              target="_blank"
                            >
                              {t('pages.register.confidentiality')}
                            </Link>
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="flex align-items-center gap-2 mb-3">
                          <Checkbox
                            id="checkbox-confirm-cookies-policy"
                            checked={confirmCookiesPolicy}
                            onChange={handleChangeConfirmCookiesPolicy}
                          />
                          <label className="font-bold block">
                            <Link
                              to="/cookies-policy"
                              className="no-underline hover:text-color-secondary"
                              target="_blank"
                            >
                              {t('pages.register.cookiePolicy')}
                            </Link>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                }

                {/* Boton de Recuperar contraseña si email existe o registrarse */}
                <div className="field col-12 grid">
                  <div className="col-6 text-left">
                    {isEmailAlreadyExists && (
                      <>
                        {/* Go to a request reset password */}
                        <Button
                          rounded
                          raised
                          className="p-button-danger"
                          label={t('pages.requestResetPassword.title')}
                          tooltipOptions={{
                            position: 'top',
                            mouseTrack: true,
                            mouseTrackTop: 15,
                          }}
                          icon="pi pi-unlock"
                          onClick={() => navigate('/request-reset-password')}
                        />
                      </>
                    )}
                  </div>
                  <div className="col-6 text-right">
                    <Button
                      disabled={!enableButtonRegister()}
                      id="button-register-submit"
                      type="submit"
                      label={t('pages.register.submit')}
                      onClick={() => {
                        console.log('');
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
