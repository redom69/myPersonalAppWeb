import { Dialog } from 'primereact/dialog';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useContext, useEffect, useState } from 'react';
import {
  AdminApiFactory,
  DevicesApiFactory,
} from 'apps/marsinet/src/app/typescript-axios';
import { MarsinetContext } from 'apps/marsinet/src/app/context/marsinetProvider';

const apiService = DevicesApiFactory();
const apiAdminService = AdminApiFactory();

export interface ModalAddDeviceToOrganizationProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  addDeviceToInstitutionFunction: (values: { organization_id: string }) => void;
  device_id: string;
}

interface Organization {
  o_id: string;
  name: string;
}

const ModalAddDeviceToOrganization: React.FC<
  ModalAddDeviceToOrganizationProps
> = ({ visible, setVisible, addDeviceToInstitutionFunction, device_id }) => {
  const { t } = useTranslation();
  const { access_token } = useContext(MarsinetContext);
  const [institutions, setInstitutions] = useState<Organization[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(
    null
  );

  const handleChangeSelectedDevice = (e: { value: string }) => {
    setSelectedInstitution(e.value);
  };

  const onpagehide = () => {
    setSelectedInstitution(null);
    setVisible(false);
  };

  useEffect(() => {
    const fetchInstitutions = async () => {
      if (!visible) return;

      try {
        const response =
          await apiService.devicesControllerFindAllOrganizations(device_id);
        const associatedOrgIds = new Set(
          response.data.map((org: Organization) => org.o_id)
        );

        const allOrgsResponse =
          await apiAdminService.adminControllerAllOrganizations();
        const allOrgsData = allOrgsResponse.data;

        const filteredOrganizations = allOrgsData.filter(
          (org: Organization) => !associatedOrgIds.has(org.o_id)
        );
        setInstitutions(filteredOrganizations);
      } catch (error) {
        console.error(error);
      }
    };

    if (access_token) {
      fetchInstitutions();
    }
  }, [visible, access_token, device_id]);

  const saveInstitution = () => {
    console.log('selectedInstitution', selectedInstitution);

    if (!selectedInstitution) return;
    addDeviceToInstitutionFunction({
      organization_id: selectedInstitution,
    });
    setVisible(false);
    setSelectedInstitution(null);
  };

  return (
    <Dialog
      header={t('selectInstitution')}
      visible={visible}
      className="mx-2 md:w-12 lg:w-8"
      onHide={onpagehide}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >
      <div className="grid formgrid p-fluid">
        <div className="field mb-5 col-12 py-2">
          <Dropdown
            value={selectedInstitution}
            onChange={handleChangeSelectedDevice}
            options={institutions}
            optionLabel="name"
            placeholder={t('institution')}
            optionValue="o_id"
            showClear
            filter
          />
        </div>
      </div>
      <div className="flex align-items-center justify-content-end">
        <div className="">
          <Button
            id="button-create-device"
            severity="secondary"
            icon="pi pi-save"
            label={t('save')}
            className="p-button-raised"
            onClick={saveInstitution}
            disabled={!selectedInstitution}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ModalAddDeviceToOrganization;
