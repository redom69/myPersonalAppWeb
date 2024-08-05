import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

import { useAddDeviceToInstitutionValidationSchema } from 'apps/marsinet/src/app/validations/addDeviceToInstitutionValidationSchema';

export interface AddDeviceToInstitutionProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  addDeviceToInstitutionFunction: (values: { code: string }) => void;
}

export function AddDeviceToInstitution({
  visible,
  setVisible,
  addDeviceToInstitutionFunction,
}: Readonly<AddDeviceToInstitutionProps>) {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: useAddDeviceToInstitutionValidationSchema(),
    onSubmit: (values) => {
      addDeviceToInstitutionFunction(values);
      formik.resetForm();
      setVisible(false);
    },
  });

  const onpagehide = () => {
    formik.resetForm();
    setVisible(false);
  };

  const isFormFieldInvalid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) =>
    isFormFieldInvalid(name) ? (
      <div className="flex align-items-center justify-content-start mt-1 mx-2">
        <small className="p-error">*{t(formik.errors[name])}</small>
      </div>
    ) : null;

  return (
    <Dialog
      header={t('pages.devices.add')}
      visible={visible}
      className="mx-2 md:w-12 lg:w-8"
      onHide={onpagehide}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="grid formgrid p-fluid">
          <div className="field mb-5 col-12">
            <label
              htmlFor="input-add-device-intitution-code"
              className="font-bold block mb-2"
            >
              {t('pages.devices.code')}
            </label>
            <InputText
              id="input-add-device-intitution-code"
              placeholder={t('pages.devices.code')}
              name="code"
              autoComplete="off"
              value={formik.values.code}
              onChange={(e) => formik.setFieldValue('code', e.target.value)}
              className={classNames({
                'p-invalid': isFormFieldInvalid('code'),
              })}
            />
            {getFormErrorMessage('code')}
          </div>
        </div>
        <div className="flex align-items-center justify-content-end">
          <Button
            id="button-create-device"
            severity="secondary"
            icon="pi pi-save"
            label={t('save')}
            className="p-button-raised"
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
}

export default AddDeviceToInstitution;
