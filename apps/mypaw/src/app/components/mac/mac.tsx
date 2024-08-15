import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { environment } from 'apps/mypaw/src/environments/environment';
import { useCreateInstitutionValidationSchema } from 'apps/mypaw/src/app/validations/createInstitutionValidationSchema';
import { COUNTRIES, ROLES } from '@mypaw/commons';

export interface ModalAddClinicProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  functionCreateClinic: (values: any) => void;
}

const ModalAddClinic: React.FC<ModalAddClinicProps> = ({
  visible,
  setVisible,
  functionCreateClinic,
}) => {
  const { t, i18n } = useTranslation();

  const dropdownOptionLabel = i18n.language === 'es' ? 'nombre' : 'name';

  const formik = useFormik({
    initialValues: environment.newClinicForm,
    validationSchema: useCreateInstitutionValidationSchema(),
    onSubmit: (values) => {
      try {
        functionCreateClinic(values);
        formik.resetForm();
        setVisible(false);
      } catch (error) {
        console.error('Error', error);
      }
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

  const canCreate = () => !formik.isValid;

  return (
    <Dialog
      header={t('pages.institutions.add')}
      visible={visible}
      className="mx-2 md:w-12 lg:w-8"
      onHide={() => setVisible(false)}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="grid formgrid p-fluid">
          <Divider
            icon="pi pi-building"
            text={t('pages.users.dividerClinic')}
          />

          <Field
            id="input-register-clinic-name-organization"
            name="name_organization"
            label={t('pages.users.nameOrganization')}
            formik={formik}
            className={classNames({
              'p-invalid': isFormFieldInvalid('name_organization'),
            })}
            getFormErrorMessage={getFormErrorMessage}
          />

          <Divider icon="pi pi-home" text={t('pages.users.dividerAddress')} />

          <Field
            id="input-register-street_name"
            name="street_name"
            label={t('pages.users.streetName')}
            formik={formik}
            className={classNames({
              'p-invalid': isFormFieldInvalid('street_name'),
            })}
            getFormErrorMessage={getFormErrorMessage}
          />

          <Field
            id="input-register-street_number"
            name="street_number"
            label={t('pages.users.streetNumber')}
            formik={formik}
            className={classNames({
              'p-invalid': isFormFieldInvalid('street_number'),
            })}
            getFormErrorMessage={getFormErrorMessage}
          />

          <Field
            id="input-register-city"
            name="city"
            label={t('pages.users.city')}
            formik={formik}
            className={classNames({ 'p-invalid': isFormFieldInvalid('city') })}
            getFormErrorMessage={getFormErrorMessage}
          />

          <Field
            id="input_street_state"
            name="state"
            label={t('pages.users.state')}
            formik={formik}
            className={classNames({ 'p-invalid': isFormFieldInvalid('state') })}
            getFormErrorMessage={getFormErrorMessage}
          />

          <Field
            id="input-register-postal_code"
            name="postal_code"
            label={t('pages.users.postalCode')}
            formik={formik}
            className={classNames({
              'p-invalid': isFormFieldInvalid('postal_code'),
            })}
            getFormErrorMessage={getFormErrorMessage}
          />

          <DropdownField
            id="input-register-country"
            name="country"
            label={t('pages.register.country')}
            formik={formik}
            options={COUNTRIES}
            dropdownOptionLabel={dropdownOptionLabel}
            getFormErrorMessage={getFormErrorMessage}
            className={''}
          />

          <DropdownField
            id="input-register-role"
            name="role"
            label={t('pages.register.role')}
            formik={formik}
            options={ROLES}
            dropdownOptionLabel={dropdownOptionLabel}
            getFormErrorMessage={getFormErrorMessage}
            className={''}
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
            disabled={canCreate()}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default ModalAddClinic;

const Divider: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="col-12 mb-4">
    <div className="flex w-full relative align-items-center justify-content-start my-3 px-4">
      <div className="border-top-1 surface-border top-50 left-0 absolute w-full"></div>
      <div className="px-2 z-1 surface-0 flex align-items-center">
        <i className={`${icon} text-900 mr-2`}></i>
        <span className="text-900 font-bold">{text}</span>
      </div>
    </div>
  </div>
);

interface FieldProps {
  id: string;
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  className: string;
  getFormErrorMessage: (name: string) => JSX.Element | null;
}

const Field: React.FC<FieldProps> = ({
  id,
  name,
  label,
  formik,
  className,
  getFormErrorMessage,
}) => (
  <div className="field mb-5 col-12">
    <span className="p-float-label font-bold">
      <InputText
        onBlur={formik.handleBlur}
        id={id}
        name={name}
        value={formik.values[name]}
        onChange={(e) => formik.setFieldValue(name, e.target.value)}
        className={className}
      />
      <label htmlFor={id}>{label}</label>
    </span>
    {getFormErrorMessage(name)}
  </div>
);

interface DropdownFieldProps extends FieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  dropdownOptionLabel: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  id,
  name,
  label,
  formik,
  options,
  dropdownOptionLabel,
  getFormErrorMessage,
}) => (
  <div className="field mb-5 col-12">
    <span className="p-float-label font-bold text-left">
      <Dropdown
        inputId={id}
        name={name}
        value={formik.values[name]}
        options={options}
        onBlur={formik.handleBlur}
        optionLabel={dropdownOptionLabel}
        optionValue={name === 'role' ? 'value' : 'iso'}
        filter
        className={classNames({
          'p-invalid': formik.touched[name] && formik.errors[name],
        })}
        placeholder={label}
        onChange={(e) => formik.setFieldValue(name, e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </span>
    {getFormErrorMessage(name)}
  </div>
);
