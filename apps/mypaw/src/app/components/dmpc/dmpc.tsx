import React from 'react';
import { DataTable } from 'primereact/datatable';
import { useTranslation } from 'react-i18next';
import { Column } from 'primereact/column';
import { MyDevices } from 'apps/mypaw/src/app/typescript-axios';

interface TableDevicesMyProfileComponentProps {
  filtersDevices: MyDevices[];
}

const TableDevicesMyProfileComponent: React.FC<
  TableDevicesMyProfileComponentProps
> = ({ filtersDevices }) => {
  const { t } = useTranslation();

  const serialBodyTemplate = (rowData: MyDevices) => (
    <div className="pl-3">{rowData.serial}</div>
  );

  const modelBodyTemplate = (rowData: MyDevices) => (
    <div className="pl-3">{rowData.model}</div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const idBodyTemplate = (rowData: any) => (
    <div className="pl-3">{rowData.d_id}</div>
  );

  return (
    <DataTable
      className="pt-4"
      emptyMessage={t('emptyValuesTable')}
      value={filtersDevices}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      size="small"
      sortOrder={1}
    >
      <Column
        header={t('pages.devices.table.serial')}
        field="serial"
        sortable
        filter
        filterPlaceholder={t('pages.devices.table.serial')}
        style={{ width: '10rem' }}
        body={serialBodyTemplate}
        headerClassName="pl-3"
      />
      <Column
        header={t('pages.devices.table.model')}
        field="type"
        sortable
        filter
        filterPlaceholder={t('pages.devices.table.model')}
        style={{ width: '10rem' }}
        body={modelBodyTemplate}
      />
      <Column
        header={t('pages.devices.table.id')}
        field="id"
        sortable
        filter
        filterPlaceholder={t('pages.devices.table.id')}
        style={{ width: '20rem' }}
        body={idBodyTemplate}
      />
    </DataTable>
  );
};

export default TableDevicesMyProfileComponent;
