import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';

import { Context } from 'apps/mypaw/src/app/context/provider';
import {
  DeviceTable,
  MyAccountApiFactory,
} from 'apps/mypaw/src/app/typescript-axios';

const apiServiceAccount = MyAccountApiFactory();

interface TableDevicesComponentProps {
  filtersDevices: DeviceTable[];
  changeActive: (row: DeviceTable) => void;
  goToDevice: (row: DeviceTable) => void;
}

const TableDevicesComponent: React.FC<TableDevicesComponentProps> = ({
  filtersDevices,
  changeActive,
  goToDevice,
}) => {
  const { t } = useTranslation();
  const { access_token, role, setRole, setAdmin } = useContext(Context);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!access_token) return;
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      try {
        const response = await apiServiceAccount.myAccountControllerGetData();
        const data = response.data;
        setRole(data?.organization?.role);
        setAdmin(data?.can_edit);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccountData();
  }, [access_token, setAdmin, setRole]);

  const confirm = (row: DeviceTable) => {
    const message = row.active
      ? t('pages.devices.desactivate')
      : t('pages.devices.activate');
    const header = row.active
      ? t('pages.devices.desactivateHeader')
      : t('pages.devices.activateHeader');
    confirmDialog({
      message,
      header,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: t('yes'),
      rejectLabel: t('no'),
      rejectClassName: 'p-button-secondary',
      accept: () => changeActive(row),
    });
  };

  const serialBodyTemplate = (rowData: DeviceTable) => (
    <div className="pl-3">{rowData.serial}</div>
  );

  const modelBodyTemplate = (rowData: DeviceTable) => (
    <div className="pl-3">{rowData.model}</div>
  );

  const idBodyTemplate = (rowData: DeviceTable) => (
    <div className="pl-3">{rowData.d_id}</div>
  );

  const activeBodyTemplate = (row: DeviceTable) => (
    <div className="pl-3">
      <InputSwitch checked={row.active} onChange={() => confirm(row)} />
    </div>
  );

  const detailsBodyTemplate = (row: DeviceTable) => (
    <div className="pl-2">
      <Button
        rounded
        icon="pi pi-eye"
        className="p-button-rounded p-button-secondary p-button-text p-button-lg"
        onClick={() => goToDevice(row)}
        aria-label={t('pages.alarms.details')}
        tooltip={t('pages.alarms.details')}
        tooltipOptions={{
          position: 'bottom',
          mouseTrack: true,
          mouseTrackTop: 15,
        }}
      />
    </div>
  );

  return (
    <DataTable
      className="pt-4"
      emptyMessage={t('emptyValuesTable')}
      value={filtersDevices}
      paginator
      sortOrder={1}
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      size="small"
    >
      <Column
        header={t('pages.devices.table.serial')}
        field="serial"
        sortable
        filter
        filterPlaceholder={t('pages.devices.table.serial')}
        style={{ width: '8rem' }}
        body={serialBodyTemplate}
        headerClassName="pl-3"
      />
      <Column
        header={t('pages.devices.table.model')}
        field="model"
        sortable
        filter
        filterPlaceholder={t('pages.devices.table.model')}
        style={{ width: '7rem' }}
        body={modelBodyTemplate}
      />
      <Column
        header={t('pages.devices.table.id')}
        field="d_id"
        sortable
        filter
        filterPlaceholder={t('pages.devices.table.id')}
        style={{ width: '20rem' }}
        body={idBodyTemplate}
      />
      {(role === 'admin' || role === 'maintenance') && (
        <Column
          header={t('pages.devices.table.active')}
          field="active"
          style={{ width: '8rem' }}
          body={activeBodyTemplate}
        />
      )}
      <Column
        header={t('pages.alarms.details')}
        style={{ width: '8rem' }}
        body={detailsBodyTemplate}
      />
    </DataTable>
  );
};

export default TableDevicesComponent;
