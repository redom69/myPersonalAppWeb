import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { TabPanel, TabView } from 'primereact/tabview';

import { COUNTRIES } from '@mypaw/commons';
import { environment } from 'apps/mypaw/src/environments/environment';

import AddDeviceToInstitution from '../../../components/adti/adti';
import TableDevicesMyProfileComponent from '../../../components/dmpc/dmpc';

import { useInstitutionValidationSchema } from '../../../validations/institutionValidationSchema';
import {
  AdminApiFactory,
  MyAccountApiFactory,
  MyDevices,
} from '../../../typescript-axios';
import { Context } from '../../../context/provider';
import { useEditUserValidationSchema } from '../../../validations/editUserValidationSchema';

interface InstitutionFormValues {
  name: string;
  street_name: string;
  street_number: string;
  city: string;
  postal_code: string;
  country: string;
  email: string;
}

const apiService = MyAccountApiFactory();
const apiServiceAdmin = AdminApiFactory();

export function MyProfile() {
  const toast = useRef<Toast>(null);
  const { t, i18n } = useTranslation();
  const { access_token, setRole, setAdmin } = useContext(Context);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [updateDevices, setUpdateDevices] = useState<boolean>(false);
  const [organizationId, setOrganizationId] = useState<string>('');
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [activeIndexDevice, setActiveIndexDevice] = useState<number>(0);
  const [activeDevices, setActiveDevices] = useState<MyDevices[]>([]);
  const [inactiveDevices, setInactiveDevices] = useState<MyDevices[]>([]);
  const [visibleAddDevice, setVisibleAddDevice] = useState<boolean>(false);

  const dropdownOptionLabel = i18n.language === 'es' ? 'nombre' : 'name';

  const formik = useFormik({
    initialValues: environment.registerForm,
    validationSchema: useEditUserValidationSchema(),
    onSubmit: async (
      data,
      { setSubmitting }: FormikHelpers<typeof environment.registerForm>
    ) => {
      try {
        await saveChanges(data);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const formikInstitution = useFormik<InstitutionFormValues>({
    initialValues: {
      name: '',
      street_name: '',
      street_number: '',
      city: '',
      postal_code: '',
      country: '',
      email: ' ',
    },
    validationSchema: useInstitutionValidationSchema(),
    onSubmit: async (data, { setSubmitting }) => {
      try {
        await saveChangesInstitution(data);
      } finally {
        setSubmitting(false);
      }
    },
  });

  async function saveChangesInstitution(data) {
    try {
      await apiServiceAdmin.adminControllerUpdateOrganization(
        {
          city: data.city,
          country: data.country,
          postal_code: data.postal_code,
          state: data.state,
          street_name: data.street_name,
          street_number: data.street_number,
          name: data.name,
        },
        organizationId
      );
      show('success', t('my_profile.title'), t('my_profile.update_success'));
    } catch (error) {
      show('error', t('my_profile.title'), t('my_profile.update_error'));
    }
  }

  async function saveChanges(data: typeof environment.registerForm) {
    try {
      await apiService.myAccountControllerUpdate(data);
      show('success', t('my_profile.title'), t('my_profile.update_success'));
    } catch (error) {
      show('error', t('my_profile.title'), t('my_profile.update_error'));
    }
  }

  const isFormFieldInvalid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

  const isFormFieldOfInstitutionInvalid = (name: string) =>
    !!(formikInstitution.touched[name] && formikInstitution.errors[name]);

  const getFormErrorMessage = (name: string) => {
    return isFormFieldInvalid(name) ? (
      <div className="flex align-items-center justify-content-start mt-1 mx-2">
        <small className="p-error">*{t(formik.errors[name])}</small>
      </div>
    ) : null;
  };

  const getFormErrorMessageInstitution = (name: string) => {
    return isFormFieldOfInstitutionInvalid(name) ? (
      <div className="flex align-items-center justify-content-start mt-1 mx-2">
        <small className="p-error">*{t(formikInstitution.errors[name])}</small>
      </div>
    ) : null;
  };

  useEffect(() => {
    if (!access_token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    const fetchData = async () => {
      try {
        const [userDataResponse, devicesResponse] = await Promise.all([
          apiService.myAccountControllerGetData(),
          apiService.myAccountControllerGetMyDevices(),
        ]);

        const { user_data, email } = userDataResponse.data.user;
        const organization = userDataResponse.data.organization;

        setEmail(email);
        formik.setValues({
          name: user_data.name,
          surnames: user_data.surnames,
          nationality: user_data.nationality,
          phone: user_data.phone,
          birth_date: new Date(user_data.birth_date),
          ...formik.values,
        });
        formikInstitution.setValues({
          name: organization.name,
          street_name: organization.street_name,
          street_number: organization.street_number,
          city: organization.city,
          postal_code: organization.postal_code,
          country: organization.country,
          email: formikInstitution.values.email,
        });

        setOrganizationId(organization.o_id || '');
        setCanEdit(userDataResponse.data.can_edit);

        const devicesList = devicesResponse.data['devices'];
        setActiveDevices(devicesList.filter((device) => device.active));
        setInactiveDevices(devicesList.filter((device) => !device.active));

        setRole(userDataResponse.data.organization?.role);
        setAdmin(userDataResponse.data.can_edit);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [access_token, updateDevices]);

  const show = (
    severity: 'success' | 'error' | 'info' | 'warn',
    summary: string,
    detail: string
  ) => {
    if (toast.current) {
      toast.current.show({
        severity,
        summary,
        detail,
        life: 3000,
      });
    }
  };

  const changeTabViewDevices = (index: number) => {
    setActiveIndexDevice(index);
  };

  const addDeviceToInstitutionFunction = async (data: { code: string }) => {
    try {
      await apiService.myAccountControllerAddDeviceToMyAccount(data.code);
      show('success', t('messages.success'), t('messages.success_message'));
      setUpdateDevices(!updateDevices);
    } catch (error) {
      console.error('Error adding device:', error);
      const message = error?.response?.data?.message;
      if (message) {
        switch (message) {
          case 'Device is not from the same organization':
            show('error', t('messages.error'), t('messages.cant_use_device'));
            break;
          case 'Device not found':
            show('error', t('messages.error'), t('messages.device_not_exists'));
            break;
          default:
            show('error', t('messages.error'), t('messages.error_message'));
            break;
        }
      } else {
        show('error', t('messages.error'), t('messages.error_message'));
      }
    }
  };

  return (
    <div className="col-12 xl:pl-7 xl:pr-7">
      {!isLoading && (
        <>
          <Toast ref={toast} />
          <div className="col-12 grid-nogutter">
            <div className="shadow-3 p-3 surface-0 border-round-xl py-5 px-3">
              <form
                className="col-12 p-3"
                onSubmit={formik.handleSubmit}
                method="post"
              >
                <div className="grid formgrid p-fluid">
                  <div className="col-12 grid grid-nogutter">
                    <div className="col-12 grid px-0 mx-0">
                      <div className="col-12 mb-4">
                        <div className="flex w-full relative align-items-center justify-content-start my-3 px-4">
                          <div className="border-top-1 surface-border top-50 left-0 absolute w-full"></div>
                          <div className="px-2 z-1 surface-50 flex align-items-center">
                            <i className="pi pi-user text-900 mr-2"></i>
                            <span className="text-900 font-bold">
                              {t('pages.register.user')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="field mb-5 col-12 md:col-6">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-name"
                            name="name"
                            autoComplete="off"
                            value={formik.values.name}
                            onChange={(e) =>
                              formik.setFieldValue('name', e.target.value)
                            }
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
                      <div className="field mb-5 col-12 md:col-6">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-surnames"
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
                      <div className="field mb-5 col-12 md:col-3">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-email"
                            name="email"
                            autoComplete="off"
                            value={email}
                            readOnly
                          />
                          <label htmlFor="input_email">
                            {t('pages.register.email')}
                          </label>
                        </span>
                      </div>
                      <div className="field mb-5 col-12 md:col-4">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-nationality"
                            name="nationality"
                            autoComplete="off"
                            value={formik.values.nationality}
                            onChange={(e) =>
                              formik.setFieldValue(
                                'nationality',
                                e.target.value
                              )
                            }
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
                      <div className="field mb-5 col-12 md:col-3">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-phone"
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
                          <label htmlFor="input_phone">
                            {t('pages.register.phone')}
                          </label>
                        </span>
                        {getFormErrorMessage('phone')}
                      </div>
                      <div className="field mb-5 col-12 md:col-2">
                        <span className="p-float-label font-bold">
                          <Calendar
                            id="input-register-birth_date"
                            value={formik.values.birth_date}
                            onChange={(e) => {
                              formik.setFieldValue(
                                'birth_date',
                                e.target.value
                              );
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
                      <div className="col-12">
                        <div className="flex justify-content-center sm:justify-content-end py-3">
                          <div className="">
                            <Button
                              tooltip={t('save')}
                              tooltipOptions={{
                                position: 'bottom',
                                mouseTrack: true,
                                mouseTrackTop: 15,
                              }}
                              type="submit"
                              label={t('save')}
                              icon="pi pi-save"
                              severity="secondary"
                              aria-label="Guardar Cambios"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 grid-nogutter">
            <div className="shadow-3 p-3 surface-0 border-round-xl py-5 px-3">
              <form
                autoComplete="off"
                className="col-12 p-3"
                onSubmit={formikInstitution.handleSubmit}
                method="post"
              >
                <div className="grid formgrid p-fluid">
                  <div className="col-12 grid grid-nogutter p-3 border-round-xl">
                    <div className="col-12 grid px-0 mx-0">
                      <div className="col-12 mb-4">
                        <div className="flex w-full relative align-items-center justify-content-start my-3 px-4">
                          <div className="border-top-1 surface-border top-50 left-0 absolute w-full"></div>
                          <div className="px-2 z-1 surface-50 flex align-items-center">
                            <i className="pi pi-building text-900 mr-2"></i>
                            <span className="text-900 font-bold">
                              {t('pages.users.dividerClinic')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="field mb-5 col-12">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-clinic-name-organization"
                            name="name"
                            value={formikInstitution.values.name}
                            onChange={(e) => {
                              formikInstitution.setFieldValue(
                                'name',
                                e.target.value
                              );
                            }}
                            className={classNames({
                              'p-invalid':
                                isFormFieldOfInstitutionInvalid('name'),
                            })}
                            disabled={!canEdit}
                          />
                          <label htmlFor="input_institution">
                            {t('pages.register.institutionName')}
                          </label>
                        </span>
                        {getFormErrorMessageInstitution('name')}
                      </div>
                      <div className="field mb-5 col-12 md:col-10">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-street_name"
                            name="street_name"
                            autoComplete="off"
                            value={formikInstitution.values.street_name}
                            onChange={(e) => {
                              formikInstitution.setFieldValue(
                                'street_name',
                                e.target.value
                              );
                            }}
                            className={classNames({
                              'p-invalid':
                                isFormFieldOfInstitutionInvalid('street_name'),
                            })}
                            disabled={!canEdit}
                          />
                          <label htmlFor="input_street_name">
                            {t('pages.register.address')}
                          </label>
                        </span>
                        {getFormErrorMessageInstitution('street_name')}
                      </div>
                      <div className="field mb-5 col-12 md:col-2">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-street_number"
                            name="street_number"
                            autoComplete="off"
                            value={formikInstitution.values.street_number}
                            onChange={(e) => {
                              formikInstitution.setFieldValue(
                                'street_number',
                                e.target.value
                              );
                            }}
                            className={classNames({
                              'p-invalid':
                                isFormFieldOfInstitutionInvalid(
                                  'street_number'
                                ),
                            })}
                            disabled={!canEdit}
                          />
                          <label htmlFor="input_street_number">
                            {t('pages.register.number')}
                          </label>
                        </span>
                        {getFormErrorMessageInstitution('street_number')}
                      </div>
                      <div className="field mb-5 col-12 md:col-4">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-city"
                            name="city"
                            autoComplete="off"
                            value={formikInstitution.values.city}
                            onChange={(e) => {
                              formikInstitution.setFieldValue(
                                'city',
                                e.target.value
                              );
                            }}
                            className={classNames({
                              'p-invalid':
                                isFormFieldOfInstitutionInvalid('city'),
                            })}
                            disabled={!canEdit}
                          />
                          <label htmlFor="input_city">
                            {t('pages.register.city')}
                          </label>
                        </span>
                        {getFormErrorMessageInstitution('city')}
                      </div>
                      <div className="field mb-5 col-12 md:col-4">
                        <span className="p-float-label font-bold">
                          <InputText
                            id="input-register-postal_code"
                            name="postal_code"
                            autoComplete="off"
                            value={formikInstitution.values.postal_code}
                            onChange={(e) => {
                              formikInstitution.setFieldValue(
                                'postal_code',
                                e.target.value
                              );
                            }}
                            className={classNames({
                              'p-invalid':
                                isFormFieldOfInstitutionInvalid('postal_code'),
                            })}
                            disabled={!canEdit}
                          />
                          <label htmlFor="input_postal_code">
                            {t('pages.register.postalCode')}
                          </label>
                        </span>
                        {getFormErrorMessageInstitution('postal_code')}
                      </div>
                      <div className="field mb-5 col-12 md:col-4">
                        <span className="p-float-label font-bold text-left">
                          <Dropdown
                            inputId="input-register-country"
                            name="country"
                            value={formikInstitution.values.country}
                            options={COUNTRIES}
                            optionLabel={dropdownOptionLabel}
                            optionValue="iso"
                            filter
                            className={classNames({
                              'p-invalid':
                                isFormFieldOfInstitutionInvalid('country'),
                            })}
                            placeholder="Selecciona País"
                            onChange={(e) => {
                              formikInstitution.setFieldValue(
                                'country',
                                e.target.value
                              );
                            }}
                            disabled={!canEdit}
                          />
                          <label htmlFor="input_country">
                            {t('pages.register.country')}
                          </label>
                        </span>
                        {getFormErrorMessageInstitution('country')}
                      </div>
                      <div className="col-12">
                        <div className="flex justify-content-center sm:justify-content-end py-3">
                          <div className="">
                            {canEdit && (
                              <Button
                                tooltip={t('save')}
                                tooltipOptions={{
                                  position: 'bottom',
                                  mouseTrack: true,
                                  mouseTrackTop: 15,
                                }}
                                type="submit"
                                label={t('save')}
                                icon="pi pi-save"
                                severity="secondary"
                                aria-label="Guardar Cambios"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 grid-nogutter pt-4">
            <div className="surface-card border-round-xl shadow-3 py-5 px-3">
              <TabView
                activeIndex={activeIndexDevice}
                onTabChange={(e) => changeTabViewDevices(e.index)}
                className="px-0"
              >
                <TabPanel header={t('pages.devices.activatesDevices')}>
                  <TableDevicesMyProfileComponent
                    filtersDevices={activeDevices}
                  />
                </TabPanel>
                <TabPanel header={t('pages.devices.desactivatesDevices')}>
                  <TableDevicesMyProfileComponent
                    filtersDevices={inactiveDevices}
                  />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </>
      )}
      <AddDeviceToInstitution
        visible={visibleAddDevice}
        setVisible={setVisibleAddDevice}
        addDeviceToInstitutionFunction={addDeviceToInstitutionFunction}
      />
    </div>
  );
}

export default MyProfile;
