import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { TabPanel, TabView } from 'primereact/tabview';

import {
  DevicesApiFactory,
  DeviceTable,
  MyAccountApiFactory,
} from '../../../typescript-axios';
import { Context } from '../../../context/provider';
import ModalAddDevice from './components/modal-add-device/modal-add-device';
import TableDevicesComponent from './components/table-devices-component/table-devices-component';

const apiService = DevicesApiFactory();
const apiServiceAdmin = MyAccountApiFactory();

const Devices: React.FC = () => {
  const toast = useRef<Toast>(null);
  const { t } = useTranslation();
  const { access_token, role, setRole, setAdmin } = useContext(Context);
  const [devices, setDevices] = useState<DeviceTable[]>([]);
  const [filtersDevices, setFiltersDevices] = useState<DeviceTable[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();
  const [updateChanges, setUpdateChanges] = useState<boolean>(false);
  const [visibleCreateDevice, setVisibleCreateDevice] = useState(false);

  useEffect(() => {
    if (!access_token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    fetchDevices();
  }, [access_token, updateChanges]);

  useEffect(() => {
    fetchAccountData();
  }, [activeIndex]);

  const fetchDevices = async () => {
    try {
      const response = await apiService.devicesControllerFindAll();
      const data = response.data;
      setDevices(data);
      filterDevices(data, activeIndex);
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  const fetchAccountData = async () => {
    try {
      const response = await apiServiceAdmin.myAccountControllerGetData();
      const data = response.data;
      setRole(data.organization?.role);
      setAdmin(data.can_edit);
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  const filterDevices = (devices: DeviceTable[], index: number) => {
    setFiltersDevices(
      devices.filter((device) => (index === 0 ? device.active : !device.active))
    );
  };

  const createDeviceFunction = async (values: {
    serial: string;
    model: string;
    password: string;
    structure_version: string;
    o_id: string;
  }) => {
    try {
      await apiService.devicesControllerCreate(values);
      setUpdateChanges(!updateChanges);
      show('success', t('messages.success'), t('messages.success_message'));
    } catch (error) {
      const errorMessage = error.response?.data;
      if (errorMessage?.statusCode === 409) {
        show('error', t('messages.error'), t('messages.unique_serial_error'));
      } else {
        show('error', t('messages.error'), t('messages.error_message'));
      }
    }
  };

  const changeActive = async (row: DeviceTable) => {
    if (!row.d_id) return;
    try {
      await apiService.devicesControllerUpdate(
        { active: !row.active },
        row.d_id
      );
      setUpdateChanges(!updateChanges);
      show(
        'success',
        t('messages.success'),
        t('messages.device_updated_success')
      );
    } catch (error) {
      show('error', t('messages.error'), t('messages.device_updated_error'));
    }
  };

  const goToDevice = (row: DeviceTable) => {
    if (!row) return;
    navigate(`/authenticated/devices/${row.d_id}`);
  };

  const show = (
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string
  ) => {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const changeTabView = (index: number) => {
    setActiveIndex(index);
    filterDevices(devices, index);
  };

  return (
    <div className="col-12 xl:pl-7 xl:pr-7">
      <Toast ref={toast} />
      <div className="col-12">
        <ConfirmDialog />
        <div className="surface-card p-3 shadow-3 border-round-xl flex justify-content-between align-items-center mb-5">
          <div className="font-medium text-2xl text-900">
            {t('pages.devices.title')}
          </div>
          {(role === 'marsi' || role === 'maintenance') && (
            <Button
              icon="pi pi-plus"
              label={t('pages.devices.add')}
              onClick={() => setVisibleCreateDevice(true)}
              severity="secondary"
              aria-label="Add"
              tooltipOptions={{
                position: 'bottom',
                mouseTrack: true,
                mouseTrackTop: 20,
              }}
            />
          )}
        </div>
      </div>

      <div className="col-12 grid mx-0">
        <div className="surface-card border-round-xl shadow-3 py-5 px-3 col-12">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => changeTabView(e.index)}
            className="px-0"
          >
            <TabPanel header={t('pages.devices.activatesDevices')}>
              <TableDevicesComponent
                filtersDevices={filtersDevices}
                changeActive={changeActive}
                goToDevice={goToDevice}
              />
            </TabPanel>
            <TabPanel header={t('pages.devices.desactivatesDevices')}>
              <TableDevicesComponent
                filtersDevices={filtersDevices}
                changeActive={changeActive}
                goToDevice={goToDevice}
              />
            </TabPanel>
          </TabView>

          <ModalAddDevice
            visible={visibleCreateDevice}
            setVisible={setVisibleCreateDevice}
            createDeviceFunction={createDeviceFunction}
          />
        </div>
      </div>
    </div>
  );
};

export default Devices;
