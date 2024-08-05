import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { useAddDeviceValidationSchema } from 'apps/marsinet/src/app/validations/addDeviceValidationSchema';

export interface ModalAddDeviceProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  createDeviceFunction: (values: {
    serial: string;
    model: string;
    password: string;
    structure_version: string;
    o_id: string;
  }) => void;
}

const FormField: React.FC<{
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  errorMessage: string | null;
  className?: string;
}> = ({
  id,
  label,
  name,
  value,
  placeholder,
  onBlur,
  onChange,
  isInvalid,
  errorMessage,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`field mb-5 ${className}`}>
      <label className="font-bold block mb-2">{t(label)}</label>
      <InputText
        id={id}
        placeholder={t(placeholder)}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={classNames({ 'p-invalid': isInvalid })}
      />
      {isInvalid && (
        <div className="flex align-items-center justify-content-start mt-1 mx-2">
          <small className="p-error">*{t(errorMessage)}</small>
        </div>
      )}
    </div>
  );
};

const ModalAddDevice: React.FC<ModalAddDeviceProps> = ({
  visible,
  setVisible,
  createDeviceFunction,
}) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      model: '',
      serial: '',
      structure_version: '',
      password: '',
      o_id: '',
    },
    validationSchema: useAddDeviceValidationSchema(),
    onSubmit: (values) => {
      createDeviceFunction(values);
      formik.resetForm();
      setVisible(false);
    },
  });

  const onPageHide = () => {
    formik.resetForm();
    setVisible(false);
  };

  const isFormFieldInvalid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) =>
    isFormFieldInvalid(name) ? formik.errors[name] : null;

  const canCreate = () => {
    const valuesChanged =
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values);
    return valuesChanged && formik.isValid;
  };

  return (
    <Dialog
      header={t('pages.devices.add')}
      visible={visible}
      className="mx-2 md:w-12 lg:w-8"
      onHide={onPageHide}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="grid formgrid p-fluid">
          <FormField
            id="input-create-device-model"
            label="pages.devices.model"
            name="model"
            value={formik.values.model}
            placeholder="pages.devices.model"
            onBlur={formik.handleBlur}
            onChange={(e) => formik.setFieldValue('model', e.target.value)}
            isInvalid={isFormFieldInvalid('model')}
            errorMessage={getFormErrorMessage('model')}
            className="col-12 md:col-6"
          />
          <FormField
            id="input-create-device-serial"
            label="pages.devices.num_serial"
            name="serial"
            value={formik.values.serial}
            placeholder="pages.devices.num_serial"
            onBlur={formik.handleBlur}
            onChange={(e) => formik.setFieldValue('serial', e.target.value)}
            isInvalid={isFormFieldInvalid('serial')}
            errorMessage={getFormErrorMessage('serial')}
            className="col-12 md:col-6"
          />
          <FormField
            id="input-create-device-password"
            label="pages.devices.password"
            name="password"
            value={formik.values.password}
            placeholder="pages.devices.password"
            onBlur={formik.handleBlur}
            onChange={(e) => formik.setFieldValue('password', e.target.value)}
            isInvalid={isFormFieldInvalid('password')}
            errorMessage={getFormErrorMessage('password')}
            className="col-12 md:col-6"
          />
          <FormField
            id="input-create-device-structure_version"
            label="pages.devices.structure_version"
            name="structure_version"
            value={formik.values.structure_version}
            placeholder="pages.devices.structure_version"
            onBlur={formik.handleBlur}
            onChange={(e) =>
              formik.setFieldValue('structure_version', e.target.value)
            }
            isInvalid={isFormFieldInvalid('structure_version')}
            errorMessage={getFormErrorMessage('structure_version')}
            className="col-12 md:col-6"
          />
          <FormField
            id="input-create-device-o_id"
            label="pages.devices.o_id"
            name="o_id"
            value={formik.values.o_id}
            placeholder="pages.devices.o_id"
            onBlur={formik.handleBlur}
            onChange={(e) => formik.setFieldValue('o_id', e.target.value)}
            isInvalid={isFormFieldInvalid('o_id')}
            errorMessage={getFormErrorMessage('o_id')}
            className="col-12 md:col-12"
          />
        </div>
        <div className="flex align-items-center justify-content-end">
          <Button
            id="button-create-device"
            severity="secondary"
            icon="pi pi-save"
            label={t('save')}
            className="p-button-raised"
            type="submit"
            disabled={!canCreate()}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default ModalAddDevice;
