import { useFormik } from 'formik';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { environment } from 'apps/mypaw/src/environments/environment';
import { COUNTRIES } from '@mypaw/commons';
import { Checkbox } from 'primereact/checkbox';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface CreatePatientProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  createPatientFunction: (values) => void;
}

type Error = Record<string, string | boolean>;

export function CreatePatient(props: CreatePatientProps) {
  const { t, i18n } = useTranslation();

  const dropdownOptionLabel = i18n.language === 'es' ? 'nombre' : 'name';

  // Validar si los campos del formulario son correctos
  async function validateIsFormFieldIsValid(data) {
    const errors: Error = {};

    // Revisión error Nombre
    if (!data.name.trim()) {
      errors.name = 'pages.patients.formValidation.name';
    }

    // Revisión error Apellidos
    if (!data.surnames.trim()) {
      errors.surnames = 'pages.patients.formValidation.lastName';
    }

    // Revisión error Fecha de Nacimiento
    if (data.birth_date === null) {
      errors.birth_date = 'pages.patients.formValidation.birthDate';
    }

    // Revisión Error Sex
    if (data.sex === null || data.sex === '' || data.sex === undefined) {
      errors.sex = 'pages.patients.formValidation.sex';
    }

    // Revisión Error Weight
    if (data.weight === null) {
      errors.weight = 'pages.patients.formValidation.weight';
    } else if (data.weight < 0) {
      errors.weight = 'pages.patients.formValidation.weightMin';
    }

    // Revisión Error Height
    if (data.height === null) {
      errors.height = 'pages.patients.formValidation.height';
    } else if (data.height < 0) {
      errors.height = 'pages.patients.formValidation.heightMin';
    }

    // Asigna edad del paciente en años, meses o días
    if (data.birth_date) {
      data.years = calculateAge(data.birth_date);
    }

    // Revisión error Patología
    if (!data.pathology.trim()) {
      errors.pathology = 'pages.patients.formValidation.pathology';
    }

    // Revisión error Tratamiento
    if (!data.treatment.trim()) {
      errors.treatment = 'pages.patients.formValidation.treatment';
    }

    // Revisión error Nacionalidad
    if (!data.nationality.trim()) {
      errors.nationality = 'pages.patients.formValidation.nationality';
    }

    // Si es mayor de edad, DNI es obligatorio
    if (
      data.birth_date <
      new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    ) {
      if (!data.nif.trim()) {
        errors.nif = 'pages.patients.formValidation.nif';
      } else if (data.nif) {
        errors.nif = await testDNI(data.nif, errors.nif);
      }
    }

    // Revisión error Calle
    if (!data.street_name.trim()) {
      errors.street_name = 'pages.patients.formValidation.address';
    }

    // Revisión error Número
    if (!data.street_number.trim()) {
      errors.street_n = 'pages.patients.formValidation.number';
    } else if (!data.street_number.trim().match(/^[0-9]+$/)) {
      errors.street_number = 'pages.patients.formValidation.numberInvalid';
    }

    // Revisión error Código Postal
    if (!data.postal_code.trim()) {
      errors.postal_code = 'pages.patients.formValidation.postalCode';
    } else if (!data.postal_code.trim().match(/^[0-9]+$/)) {
      errors.postal_code = 'pages.patients.formValidation.postalCodeInvalid';
    } else if (data.postal_code.trim().length < 5) {
      errors.postal_code = 'pages.patients.formValidation.postalCodeMinLength';
    } else if (data.postal_code.trim().length > 5) {
      errors.postal_code = 'pages.patients.formValidation.postalCodeMaxLength';
    }

    // Revisión error País
    if (!data.country.trim()) {
      errors.country = 'pages.patients.formValidation.country';
    }

    // Revisión error Provincia
    if (!data.state.trim()) {
      errors.state = 'pages.patients.formValidation.province';
    }

    // Revisión error Ciudad
    if (!data.city.trim()) {
      errors.city = 'pages.patients.formValidation.city';
    }

    return errors;
  }

  // Formulario para Crear Paciente
  const formik = useFormik({
    initialValues: environment.newPatientForm,
    validate: async (data) => {
      return await validateIsFormFieldIsValid(data);
    },
    onSubmit: async (values) => {
      await props.createPatientFunction(values);
      props.setVisible(false);
      formik.resetForm();
    },
  });

  // Opciones de Sexo
  const sexOptions = [
    { label: t('pages.patients.form.sexOptions'), value: null },
    { label: t('pages.patients.form.sexOptionMale'), value: 'M' },
    { label: t('pages.patients.form.sexOptionFemale'), value: 'F' },
  ];

  // Opciones de Patología estas son mis patologias
  const pathologyOptions = [
    {
      label: t('pages.patients.form.pathologies.cerebralPalsy1'),
      value: 'cerebralPalsy1',
    },
    {
      label: t('pages.patients.form.pathologies.cerebralPalsy2'),
      value: 'cerebralPalsy2',
    },
    {
      label: t('pages.patients.form.pathologies.cerebralPalsy3'),
      value: 'cerebralPalsy3',
    },
    {
      label: t('pages.patients.form.pathologies.cerebralPalsy4'),
      value: 'cerebralPalsy4',
    },
    {
      label: t('pages.patients.form.pathologies.cerebralPalsy5'),
      value: 'cerebralPalsy5',
    },
    { label: t('pages.patients.form.pathologies.ame1'), value: 'ame1' },
    { label: t('pages.patients.form.pathologies.ame2'), value: 'ame2' },
    { label: t('pages.patients.form.pathologies.ame3'), value: 'ame3' },
    {
      label: t('pages.patients.form.pathologies.medularInjury'),
      value: 'medularInjury',
    },
    {
      label: t('pages.patients.form.pathologies.geneticSynrome'),
      value: 'geneticSynrome',
    },
    { label: t('pages.patients.form.pathologies.other'), value: 'other' },
    { label: t('pages.patients.form.pathologies.duchenne'), value: 'duchenne' },
    { label: t('pages.patients.form.pathologies.myopathy'), value: 'myopathy' },
    { label: t('pages.patients.form.pathologies.rett'), value: 'rett' },
    { label: t('pages.patients.form.pathologies.angelman'), value: 'angelman' },
  ];

  // Opciones de Tratamientotreatments
  const treatmentOptions = [
    {
      label: t('pages.patients.form.treatments.occupationalTherapy'),
      value: 'occupationalTherapy',
    },
    {
      label: t('pages.patients.form.treatments.hidrotherapy'),
      value: 'hidrotherapy',
    },
    {
      label: t('pages.patients.form.treatments.rehabilitation'),
      value: 'rehabilitation',
    },
    {
      label: t('pages.patients.form.treatments.strech'),
      value: 'strech',
    },
    {
      label: t('pages.patients.form.treatments.hipotherapy'),
      value: 'hipotherapy',
    },
  ];

  // Comprobar si el campo es válido
  const isFormFieldInvalid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

  // Obtener mensaje de error del campo
  const getFormErrorMessage = (name: string) => {
    return isFormFieldInvalid(name) ? (
      <div className="flex align-items-center justify-content-start mt-1 mx-2">
        <small className="p-error">*{t(formik.errors[name])}</small>
      </div>
    ) : null;
  };

  // Calcular Edad ( Años, Meses o Días)
  const calculateAge = (birthday: Date): string => {
    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - birthday.getTime();
    const ageDate = new Date(ageInMilliseconds);

    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    const formatTimeUnit = (value: number, unit: string): string => {
      if (value === 1) {
        return `${value} ${unit}`;
      }
      return `${value} ${unit}s`;
    };

    if (years === 0 && months === 0) {
      return formatTimeUnit(days, 'día');
    } else if (years === 0) {
      return formatTimeUnit(months, 'mes');
    } else {
      return formatTimeUnit(years, 'año');
    }
  };

  // Comprobar DNI válido
  const checkDNI = async (dni: string): Promise<boolean> => {
    const regex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    const letterValues = 'TRWAGMYFPDXBNJZSQVHLCKET';

    if (!regex.test(dni)) {
      return false;
    }

    // extract letter and number
    const dniLetter = dni.charAt(dni.length - 1).toUpperCase();
    const dniNumber = parseInt(dni.substr(0, dni.length - 1), 10);

    const letterIndex = dniNumber % 23;
    const expectedLetter = letterValues.charAt(letterIndex);

    return expectedLetter === dniLetter;
  };

  // Test DNI válido
  const testDNI = async (dni: string, error: boolean | string) => {
    if (!dni) {
      return false;
    }

    const isValid = await checkDNI(dni);

    if (!isValid) {
      return (error = 'pages.patients.formValidation.dniInvalid');
    }

    return;
  };

  return (
    <Dialog
      header={t('pages.patients.form.title')}
      visible={props.visible}
      className="mx-2 md:w-12 lg:w-8"
      onHide={() => {
        props.setVisible(false);
        formik.resetForm();
      }}
    >
      {/* Formulario */}
      <form className="col-12" onSubmit={formik.handleSubmit}>
        <div className="grid formgrid p-fluid">
          {/* Name - Input Text */}
          <div className="field mb-5 col-12 md:col-6">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.name')}
            </label>
            <InputText
              id="input-create-patient-name"
              placeholder={t('pages.patients.form.name')}
              name="name"
              autoComplete="off"
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue('name', e.target.value)}
              className={classNames({
                'p-invalid': isFormFieldInvalid('name'),
              })}
            />
            {getFormErrorMessage('name')}
          </div>

          {/* Surnames - Input Text */}
          <div className="field mb-5 col-12 md:col-6">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.lastName')}
            </label>
            <InputText
              id="input-create-patient-surnames"
              placeholder={t('pages.patients.form.lastName')}
              name="surnames"
              autoComplete="off"
              value={formik.values.surnames}
              onChange={(e) => formik.setFieldValue('surnames', e.target.value)}
              className={classNames({
                'p-invalid': isFormFieldInvalid('surnames'),
              })}
            />

            {getFormErrorMessage('surnames')}
          </div>

          {/* Institution - Input Text */}
          <div className="field mb-5 col-12 md:col-4">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.institution')}
            </label>
            <InputText
              id="input-create-patient-institution"
              placeholder={t('pages.patients.form.institution')}
              name="institution"
              autoComplete="off"
              value={formik.values.institution}
              onChange={(e) =>
                formik.setFieldValue('institution', e.target.value)
              }
              className={classNames({
                'p-invalid': isFormFieldInvalid('institution'),
              })}
            />
            {getFormErrorMessage('institution')}
          </div>

          {/* Birth Date - Date (Calendar) */}
          <div className="field mb-5 col-12 md:col-4">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.birthDate')}
            </label>
            <Calendar
              id="input-create-patient-birth-date"
              showIcon
              value={formik.values.birth_date}
              onChange={(e) => {
                formik.setFieldValue('birth_date', e.target.value);
              }}
              className={classNames({
                'p-invalid': isFormFieldInvalid('birth_date'),
              })}
              dateFormat="dd-mm-yy"
              minDate={new Date('1900-01-01')}
              maxDate={new Date()}
              showButtonBar
              placeholder={t('pages.patients.form.birthDate')}
            />
            {getFormErrorMessage('birth_date')}
          </div>

          {/* Years Old */}
          {/* <div className="field mb-5 col-12 md:col-2">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.yearsOld')}
            </label>
            <InputText
              id="input-create-patient-years-old"
              placeholder={t('pages.patients.form.yearsOld')}
              name="years_old"
              autoComplete="off"
              value={
                formik.values.birth_date
                  ? calculateAge(formik.values.birth_date)
                  : ''
              }
              onChange={(e) =>
                formik.setFieldValue('years_old', e.target.value)
              }
              className={classNames({
                'p-invalid': isFormFieldInvalid('years_old'),
              })}
              disabled
            />
          </div> */}
          {/* CHECKBOX  SI ES MENOR DE EDAD TUTOR LEGAL CHECKED*/}
          {/* Tutor Legal */}
          <div className="field mb-5 col-12 md:col-4">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.legalGuardian')}
            </label>
            <Checkbox
              checked={formik.values.legal_guardian}
              onChange={(e) => {
                formik.setFieldValue('legal_guardian', e.checked);
              }}
            ></Checkbox>
          </div>

          {/* Nombre del Tutotr legal si Checkbox es TRUE */}
          {formik.values.legal_guardian && (
            <div className="field mb-5 col-12">
              <label className="font-bold block mb-2">
                {t('pages.patients.form.nameLegalGuardian')}
              </label>
              <InputText
                id="input-create-patient-name-legal-guardian"
                placeholder={t(
                  'pages.patients.form.placeHolderNameLegalGuardian'
                )}
                name="name_legal_guardian"
                autoComplete="off"
                value={formik.values.name_legal_guardian}
                onChange={(e) =>
                  formik.setFieldValue('name_legal_guardian', e.target.value)
                }
                className={classNames({
                  'p-invalid': isFormFieldInvalid('name_legal_guardian'),
                })}
              />
              {getFormErrorMessage('name_legal_guardian')}
            </div>
          )}

          {/* Sex - Dropdown */}
          <div className="field mb-5 col-12 md:col-4">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.sex')}
            </label>
            <Dropdown
              id="input-create-patient-sex"
              name="sex"
              value={formik.values.sex}
              options={sexOptions}
              optionLabel="label"
              className={classNames({
                'p-invalid': isFormFieldInvalid('sex'),
              })}
              placeholder={t('pages.patients.form.sex')}
              onChange={(e) => {
                formik.setFieldValue('sex', e.value);
              }}
            />
            {getFormErrorMessage('sex')}
          </div>

          {/* Weight - Input Number Decimal */}
          <div className="field mb-5 col-12 md:col-4">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.weight')} - (kg)
            </label>
            <InputNumber
              id="input-create-patient-weight"
              name="weight"
              value={formik.values.weight}
              onChange={(e) => {
                formik.setFieldValue('weight', e.value);
              }}
              className={classNames({
                'p-invalid': isFormFieldInvalid('weight'),
              })}
              minFractionDigits={2}
              maxFractionDigits={5}
              showButtons
              placeholder={t('pages.patients.form.weight')}
            />
            {getFormErrorMessage('weight')}
          </div>

          {/* Height - Input Number */}
          <div className="field mb-5 col-12 md:col-4">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.height')} - (cm)
            </label>
            <InputNumber
              id="input-create-patient-height"
              name="height"
              value={formik.values.height}
              onChange={(e) => {
                formik.setFieldValue('height', e.value);
              }}
              className={classNames({
                'p-invalid': isFormFieldInvalid('height'),
              })}
              showButtons
              placeholder={t('pages.patients.form.height')}
            />
            {getFormErrorMessage('height')}
          </div>

          {/* Pathology - Dropdown */}
          <div className="field mb-5 col-12">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.pathology')}
            </label>
            <Dropdown
              inputId="input-edit-patient-pathology"
              name="pathology"
              value={formik.values.pathology}
              options={pathologyOptions}
              optionLabel="label"
              optionValue="value"
              filter
              className={classNames({
                'p-invalid': isFormFieldInvalid('pathology'),
              })}
              placeholder={t('pages.patients.form.pathology')}
              onChange={(e) => {
                formik.setFieldValue('pathology', e.target.value);
              }}
            />
            {getFormErrorMessage('pathology')}
          </div>

          {/* Treatment - TextArea */}
          <div className="field mb-5 col-12">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.treatment')}
            </label>
            <Dropdown
              inputId="input-edit-patient-treatment"
              name="treatment"
              value={formik.values.treatment}
              options={treatmentOptions}
              optionLabel="label"
              optionValue="value"
              filter
              className={classNames({
                'p-invalid': isFormFieldInvalid('treatment'),
              })}
              placeholder={t('pages.patients.form.treatment')}
              onChange={(e) => {
                formik.setFieldValue('treatment', e.target.value);
              }}
            />
            {getFormErrorMessage('treatment')}
          </div>

          {/* Nationality - Input Text */}
          <div className="field mb-5 col-12 md:col-6">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.nationality')}
            </label>
            <InputText
              id="input-create-patient-nationality"
              placeholder={t('pages.patients.form.nationality')}
              name="nationality"
              autoComplete="off"
              value={formik.values.nationality}
              onChange={(e) =>
                formik.setFieldValue('nationality', e.target.value)
              }
              className={classNames({
                'p-invalid': isFormFieldInvalid('nationality'),
              })}
            />

            {getFormErrorMessage('nationality')}
          </div>

          {/* Patient Dni - Input Text */}
          <div className="field mb-5 col-12 md:col-6">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.nif')}
            </label>
            <InputText
              id="input-create-patient-nif"
              placeholder={t('pages.patients.form.nif')}
              name="nif"
              autoComplete="off"
              value={formik.values.nif}
              onChange={(e) => formik.setFieldValue('nif', e.target.value)}
              className={classNames({
                'p-invalid': isFormFieldInvalid('nif'),
              })}
            />

            {getFormErrorMessage('nif')}
          </div>

          {/* Phone - Input Text */}
          <div className="field mb-5 col-12 md:col-3">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.phone')}
            </label>
            <InputText
              id="input-create-patient-phone"
              placeholder={t('pages.patients.form.phone')}
              name="phone"
              autoComplete="off"
              value={formik.values.phone}
              onChange={(e) => formik.setFieldValue('phone', e.target.value)}
              className={classNames({
                'p-invalid': isFormFieldInvalid('phone'),
              })}
            />

            {getFormErrorMessage('phone')}
          </div>
          {/* Email - Input Text */}
          <div className="field mb-5 col-12 md:col-9">
            <label className="font-bold block mb-2">
              {t('pages.register.email')}
            </label>
            <InputText
              id="input-create-patient-email"
              placeholder={t('pages.register.email')}
              name="email"
              autoComplete="off"
              value={formik.values.email}
              onChange={(e) => formik.setFieldValue('email', e.target.value)}
              className={classNames({
                'p-invalid': isFormFieldInvalid('email'),
              })}
            />

            {getFormErrorMessage('email')}
          </div>
          {/* Street Name - Input Text */}
          <div className="field mb-5 col-12 md:col-8">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.address')}
            </label>
            <InputText
              id="input-create-patient-street_name"
              placeholder={t('pages.patients.form.address')}
              name="street_name"
              autoComplete="off"
              value={formik.values.street_name}
              onChange={(e) =>
                formik.setFieldValue('street_name', e.target.value)
              }
              className={classNames({
                'p-invalid': isFormFieldInvalid('street_name'),
              })}
            />

            {getFormErrorMessage('street_name')}
          </div>

          {/* Street Number - Input Text */}
          <div className="field mb-5 col-12 md:col-2">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.number')}
            </label>
            <InputText
              id="input-create-patient-street_number"
              placeholder={t('pages.patients.form.number')}
              name="street_number"
              autoComplete="off"
              value={formik.values.street_number}
              onChange={(e) =>
                formik.setFieldValue('street_number', e.target.value)
              }
              className={classNames({
                'p-invalid': isFormFieldInvalid('street_number'),
              })}
            />

            {getFormErrorMessage('street_number')}
          </div>

          {/* Postal Code - Input Text */}
          <div className="field mb-5 col-12 md:col-2">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.postalCode')}
            </label>
            <InputText
              id="input-create-patient-postal_code"
              placeholder={t('pages.patients.form.postalCode')}
              name="postal_code"
              autoComplete="off"
              value={formik.values.postal_code}
              onChange={(e) =>
                formik.setFieldValue('postal_code', e.target.value)
              }
              className={classNames({
                'p-invalid': isFormFieldInvalid('postal_code'),
              })}
            />

            {getFormErrorMessage('postal_code')}
          </div>

          {/* Country - Input Text */}
          <div className="field mb-5 col-12 md:col-4">
            <label className="font-bold block mb-2 text-left">
              {t('pages.patients.form.country')}
            </label>
            <Dropdown
              inputId="input-create-patient-country"
              name="country"
              value={formik.values.country}
              options={COUNTRIES}
              optionLabel={dropdownOptionLabel}
              optionValue="iso"
              filter
              className={classNames({
                'p-invalid': isFormFieldInvalid('country'),
              })}
              placeholder={t('pages.patients.form.country')}
              onChange={(e) => {
                formik.setFieldValue('country', e.target.value);
              }}
            />
            {getFormErrorMessage('country')}
          </div>

          {/* State - Input Text */}
          <div className="field mb-5 col-12 md:col-4">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.province')}
            </label>
            <InputText
              id="input-create-patient-state"
              placeholder={t('pages.patients.form.province')}
              name="state"
              autoComplete="off"
              value={formik.values.state}
              onChange={(e) => formik.setFieldValue('state', e.target.value)}
              className={classNames({
                'p-invalid': isFormFieldInvalid('state'),
              })}
            />

            {getFormErrorMessage('state')}
          </div>

          {/* City - Input Text */}
          <div className="field mb-5 col-12 md:col-4">
            <label className="font-bold block mb-2">
              {t('pages.patients.form.city')}
            </label>
            <InputText
              id="input-create-patient-city"
              placeholder={t('pages.patients.form.city')}
              name="city"
              autoComplete="off"
              value={formik.values.city}
              onChange={(e) => formik.setFieldValue('city', e.target.value)}
              className={classNames({
                'p-invalid': isFormFieldInvalid('city'),
              })}
            />

            {getFormErrorMessage('city')}
          </div>
        </div>
        {/* Botón enviar */}
        <div className="flex align-items-center justify-content-end">
          <div className="">
            <Button
              id="button-create-patient-submit"
              severity="secondary"
              icon="pi pi-save"
              label={t('save')}
              className="p-button-raised"
              type="submit"
              // disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
            ></Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}

export default CreatePatient;
