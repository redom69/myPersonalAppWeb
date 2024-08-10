import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

import { Context } from 'apps/mypaw/src/app/context/provider';
import {
  AdminApiFactory,
  Organization,
} from 'apps/mypaw/src/app/typescript-axios';
import { useInstitutionValidationSchema } from 'apps/mypaw/src/app/validations';

/* eslint-disable-next-line */
export interface InstitutionProps {}

const apiService = AdminApiFactory();

export function Institution(props: InstitutionProps) {
  const toast = useRef(null);
  const { id_institution } = useParams();
  const [institution, setInstitution] = useState<Organization | null>(null);
  const { access_token } = useContext(Context);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const show = (severity: string, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({
        severity,
        summary,
        detail,
        life: 3000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      country: '',
      city: '',
      postal_code: '',
      street_name: '',
      street_number: '',
    },
    validationSchema: useInstitutionValidationSchema(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: async (data: any) => {
      try {
        await saveUpdateInstitution(data);
      } catch (error) {
        console.error('Error updating institution:', error);
      }
    },
  });

  const saveUpdateInstitution = async (data: Organization) => {
    try {
      await apiService.adminControllerUpdateOrganization(data, id_institution);
      show('success', t('messages.success'), t('messages.success_message'));
      setTimeout(() => {
        navigate('/authenticated/institutions');
      }, 700);
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  const confirmDeleteInstitution = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    confirmDialog({
      message: t('pages.institutions.messages.deleteConfirm'),
      header: t('pages.institutions.messages.deleteConfirmTitle'),
      icon: 'pi pi-info-circle',
      acceptLabel: t('yes'),
      rejectLabel: t('no'),
      acceptClassName: 'p-button-danger',
      accept: () => {
        handleDeleteInstitution(id);
      },
    });
  };

  const handleDeleteInstitution = async (id: string) => {
    try {
      await deleteInstitution(id);
    } catch (error) {
      console.error('Error deleting institution:', error);
    }
  };

  const deleteInstitution = async (id: string) => {
    try {
      await apiService.adminControllerDeleteOrganization(id);
      show(
        'success',
        t('messages.success'),
        t('pages.institutions.messages.deleteSuccess')
      );
      setTimeout(() => {
        navigate('/authenticated/institutions');
      }, 700);
    } catch (error) {
      show(
        'error',
        t('messages.error'),
        t('pages.institutions.messages.deleteError')
      );
    }
  };

  // Cargar Instituciones
  useEffect(() => {
    if (!access_token) return;

    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    const fetchInstitutionData = async () => {
      try {
        const response =
          await apiService.adminControllerFindOneOrganization(id_institution);
        const { data } = response;

        setInstitution(data);

        formik.setValues({
          name: data.name || '',
          country: data.country || '',
          city: data.city || '',
          postal_code: data.postal_code || '',
          street_name: data.street_name || '',
          street_number: data.street_number || '',
        });
      } catch (error) {
        console.error('Error fetching institution data:', error);
      }
    };

    fetchInstitutionData();
  }, [access_token, id_institution]);

  return (
    <div className="col-12 xl:pl-7 xl:pr-7">
      {institution && (
        <>
          <ConfirmDialog />
          <Toast ref={toast} />
          <div className="col-12">
            <div className="col-12 shadow-3 md:p-3 surface-card border-round-xl lg:h-full">
              <div className="p-3 flex align-items-center">
                <Button
                  icon="pi pi-angle-left"
                  rounded
                  onClick={() => navigate('/authenticated/institutions')}
                  severity="secondary"
                  className="mr-4"
                  aria-label="Bookmark"
                />
                <div className="mr-2">
                  <i className="pi pi-building text-3xl text-900"></i>
                </div>

                <div className="font-medium text-3xl text-700 ">
                  {institution.name}
                </div>
              </div>
              <form
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                className="px-3"
              >
                <div className="grid formgrid p-fluid py-2">
                  <div className="col-12 md:col-6 field mb-5 ">
                    <label className="font-bold block mb-2">
                      {t('pages.institutions.form.name')}
                    </label>
                    <InputText
                      id="input-edit-institution-name"
                      placeholder={t('pages.institutions.form.name')}
                      name="name"
                      autoComplete="off"
                      value={formik.values.name}
                      onChange={(e) =>
                        formik.setFieldValue('name', e.target.value)
                      }
                      className={classNames({
                        'p-invalid': formik.errors.name,
                      })}
                    />
                    {typeof formik.errors.name === 'string' && (
                      <div className="flex align-items-center justify-content-start mt-1 mx-2">
                        <small className="p-error">
                          *{t(formik.errors.name)}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-12 md:col-6 field mb-5 ">
                    <label className="font-bold block mb-2">
                      {t('pages.institutions.form.country')}
                    </label>
                    <InputText
                      id="input-edit-institution-country"
                      placeholder={t('pages.institutions.form.country')}
                      name="country"
                      autoComplete="off"
                      value={formik.values.country}
                      onChange={(e) =>
                        formik.setFieldValue('country', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid formgrid p-fluid py-2">
                  <div className="col-12 md:col-6 field mb-5 ">
                    <label className="font-bold block mb-2">
                      {t('pages.institutions.form.city')}
                    </label>
                    <InputText
                      id="input-edit-institution-city"
                      placeholder={t('pages.institutions.form.city')}
                      name="city"
                      autoComplete="off"
                      value={formik.values.city}
                      onChange={(e) =>
                        formik.setFieldValue('city', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-12 md:col-6 field mb-5 ">
                    <label className="font-bold block mb-2">
                      {t('pages.institutions.form.postalCode')}
                    </label>
                    <InputText
                      id="input-edit-institution-postal_code"
                      placeholder={t('pages.institutions.form.postalCode')}
                      name="postal_code"
                      autoComplete="off"
                      value={formik.values.postal_code}
                      onChange={(e) =>
                        formik.setFieldValue('postal_code', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid formgrid p-fluid py-2">
                  <div className="col-12 md:col-6 field mb-5 ">
                    <label className="font-bold block mb-2">
                      {t('pages.institutions.form.address')}
                    </label>
                    <InputText
                      id="input-edit-institution-street_name"
                      placeholder={t('pages.institutions.form.address')}
                      name="street_name"
                      autoComplete="off"
                      value={formik.values.street_name}
                      onChange={(e) =>
                        formik.setFieldValue('street_name', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-12 md:col-6 field mb-5 ">
                    <label className="font-bold block mb-2">
                      {t('pages.institutions.form.number')}
                    </label>
                    <InputText
                      id="input-edit-institution-street_number"
                      placeholder={t('pages.institutions.form.number')}
                      name="street_number"
                      autoComplete="off"
                      value={formik.values.street_number}
                      onChange={(e) =>
                        formik.setFieldValue('street_number', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="text-center  whitespace-nowrap overflow-hidden col-12  md:flex ">
                  <div className="col-12 md:col-3 ">
                    <Button
                      icon="pi pi-times"
                      label={t('deleteInsitution')}
                      severity="danger"
                      aria-label="Eliminar"
                      onClick={(e) =>
                        confirmDeleteInstitution(id_institution, e)
                      }
                    />
                  </div>
                  <div className=" mb-5 col-12 md:col-6" />
                  <div className="col-12 md:col-3 ">
                    <Button
                      label={t('save')}
                      icon="pi pi-save"
                      severity="secondary"
                      aria-label="Guardar Cambios"
                      type="submit"
                      className="mr-3 md:mr-0"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Institution;
