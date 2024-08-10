import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import { useContext, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';

import { Context } from 'apps/mypaw/src/app/context/provider';
import { useEditUserValidationSchema } from 'apps/mypaw/src/app/validations';
import { AdminApiFactory } from 'apps/mypaw/src/app/typescript-axios';

/* eslint-disable-next-line */
export interface ModalEditUserProps {
  visible: boolean;
  userEdit: string;
  setVisible: (visible: boolean) => void;
  loadUsers: () => void;
}

const apiServiceUser = AdminApiFactory();

export function ModalEditUser({
  visible,
  userEdit,
  setVisible,
  loadUsers,
}: Readonly<ModalEditUserProps>) {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const { role } = useContext(Context);

  const showToast = (
    severity: 'success' | 'error',
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

  const formik = useFormik({
    initialValues: {
      name: '',
      surnames: '',
      phone: '',
      birth_date: '',
      nationality: '',
    },
    validationSchema: useEditUserValidationSchema(),
    onSubmit: async (values) => {
      await handleEditUser(values);
    },
  });

  const isFormFieldInvalid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) =>
    isFormFieldInvalid(name) ? (
      <div className="flex align-items-center justify-content-start mt-1 mx-2">
        <small className="p-error">*{t(formik.errors[name] as string)}</small>
      </div>
    ) : null;

  const fetchUserData = async () => {
    if (!userEdit) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any =
        await apiServiceUser.adminControllerFindOneUser(userEdit);
      const userData = response.data.user_data || {};

      formik.setValues({
        name: userData.name || '',
        surnames: userData.surnames || '',
        phone: userData.phone || '',
        birth_date: userData.birth_date ? userData.birth_date : '',
        nationality: userData.nationality || '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleHideDialog = () => {
    setVisible(false);
  };

  const canEdit = () =>
    formik.initialValues === formik.values ||
    (formik.errors && !formik.isValid);

  const handleEditUser = async (values) => {
    try {
      await apiServiceUser.adminControllerUpdateUserData(values, userEdit);
      loadUsers();
      showToast(
        'success',
        t('messages.success'),
        t('messages.user_updated_success')
      );
      formik.resetForm();
      setVisible(false);
    } catch (error) {
      showToast('error', t('messages.error'), t('messages.error_message'));
    }
  };

  const confirmDeleteUser = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    confirmDialog({
      message: t('pages.users.messages.deleteConfirm'),
      header: t('pages.users.messages.deleteConfirmTitle'),
      icon: 'pi pi-info-circle',
      acceptLabel: t('yes'),
      rejectLabel: t('no'),
      acceptClassName: 'p-button-danger',
      accept: () => {
        handleDeleteUser(id);
      },
    });
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await apiServiceUser.adminControllerDeleteUser(id);
      showToast(
        'success',
        t('messages.success'),
        t('pages.users.messages.deleteSuccess')
      );
      setVisible(false);
      loadUsers();
    } catch (error) {
      showToast(
        'error',
        t('messages.error'),
        t('pages.users.messages.deleteError')
      );
    }
  };

  useEffect(() => {
    if (visible) {
      fetchUserData();
    }
  }, [visible]);

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={t('pages.users.createUser.data')}
        visible={visible}
        className="mx-2 md:w-12 lg:w-8"
        onHide={handleHideDialog}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <div className="grid formgrid p-fluid pt-4">
            <div className="field mb-5 col-12 md:col-6">
              <span className="p-float-label font-bold">
                <InputText
                  id="input-add-user-name"
                  name="name"
                  autoComplete="off"
                  onBlur={formik.handleBlur}
                  placeholder={t('pages.register.name')}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('name'),
                  })}
                />
                <label htmlFor="input_name">{t('pages.register.name')}</label>
              </span>
              {getFormErrorMessage('name')}
            </div>
            <div className="field mb-5 col-12 md:col-6">
              <span className="p-float-label font-bold">
                <InputText
                  id="input-add-user-surnames"
                  name="surnames"
                  autoComplete="off"
                  onBlur={formik.handleBlur}
                  placeholder={t('pages.register.surnames')}
                  value={formik.values.surnames}
                  onChange={formik.handleChange}
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
            <div className="field mb-5 col-12 md:col-4">
              <span className="p-float-label font-bold">
                <InputText
                  id="input-add-user-phone"
                  name="phone"
                  autoComplete="off"
                  onBlur={formik.handleBlur}
                  placeholder={t('pages.register.phone')}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('phone'),
                  })}
                />
                <label htmlFor="input_phone">{t('pages.register.phone')}</label>
              </span>
              {getFormErrorMessage('phone')}
            </div>
            <div className="field mb-5 col-12 md:col-5">
              <span className="p-float-label font-bold">
                <Calendar
                  id="input-add-user-birth_date"
                  value={
                    formik.values.birth_date
                      ? new Date(formik.values.birth_date)
                      : undefined
                  }
                  placeholder={t('pages.register.birthDate')}
                  onChange={(e) => formik.setFieldValue('birth_date', e.value)}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('birth_date'),
                  })}
                  dateFormat="dd-mm-yy"
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
            <div className="field mb-5 col-12 md:col-3">
              <span className="p-float-label font-bold">
                <InputText
                  id="input-add-user-nationality"
                  name="nationality"
                  autoComplete="off"
                  onBlur={formik.handleBlur}
                  placeholder={t('pages.register.nationality')}
                  value={formik.values.nationality}
                  onChange={formik.handleChange}
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
          </div>
          <div className="text-center whitespace-nowrap overflow-hidden col-12 md:flex">
            {role === 'admin' && (
              <div className="col-12 md:col-3">
                <Button
                  type="button"
                  icon="pi pi-times"
                  label={t('deletePatient')}
                  onClick={(e) => confirmDeleteUser(userEdit, e)}
                  className="p-button-danger"
                  aria-label="Eliminar"
                />
              </div>
            )}
            <div className="mb-5 col-12 md:col-6" />
            <div className="mb-5 col-12 md:col-3">
              <Button
                id="button-create-device"
                severity="secondary"
                icon="pi pi-save"
                label={t('save')}
                className="p-button-raised"
                type="submit"
                disabled={canEdit()}
              />
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default ModalEditUser;
