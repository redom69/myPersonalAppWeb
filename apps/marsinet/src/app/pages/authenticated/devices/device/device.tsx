import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useFormik } from 'formik';

import {
  DevicesApiFactory,
  MyAccountApiFactory,
  Organization,
} from 'apps/marsinet/src/app/typescript-axios';
import { MarsinetContext } from 'apps/marsinet/src/app/context/marsinetProvider';
import ModalAddDeviceToOrganization from './components/modal-add-device-to-organization/modal-add-device-to-organization';
import { useDeviceValidationSchema } from 'apps/marsinet/src/app/validations';

interface Device {
  d_id?: string;
  model: string;
  active?: boolean;
  serial: string;
  structure_version: string;
  password: string;
}

const apiService = DevicesApiFactory();
const apiServiceAdmin = MyAccountApiFactory();

const DeviceComponent: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { device_id } = useParams<{ device_id: string }>();
  const { access_token, role, setRole, setAdmin } = useContext(MarsinetContext);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [device, setDevice] = useState<Device | null>(null);
  const [updateChanges, setUpdateChanges] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [institutions, setInstitutions] = useState<Organization[] | null>(null);

  const toast = useRef<Toast>(null);

  const show = (
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string
  ) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  const formik = useFormik({
    initialValues: {
      serial: '',
      model: '',
      password: '',
      structure_version: '',
    },
    validationSchema: useDeviceValidationSchema(),
    onSubmit: async (data) => {
      await saveUpdateDevice(data);
    },
  });

  const saveUpdateDevice = async (data: Device) => {
    try {
      await apiService.devicesControllerUpdateDevice(data, device.d_id);
      setUpdateChanges(!updateChanges);
      show('success', t('messages.success'), t('messages.success_message'));
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  const addDeviceToInstitutionFunction = async (values: {
    organization_id: string;
  }) => {
    try {
      console.log('values', values);
      console.log(device.serial);

      await apiService.devicesControllerAddDeviceToOrganization(
        device.serial,
        values.organization_id
      );
      setUpdateChanges(!updateChanges);
      show('success', t('messages.success'), t('messages.success_message'));
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiService.devicesControllerRemoveDeviceFromOrganization(
        device_id,
        id
      );
      setUpdateChanges(!updateChanges);
      show('success', t('messages.success'), t('messages.success_message'));
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  useEffect(() => {
    const fetchDeviceData = async () => {
      setLoading(true);
      if (!access_token || !device_id) return;

      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      try {
        const [deviceResponse, accountResponse, organizationsResponse] =
          await Promise.all([
            apiService.devicesControllerFindOne(device_id),
            apiServiceAdmin.myAccountControllerGetData(),
            apiService.devicesControllerFindAllOrganizations(device_id),
          ]);

        const data_device: Device = deviceResponse.data;
        setDevice(data_device);
        formik.setValues({
          serial: data_device.serial,
          model: data_device.model,
          structure_version: data_device.structure_version,
          password: data_device.password,
        });

        const accountData = accountResponse.data;
        setRole(accountData.organization?.role);
        setAdmin(accountData.can_edit);

        const organizationsData: Organization[] = organizationsResponse.data;
        setInstitutions(organizationsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, [access_token, device_id, updateChanges]);

  const handleDeleteDevice = async () => {
    try {
      await apiService.devicesControllerRemove(device.d_id);
      setUpdateChanges(!updateChanges);
      show('success', t('messages.success'), t('messages.success_message'));
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }

    navigate('/authenticated/devices');
  };

  return (
    <div className="col-12 xl:pl-7 xl:pr-7">
      {device && (
        <>
          <Toast ref={toast} />
          <div className="col-12 ">
            <div className="col-12 shadow-3 md:p-3 surface-card border-round-xl lg:h-full">
              <div className="p-3 flex align-items-center">
                <Button
                  icon="pi pi-angle-left"
                  rounded
                  onClick={() => navigate('/authenticated/devices')}
                  severity="secondary"
                  className="mr-4"
                  aria-label="Bookmark"
                />
                <div className="mr-2">
                  <img
                    src="/assets/robot.svg"
                    alt="exo"
                    style={{ width: '35px' }}
                  />
                </div>
                <div className="font-medium text-2xl text-700 ">
                  {device.serial}
                </div>
              </div>
              <TabView
                className="pt-5"
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              >
                <TabPanel header={t('pages.devices.devicePage.tabInfo')}>
                  {loading ? (
                    <div className="text-center py-6">
                      <ProgressBar
                        mode="indeterminate"
                        style={{ height: '6px' }}
                      ></ProgressBar>
                    </div>
                  ) : (
                    <>
                      <form
                        autoComplete="off"
                        onSubmit={formik.handleSubmit}
                        className=""
                      >
                        <div className="grid formgrid p-fluid py-5">
                          <div className="col-12 md:col-6 field mb-5 ">
                            <label className="font-bold block mb-2">
                              {t('pages.devices.num_serial')}
                              {role !== 'marsi' && `: ${device.serial}`}
                            </label>
                            {role === 'marsi' && (
                              <InputText
                                id="input-edit-device-serial"
                                placeholder={t('pages.devices.num_serial')}
                                name="serial"
                                autoComplete="off"
                                value={formik.values.serial}
                                onChange={(e) =>
                                  formik.setFieldValue('serial', e.target.value)
                                }
                                className={classNames({
                                  'p-invalid': formik.errors.serial,
                                })}
                              />
                            )}
                            {formik.errors.serial && (
                              <div className="flex align-items-center justify-content-start mt-1 mx-2">
                                <small className="p-error">
                                  *{t(formik.errors.serial)}
                                </small>
                              </div>
                            )}
                          </div>
                          <div className="col-12 md:col-6 field mb-5 ">
                            <label className="font-bold block mb-2">
                              {t('pages.devices.type_device')}
                              {role !== 'marsi' && `: ${device.model}`}
                            </label>
                            {role === 'marsi' && (
                              <InputText
                                id="input-edit-device-type"
                                placeholder={t('pages.devices.type_device')}
                                name="model"
                                autoComplete="off"
                                value={formik.values.model}
                                onChange={(e) =>
                                  formik.setFieldValue('model', e.target.value)
                                }
                                className={classNames({
                                  'p-invalid': formik.errors.model,
                                })}
                              />
                            )}
                            {formik.errors.model && (
                              <div className="flex align-items-center justify-content-start mt-1 mx-2">
                                <small className="p-error">
                                  *{t(formik.errors.model)}
                                </small>
                              </div>
                            )}
                          </div>
                          <div className="col-12 md:col-6 field mb-5 ">
                            <label className="font-bold block mb-2">
                              {t('pages.devices.password')}
                            </label>
                            {role === 'marsi' && (
                              <InputText
                                id="input-edit-device-password"
                                placeholder={t('pages.devices.password')}
                                name="password"
                                autoComplete="off"
                                value={formik.values.password}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    'password',
                                    e.target.value
                                  )
                                }
                                className={classNames({
                                  'p-invalid': formik.errors.password,
                                })}
                              />
                            )}
                            {formik.errors.password && (
                              <div className="flex align-items-center justify-content-start mt-1 mx-2">
                                <small className="p-error">
                                  *{t(formik.errors.password)}
                                </small>
                              </div>
                            )}
                          </div>
                          <div className="col-12 md:col-6 field mb-5 ">
                            <label className="font-bold block mb-2">
                              {t('pages.devices.structure_version')}
                              {role !== 'marsi' &&
                                `: ${device.structure_version}`}
                            </label>
                            {role === 'marsi' && (
                              <InputText
                                id="input-edit-device-structure_version"
                                placeholder={t(
                                  'pages.devices.structure_version'
                                )}
                                name="structure_version"
                                autoComplete="off"
                                value={formik.values.structure_version}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    'structure_version',
                                    e.target.value
                                  )
                                }
                                className={classNames({
                                  'p-invalid': formik.errors.structure_version,
                                })}
                              />
                            )}
                            {formik.errors.structure_version && (
                              <div className="flex align-items-center justify-content-start mt-1 mx-2">
                                <small className="p-error">
                                  *{t(formik.errors.structure_version)}
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
                      <div className="col-12 mb-4 ">
                        <div className="flex w-full relative align-items-center justify-content-center my-3 px-4">
                          <div className="border-top-1 surface-border top-50 left-0 absolute w-full"></div>
                          <div className="px-2 z-1 surface-50 flex align-items-center">
                            <i className="pi pi-building text-900 mr-2"></i>
                            <span className="text-900 font-bold">
                              {t('institution')}
                            </span>
                          </div>
                        </div>
                      </div>
                      {institutions?.length === 0 ? (
                        <div className="text-center text-2xl font-bold text-600 mb-4 py-5 surface-ground border-2 border-dashed border-round-2xl">
                          {t('pages.devices.devicePage.notInstitution')}
                        </div>
                      ) : (
                        <div>
                          {institutions?.map((institution) => (
                            <div
                              key={institution.o_id}
                              className="flex items-center text-2xl font-bold text-600 mb-4 py-5 surface-ground border-2 border-dashed border-round-2xl px-5"
                            >
                              <span className="flex-1 px-5 text-center">
                                {institution.name}
                              </span>
                              <Button
                                icon="pi pi-trash"
                                className="p-button-rounded p-button-danger p-button-text p-button-lg mr-4"
                                onClick={() => handleDelete(institution.o_id)}
                                tooltip={t('deleteInstitution')}
                                tooltipOptions={{
                                  position: 'bottom',
                                  mouseTrack: true,
                                  mouseTrackTop: 15,
                                }}
                                aria-label="Delete"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="text-center ">
                        <Button
                          id="button-add-device-to-institution"
                          type="button"
                          label={t('pages.devices.devicePage.institution')}
                          className="p-button-raised"
                          onClick={() => setVisible(true)}
                          visible={role === 'marsi'}
                        ></Button>
                      </div>
                      <div className="text-center col-12 pt- md:flex">
                        <div className="col-12 md:col-3 ">
                          <Button
                            icon="pi pi-times"
                            label={t('deleteDevice')}
                            onClick={handleDeleteDevice}
                            severity="danger"
                            aria-label="Eliminar"
                            visible={role === 'marsi'}
                          />
                        </div>
                        <div className="mb-5 col-12 md:col-6" />
                        <div className="mb-5 col-12 md:col-3">
                          <Button
                            id="button-create-device"
                            severity="secondary"
                            icon="pi pi-save"
                            label={t('save')}
                            onClick={formik.submitForm}
                            className="p-button-raised"
                            type="submit"
                            visible={role === 'marsi'}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </TabPanel>
              </TabView>
            </div>
          </div>
        </>
      )}
      <ModalAddDeviceToOrganization
        visible={visible}
        setVisible={setVisible}
        addDeviceToInstitutionFunction={addDeviceToInstitutionFunction}
        device_id={device_id}
      />
    </div>
  );
};

export default DeviceComponent;
