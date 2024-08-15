import { DataTable } from 'primereact/datatable';
import { useTranslation } from 'react-i18next';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { useContext } from 'react';
import { Context } from 'apps/mypaw/src/app/context/provider';

interface UserRow {
  active: boolean;
  email: string;
  name: string;
  role: string;
  surnames: string;
  u_id: string;
  is_admin: boolean;
}

/* eslint-disable-next-line */
export interface TableUsersComponentProps {
  filtersUsers: UserRow[];
  changeActive: (row: UserRow) => void;
  editUserFunctionActiveModal: (row: string) => void;
}

export function TableUsersComponent(props: TableUsersComponentProps) {
  const { t } = useTranslation();
  const { admin } = useContext(Context);

  // Confirmation Service para activar o desactivar un usuario
  const confirm = (row: UserRow) => {
    const user = row.name + ' ' + row.surnames;
    const activeUser = row.active
      ? t('pages.users.table.desactivate') + ' ' + user + '?'
      : t('pages.users.table.activate') + ' ' + user + '?';
    confirmDialog({
      message: activeUser,
      header: user,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: t('yes'),
      rejectLabel: t('no'),
      rejectClassName: 'p-button-secondary',
      accept: () => props.changeActive(row),
    });
  };

  const buttonEdit = (row: UserRow) => {
    return (
      <div>
        <Button
          onClick={() => props.editUserFunctionActiveModal(row.u_id)}
          className="p-button-rounded p-button-secondary p-button-text p-button-lg"
          icon="pi pi-eye"
          tooltip={t('pages.users.details')}
          tooltipOptions={{
            position: 'bottom',
            mouseTrack: true,
            mouseTrackTop: 15,
          }}
        />
      </div>
    );
  };

  return (
    <DataTable
      className="pt-4"
      emptyMessage={t('emptyValuesTable')}
      value={props.filtersUsers}
      paginator
      sortOrder={1}
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      size="small"
    >
      {/* Nombre */}
      <Column
        header={t('pages.users.table.name')}
        field="name"
        sortable
        sortField="name"
        filter
        showAddButton={false}
        showFilterMatchModes={false}
        showApplyButton={false}
        showFilterMenuOptions={false}
        filterPlaceholder={t('pages.users.table.filters.name')}
        style={{ width: '13rem' }}
        body={(rowData) => (
          <div className="pl-3">
            {rowData.name ? rowData.name : t('noData')}
          </div>
        )}
        headerClassName="pl-3"
      />
      {/* Apellidos */}
      <Column
        header={t('pages.users.table.lastName')}
        field="surnames"
        sortable
        filter
        showAddButton={false}
        showFilterMatchModes={false}
        showApplyButton={false}
        showFilterMenuOptions={false}
        filterPlaceholder={t('pages.users.table.filters.lastName')}
        style={{ width: '14rem' }}
        body={(rowData) => (
          <div className="pl-3">
            {rowData.surnames ? rowData.surnames : t('noData')}
          </div>
        )}
      />
      <Column
        header={t('pages.users.table.filters.role')}
        field="type"
        sortable
        filter
        showAddButton={false}
        showFilterMatchModes={false}
        showApplyButton={false}
        showFilterMenuOptions={false}
        filterPlaceholder={t('pages.users.table.filters.role')}
        style={{ width: '10rem' }}
        body={(row: UserRow) => {
          return (
            <div className="pl-3">
              <span className="badge badge-pill badge-primary">
                {row.role ? row.role : t('noData')}
              </span>
            </div>
          );
        }}
      />
      <Column
        header={t('pages.users.table.institution')}
        field="organization"
        sortable
        filter
        showAddButton={false}
        showFilterMatchModes={false}
        showApplyButton={false}
        showFilterMenuOptions={false}
        filterPlaceholder={t('pages.users.table.filters.institution')}
        style={{ width: '20rem' }}
        body={(rowData) => (
          <div className="pl-3">
            {rowData.o_id ? rowData.o_id : t('noData')}
          </div>
        )}
      />
      <Column
        header={t('pages.users.table.email')}
        field="email"
        sortable
        filter
        showAddButton={false}
        showFilterMatchModes={false}
        showApplyButton={false}
        showFilterMenuOptions={false}
        filterPlaceholder={t('pages.users.table.filters.email')}
        style={{ width: '23rem' }}
        body={(rowData) => <div className="pl-3">{rowData.email}</div>}
      />
      <Column
        header={t('pages.users.table.active')}
        field="active"
        style={{ width: '10rem' }}
        body={(row: UserRow) => (
          <div className="pl-3">
            {admin && !row.is_admin && (
              <InputSwitch checked={row.active} onChange={() => confirm(row)} />
            )}
          </div>
        )}
      />
      {/* Acciones */}
      <Column
        header={t('pages.users.details')}
        body={buttonEdit}
        style={{ width: '8rem' }}
      />
    </DataTable>
  );
}

export default TableUsersComponent;
