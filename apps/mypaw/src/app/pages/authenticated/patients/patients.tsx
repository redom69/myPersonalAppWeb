import './patients.module.scss';

import { useContext, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
  MyAccountApiFactory,
  PatientsApiFactory,
  PatientTable,
} from 'apps/mypaw/src/app/typescript-axios';
import { Calendar } from 'primereact/calendar';
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import { Context } from '../../../context/provider';
import axios from 'axios';
import { Button } from 'primereact/button';

const apiService = PatientsApiFactory();
const apiServiceAdmin = MyAccountApiFactory();

/* eslint-disable-next-line */
export interface PatientsProps {}

export function Patients(props: PatientsProps) {
  const { access_token, role, setRole, setAdmin } = useContext(Context);
  // Función para Navegar
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const initialFilters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    surnames: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    total_steps: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    total_session: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    last_session: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  };
  const [filters, setFilters] = useState(initialFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [patients, setPatients] = useState<PatientTable[]>([]);

  // Función para Ver Paciente
  async function editPatient(id: string) {
    navigate(`/authenticated/patients/${id}`);
  }

  const goToClient = (row) => {
    if (!row) return;
    editPatient(row.p_id);
  };

  // Carga de pacientes
  useEffect(() => {
    if (!access_token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    try {
      apiService
        .patientControllerFindAll()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          const sortedPatients = [...response.data].sort((a, b) => {
            // Primero, ordena por nombre
            const nameComparison = a.name.localeCompare(b.name);
            if (nameComparison !== 0) {
              return nameComparison;
            }
            return (
              new Date(b.last_session).getTime() -
              new Date(a.last_session).getTime()
            );
          });
          sortedPatients.forEach((patient) => {
            patient.last_session = patient.last_session
              ? new Date(patient.last_session)
              : null;
          });

          setPatients(sortedPatients);
          apiServiceAdmin.myAccountControllerGetData().then((response) => {
            const data = response.data;

            setRole(data.organization?.role);
            setAdmin(data.can_edit);
          });
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
  }, [access_token]);

  const dateFilterTemplate = (options) => {
    const locale = i18n.language === 'en' ? 'mm-dd-yy' : 'dd-mm-yy';
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value)}
        dateFormat={locale}
        placeholder={t('pages.patients.table.lastSession')}
        mask="99/99/9999"
      />
    );
  };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-start">
        <div className="p-inputgroup">
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder={t('pages.patients.table.filter')}
            className="w-full border-1"
          />
          <Button icon="pi pi-search" />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="col-12 xl:pl-7 xl:pr-7">
      <div className="col-12 ">
        <div className="surface-card p-3 shadow-3 border-round-xl flex justify-content-between align-items-center mb-5">
          <div className="font-medium text-2xl text-900 p-2">
            {t('pages.patients.title')}
          </div>
        </div>
      </div>
      <div className="col-12 grid mx-0">
        <div className="surface-card border-round-xl shadow-3	py-5 px-3 col-12">
          {/* Tabla de Pacientes */}
          <DataTable
            emptyMessage={t('emptyValuesTable')}
            selectionMode="single"
            value={patients}
            onSelectionChange={(e) => goToClient(e.value)}
            paginator
            sortOrder={1}
            rows={25}
            rowsPerPageOptions={[5, 10, 25, 50]}
            header={header}
            filters={filters}
            globalFilterFields={[
              'name',
              'surnames',
              'total_steps',
              'total_session',
              'last_session',
            ]}
            size="small"
          >
            {/* Nombre */}
            <Column
              header={t('pages.patients.table.name')}
              field="name"
              sortable
              sortField="name"
              showAddButton={false}
              showFilterMatchModes={false}
              showApplyButton={false}
              showFilterMenuOptions={false}
              filterPlaceholder={t('pages.patients.table.filters.name')}
              body={(rowData) => <div className="pl-3">{rowData.name}</div>}
              headerClassName="pl-3"
            />

            {/* Apellidos */}
            <Column
              header={t('pages.patients.table.lastName')}
              field="surnames"
              sortable
              showAddButton={false}
              showFilterMatchModes={false}
              showApplyButton={false}
              showFilterMenuOptions={false}
              filterPlaceholder={t('pages.patients.table.filters.lastName')}
              body={(rowData) => <div className="pl-3">{rowData.surnames}</div>}
            />
            {/* Institución */}
            {role === 'admin' && (
              <Column
                header={t('pages.patients.table.institutions')}
                field="institutions"
                showAddButton={false}
                showFilterMatchModes={false}
                showApplyButton={false}
                showFilterMenuOptions={false}
                body={(rowData) => (
                  <div className="pl-3">{rowData.institutions.join(', ')}</div>
                )}
              />
            )}

            {/* Total Pasos */}
            <Column
              header={t('pages.patients.table.total_steps')}
              field="total_steps"
              showAddButton={false}
              body={(rowData) => (
                <div className="pl-5">{rowData.total_steps}</div>
              )}
            />
            {/* Sesiones */}
            <Column
              header={t('pages.patients.table.sessions')}
              field="total_session"
              showAddButton={false}
              showFilterMatchModes={false}
              showApplyButton={false}
              showFilterMenuOptions={false}
              filterPlaceholder={t('pages.patients.table.filters.sessions')}
              body={(rowData) => (
                <div className="pl-5">{rowData.total_session}</div>
              )}
            />
            {/* Última sesión */}
            <Column
              header={t('pages.patients.table.lastSession')}
              filterField="last_session"
              dataType="date"
              style={{ width: '14rem' }}
              body={(rowData) => (
                <div className="pl-5">
                  {new Date(rowData.last_session).toLocaleDateString()}
                </div>
              )}
              filterElement={dateFilterTemplate}
              filter
              sortable
              showAddButton={false}
              showFilterMenuOptions={false}
              sortField="last_session"
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default Patients;
