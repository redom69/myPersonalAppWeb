import { useContext, useEffect, useRef, useState } from 'react';
import ModalAddClinic from '../../../components/mac/mac';
import {
  AdminApiFactory,
  MyAccountApiFactory,
} from '../../../typescript-axios';
import { useTranslation } from 'react-i18next';
import { Context } from '../../../context/provider';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'primereact/progressbar';
import { Organization } from 'apps/mypaw/src/app/models/organizationModel';

/* eslint-disable-next-line */
export interface InstitutionsProps {}

const apiService = AdminApiFactory();
const apiServiceDevices = MyAccountApiFactory();

export function Institutions(props: InstitutionsProps) {
  const toast = useRef(null);
  const navigate = useNavigate();
  const { access_token, setRole, role, setAdmin } = useContext(Context);
  const { t } = useTranslation();
  const [visibleCreateClinic, setVisibleCreateClinic] = useState(false);
  const [institutions, setInstitutions] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);

  const show = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const loadInstitutions = async () => {
    if (!access_token) return;
    try {
      const response = await apiService.adminControllerAllOrganizations();

      const institutionsData = response.data.map((institution) => ({
        id: institution.o_id,
        name: institution.name,
        premium: institution.premium,
        street_name: institution.street_name,
        street_number: institution.street_number,
        postal_code: institution.postal_code,
        country: institution.country,
        city: institution.city,
        role: institution.role,
      }));

      setInstitutions(institutionsData);
    } catch (error) {
      console.error(error);
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    loadInstitutions();
    apiServiceDevices.myAccountControllerGetData().then((response) => {
      const data = response.data;

      setRole(data.organization?.role);
      setAdmin(data.can_edit);
    });
  }, [access_token]);

  const functionCreateClinic = async (values) => {
    setLoading(true);
    try {
      console.log(values.country);

      await apiService.adminControllerCreateOrganization(values);
      await loadInstitutions();
      show('success', t('messages.success'), t('messages.success_message'));
    } catch (error) {
      console.error(error);
      show('error', t('messages.error'), t('messages.error_message'));
    } finally {
      setLoading(false);
    }
  };

  const editInstitution = (row) => {
    if (!row?.id) return;
    navigate(`/authenticated/institutions/${row.id}`);
  };

  const bodyButtonEdit = (row) => {
    if (!row) return null;
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-secondary p-button-text p-button-lg"
          onClick={() => editInstitution(row)}
          tooltip={t('pages.users.edit.edit')}
          tooltipOptions={{
            position: 'bottom',
            mouseTrack: true,
            mouseTrackTop: 15,
          }}
        />
      </div>
    );
  };

  const activePremium = async (row) => {
    if (!row?.id) return;
    try {
      await apiService.adminControllerOrganizationTogglePremium(row.id);
      const updatedInstitutions = institutions.map((institution) =>
        institution.id === row.id
          ? { ...institution, premium: !institution.premium }
          : institution
      );
      setInstitutions(updatedInstitutions);
      await loadInstitutions();
      show('success', t('messages.success'), t('messages.success_message'));
    } catch (error) {
      console.error(error);
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  return (
    <div className="col-12 xl:pl-7 xl:pr-7">
      <Toast ref={toast} />

      <div className="col-12 ">
        <div className="surface-card p-3 shadow-3 border-round-xl flex justify-content-between align-items-center mb-5">
          <div className="font-medium text-2xl text-900 p-2">
            {t('pages.institutions.title')}
          </div>
          {role === 'admin' && (
            <Button
              icon="pi pi-plus"
              label={t('pages.institutions.add')}
              onClick={() => setVisibleCreateClinic(true)}
              severity="secondary"
              aria-label="Añadir"
            />
          )}
        </div>
      </div>
      <div className="col-12 grid mx-0">
        {!loading && (
          <div className="surface-card border-round-xl shadow-3	py-5 px-3 col-12">
            <DataTable
              emptyMessage={t('emptyValuesTable')}
              value={institutions}
              paginator
              sortOrder={1}
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              size="small"
            >
              {/* Id */}
              <Column
                field="id"
                header={t('pages.institutions.table.id')}
                headerClassName="pl-3"
                sortable
                filter
                showAddButton={false}
                showFilterMatchModes={false}
                showApplyButton={false}
                showFilterMenuOptions={false}
                filterPlaceholder={t('pages.institutions.table.id')}
                style={{ width: '24rem' }}
                body={(rowData) => <div className="pl-3">{rowData.id}</div>}
              />

              {/* Nombre */}
              <Column
                header={t('pages.institutions.table.name')}
                field="name"
                sortable
                filter
                showAddButton={false}
                showFilterMatchModes={false}
                showApplyButton={false}
                showFilterMenuOptions={false}
                style={{ width: '17rem' }}
                filterPlaceholder={t('pages.institutions.table.name')}
                body={(rowData) => <div className="pl-3">{rowData.name}</div>}
              />
              {/* Premium */}
              {role === 'admin' && (
                <Column
                  header={t('pages.institutions.table.premium')}
                  field="premium"
                  style={{ width: '10rem' }}
                  body={(row) => (
                    <div className="pl-5">
                      <InputSwitch
                        checked={row.premium}
                        onChange={() => activePremium(row)}
                      />
                    </div>
                  )}
                />
              )}
              {/* Acciones */}
              <Column
                header={t('pages.users.edit.edit')}
                body={bodyButtonEdit}
                style={{ width: '5rem' }}
              />
            </DataTable>
          </div>
        )}
        {loading && (
          <div className="surface-card border-round-xl shadow-3	py-5 px-3 col-12">
            <ProgressBar
              mode="indeterminate"
              style={{ height: '6px' }}
            ></ProgressBar>
          </div>
        )}
      </div>

      <ModalAddClinic
        visible={visibleCreateClinic}
        setVisible={setVisibleCreateClinic}
        functionCreateClinic={functionCreateClinic}
      />
    </div>
  );
}

export default Institutions;
