import {
  PatientsApiFactory,
  PatientView,
} from 'apps/mypaw/src/app/typescript-axios';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Accordion, AccordionTab } from 'primereact/accordion';
import {
  HEIGHT_METRIC_UNIT_SELECTOR,
  WEIGHT_METRIC_UNIT_SELECTOR,
} from '@mypaw/commons';
import { useTranslation } from 'react-i18next';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { MultiSelect } from 'primereact/multiselect';
import { Context } from 'apps/mypaw/src/app/context/provider';
import CustomMultiSelect from '../multi-select/custom-multi-select';

/* eslint-disable-next-line */
export interface EditPatientProps {
  patient: PatientView;
}

type Error = Record<string, string>;
const apiService = PatientsApiFactory();

export function EditPatient(props: Readonly<EditPatientProps>) {
  // Referencia para el Toast
  const toast = useRef(null);
  const { t } = useTranslation();
  const { role } = useContext(Context);

  const [editingPatient, setEditingPatient] = useState<boolean>(false);

  const navigate = useNavigate();

  // Función para mostrar Toast
  const show = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  // Función para validar Formulario
  async function validateIsFormFieldIsValid(
    data: Omit<PatientView, 'sessions'>
  ) {
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
    if (data.sex === null || data.sex === undefined) {
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

    // Revisión error Patología
    if (!data.pathology) {
      errors.pathology = 'pages.patients.formValidation.pathology';
    }

    // Revisión error Tratamiento
    if (!data.treatment) {
      errors.treatment = 'pages.patients.formValidation.treatment';
    }

    // Revisión error Nacionalidad
    if (!data.nationality.trim()) {
      errors.nationality = 'pages.patients.formValidation.nationality';
    }

    // Revisión error Ciudad
    if (!data.city.trim()) {
      errors.city = 'pages.patients.formValidation.city';
    }
    return errors;
  }

  // Formulario con los datos del paciente
  const formik = useFormik({
    initialValues: {
      affectation: props.patient?.affectation || [],
      birth_date: props.patient?.birth_date
        ? new Date(props.patient.birth_date)
        : '',
      city: props.patient?.city || '',
      height: props.patient?.height || 0,
      sex: props.patient.sex,
      legal_guardian_email_1: props.patient?.legal_guardian_email_1 || '',
      legal_guardian_email_2: props.patient?.legal_guardian_email_2 || '',
      legal_guardian_name_1: props.patient?.legal_guardian_name_1 || '',
      legal_guardian_name_2: props.patient?.legal_guardian_name_2 || '',
      name: props.patient?.name || '',
      nationality: props.patient.nationality || null,
      pathology: props.patient?.pathology || [],
      phone: props.patient?.phone || '',
      surnames: props.patient?.surnames || '',
      treatment: props.patient?.treatment || [],
      weight: props.patient?.weight || 0,
      weight_unit: props.patient?.weight_unit || 'kg',
      height_unit: props.patient?.height_unit || 'cm',
    },
    validate: async (data) => {
      return await validateIsFormFieldIsValid(data);
    },
    onSubmit: async (values) => {
      console.log({ ...values, verison: props.patient.version });

      await editPatient({ ...values, verison: props.patient.version });
    },
  });

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

  // Opciones de Sexo
  const sexOptions = [
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

  // Si hay error fomulario muestra en el header del tab que hay errores
  const getFormErrors = (fields: string[]) => {
    const errors = [];
    fields.forEach((field) => {
      if (isFormFieldInvalid(field)) {
        errors.push(field);
      }
    });
    if (errors.length > 0) {
      return (
        <div className="flex align-items-center justify-content-end">
          <small className="p-error">( *{t('errorForms')} )</small>
        </div>
      );
    } else {
      return null;
    }
  };

  // Confirmation Service para Eliminar Paciente
  const confirmDeletePatient = (patient_id: string) => {
    confirmDialog({
      message: t('pages.patients.messages.deleteConfirm'),
      header: t('pages.patients.messages.deleteConfirmTitle'),
      icon: 'pi pi-info-circle',
      acceptLabel: t('yes'),
      rejectLabel: t('no'),
      acceptClassName: 'p-button-danger',
      accept: async () => {
        await deletePatient(patient_id);
      },
    });
  };

  // Función para Eliminar Paciente
  async function deletePatient(id: string) {
    apiService
      .patientControllerRemove(id)
      .then((response) => {
        show('success', 'Success', t('pages.patients.messages.deleteSuccess'));
        setTimeout(() => {
          navigate('/authenticated/patients');
        }, 300);
      })
      .catch((error) => {
        show('error', 'Error', t('pages.patients.messages.deleteError'));
      });
  }

  // Función para editar el paciente
  const editPatient = async (data) => {
    try {
      await apiService
        .patientControllerUpdate(data, props.patient.p_id)
        .then((response) => {
          show(
            'success',
            t('messages.patient'),
            t('messages.patient_modified_success')
          );
          setTimeout(() => {
            navigate('/authenticated/patients');
          }, 300);
        });
    } catch (error) {
      show(
        'error',
        t('messages.patient'),
        t('messages.patient_modified_error')
      );
    }
  };
  //TODO : ANADIR FORMIK

  return (
    <>
      <ConfirmDialog />
      <Toast ref={toast} />
      <form onSubmit={formik.handleSubmit}>
        <div className="grid  mb-5">
          <div className="col-12 md:col-6 text-center md:text-left">
            <Button
              label={!editingPatient ? t('edit') : t('block')}
              icon={!editingPatient ? 'pi pi-pencil' : 'pi pi-lock'}
              severity="secondary"
              aria-label="Editar"
              type="button"
              onClick={() => setEditingPatient(!editingPatient)}
              disabled={role === 'maintenance'}
            />
          </div>
        </div>
        <Accordion activeIndex={0}>
          {/* Datos Paciente */}
          <AccordionTab
            header={
              <div className="flex align-items-center">
                <div className="mr-auto">
                  <i className="pi pi-user mr-2"></i>
                  <span className="vertical-align-middle">
                    {t('pages.patients.viewPatient.data')}
                  </span>
                </div>

                <div className="ml-1">
                  {getFormErrors([
                    'name',
                    'surnames',
                    'nationality',
                    'nif',
                    'phone',
                    'email',
                    'institution',
                    'birth_date',
                  ])}
                </div>
              </div>
            }
          >
            <div className="grid formgrid p-fluid">
              {/* Name - Input Text */}
              <div className="field mb-5 col-12 md:col-3">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.name')}
                </label>
                {role !== 'personal' ? (
                  <InputText
                    placeholder={t('pages.patients.form.name')}
                    name="name"
                    autoComplete="off"
                    value={formik.values.name}
                    onChange={(e) =>
                      formik.setFieldValue('name', e.target.value)
                    }
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('name'),
                    })}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">{formik.values.name}</label>
                )}
                {getFormErrorMessage('name')}
              </div>

              {/* Surnames - Input Text */}
              <div className="field mb-5 col-12 md:col-6">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.lastName')}
                </label>
                {role !== 'personal' ? (
                  <InputText
                    placeholder={t('pages.patients.form.lastName')}
                    name="surnames"
                    autoComplete="off"
                    value={formik.values.surnames}
                    onChange={(e) =>
                      formik.setFieldValue('surnames', e.target.value)
                    }
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('surnames'),
                    })}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.surnames}
                  </label>
                )}
                {getFormErrorMessage('surnames')}
              </div>

              {/* Birth Date - Date (Calendar) */}
              <div className="field mb-5 col-12 md:col-3">
                <label className="font-bold block mb-2">
                  {' '}
                  {t('pages.patients.form.birthDate')}
                </label>
                {role !== 'personal' ? (
                  <Calendar
                    showIcon
                    inputId="birth_date"
                    value={
                      typeof formik.values.birth_date === 'string'
                        ? new Date(formik.values.birth_date)
                        : formik.values.birth_date
                    }
                    onChange={(e) => {
                      formik.setFieldValue(
                        'birth_date',
                        e.value instanceof Date ? e.value : new Date(e.value)
                      );
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('birth_date'),
                    })}
                    dateFormat="dd-mm-yy"
                    minDate={new Date('1900-01-01')}
                    maxDate={new Date()}
                    showButtonBar
                    placeholder="Seleccione una fecha"
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.birth_date.toString()}
                  </label>
                )}
                {getFormErrorMessage('birth_date')}
              </div>

              {/* City - Input Text */}
              <div className="field mb-5 col-12 md:col-4">
                <label className="font-bold block mb-2">
                  {' '}
                  {t('pages.patients.form.city')}
                </label>
                {role !== 'clinic' && role !== 'particular' ? (
                  <InputText
                    placeholder={t('pages.patients.form.city')}
                    name="city"
                    autoComplete="off"
                    value={formik.values.city}
                    onChange={(e) =>
                      formik.setFieldValue('city', e.target.value)
                    }
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('city'),
                    })}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">{formik.values.city}</label>
                )}
                {getFormErrorMessage('city')}
              </div>

              {/* Nationality - Input Text */}
              <div className="field mb-5 col-12 md:col-4">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.nationality')}
                </label>
                {role !== 'personal' ? (
                  <InputText
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
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.nationality}
                  </label>
                )}

                {getFormErrorMessage('nationality')}
              </div>

              {/* Phone - Input Text */}
              <div className="field mb-5 col-12 md:col-4">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.phone')}
                </label>
                {role !== 'personal' ? (
                  <InputText
                    placeholder={t('pages.patients.form.phone')}
                    name="phone"
                    autoComplete="off"
                    value={formik.values.phone}
                    onChange={(e) =>
                      formik.setFieldValue('phone', e.target.value)
                    }
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('phone'),
                    })}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">{formik.values.phone}</label>
                )}
                {getFormErrorMessage('phone')}
              </div>

              {/* Name legal guardian 1 - Input Text */}
              <div className="field mb-5 col-12 md:col-4">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.legal_guardian_name_1')}
                </label>
                {role !== 'personal' ? (
                  <InputText
                    placeholder={t('pages.patients.form.legal_guardian_name_1')}
                    name="legal_guardian_name_1"
                    autoComplete="off"
                    value={formik.values.legal_guardian_name_1}
                    onChange={(e) =>
                      formik.setFieldValue(
                        'legal_guardian_name_1',
                        e.target.value
                      )
                    }
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('legal_guardian_name_1'),
                    })}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.legal_guardian_name_1}
                  </label>
                )}
                {getFormErrorMessage('name_legal_guardian_1')}
              </div>

              {/* Legal Guardian email 1 - Input Text */}
              <div className="field mb-5 col-12 md:col-8">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.email1')}
                </label>
                {role !== 'personal' ? (
                  <InputText
                    placeholder={t('pages.patients.form.email1')}
                    name="legal_guardian_email_1"
                    autoComplete="off"
                    value={formik.values.legal_guardian_email_1}
                    onChange={(e) =>
                      formik.setFieldValue(
                        'legal_guardian_email_1',
                        e.target.value
                      )
                    }
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('legal_guardian_email_1'),
                    })}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.legal_guardian_email_1}
                  </label>
                )}
                {getFormErrorMessage('legal_guardian_email_1')}
              </div>

              {/* Name legal guardian 2 - Input Text */}
              <div className="field mb-5 col-12 md:col-4">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.legal_guardian_name_2')}
                </label>
                {role !== 'personal' ? (
                  <InputText
                    placeholder={t('pages.patients.form.legal_guardian_name_2')}
                    name="legal_guardian_name_2"
                    autoComplete="off"
                    value={formik.values.legal_guardian_name_2}
                    onChange={(e) =>
                      formik.setFieldValue(
                        'legal_guardian_name_2',
                        e.target.value
                      )
                    }
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('legal_guardian_name_2'),
                    })}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.legal_guardian_name_2}
                  </label>
                )}
                {getFormErrorMessage('legal_guardian_name_2')}
              </div>

              {/* Legal Guardian email 2  - Input Text */}
              <div className="field mb-5 col-12 md:col-8">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.email2')}
                </label>
                {role !== 'personal' ? (
                  <InputText
                    placeholder={t('pages.patients.form.email2')}
                    name="legal_guardian_email_2"
                    autoComplete="off"
                    value={formik.values.legal_guardian_email_2}
                    onChange={(e) =>
                      formik.setFieldValue(
                        'legal_guardian_email_2',
                        e.target.value
                      )
                    }
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('legal_guardian_email_2'),
                    })}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.legal_guardian_email_2}
                  </label>
                )}
                {getFormErrorMessage('legal_guardian_email_2')}
              </div>
            </div>
          </AccordionTab>
          {/* Datos Clínicos */}
          <AccordionTab
            header={
              <div className="flex align-items-center">
                <div className="mr-auto">
                  <i className="pi pi-heart-fill mr-2"></i>
                  <span className="vertical-align-middle">
                    {t('pages.patients.viewPatient.clinicalData')}
                  </span>
                </div>
                <div className="ml-1">
                  {getFormErrors([
                    'sex',
                    'weight',
                    'height',
                    'pathology',
                    'treatment',
                  ])}
                </div>
              </div>
            }
          >
            <div className="grid formgrid p-fluid">
              {/* Sex - Dropdown */}
              <div className="field mb-5 col-12 md:col-4">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.sex')}
                </label>
                {role !== 'clinic' && role !== 'particular' ? (
                  <Dropdown
                    inputId="sex"
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
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">{formik.values.sex}</label>
                )}
                {getFormErrorMessage('sex')}
              </div>

              <div className="field mb-5 col-12 md:col-8"></div>
              {/* Weight - Input Number Decimal */}
              <div className="field mb-5 col-12 md:col-3">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.weight')} - (
                  {formik.values.weight_unit})
                </label>
                {role !== 'clinic' && role !== 'particular' ? (
                  <InputNumber
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
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">{formik.values.weight}</label>
                )}
                {getFormErrorMessage('weight')}
              </div>

              {/* Selector medida peso */}
              <div className="field mb-5 col-12 md:col-2">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.measurementSelector')}
                </label>
                {role !== 'clinic' && role !== 'particular' ? (
                  <Dropdown
                    name="weight_metric"
                    options={WEIGHT_METRIC_UNIT_SELECTOR}
                    optionLabel="name"
                    optionValue="value"
                    value={formik.values.weight_unit}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('weight_unit'),
                    })}
                    onChange={(e) => {
                      formik.setFieldValue('weight_unit', e.value);
                    }}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.weight_unit}
                  </label>
                )}
                {getFormErrorMessage('weight_unit')}
              </div>

              {/* Height - Input Number */}
              <div className="field mb-5 col-12 md:col-3">
                <label className="font-bold block mb-2">
                  {' '}
                  {t('pages.patients.form.height')} - (
                  {formik.values.height_unit})
                </label>
                {role !== 'clinic' && role !== 'particular' ? (
                  <InputNumber
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
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">{formik.values.height}</label>
                )}
                {getFormErrorMessage('height')}
              </div>

              {/* Selector medida altura */}
              <div className="field mb-5 col-12 md:col-2">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.measurementSelector')}
                </label>
                {role !== 'clinic' && role !== 'particular' ? (
                  <Dropdown
                    name="height_metric"
                    options={HEIGHT_METRIC_UNIT_SELECTOR}
                    optionLabel="name"
                    optionValue="value"
                    value={formik.values.height_unit}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('height_unit'),
                    })}
                    onChange={(e) => {
                      formik.setFieldValue('height_unit', e.target.value);
                    }}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.height_unit}
                  </label>
                )}
                {getFormErrorMessage('height_unit')}
              </div>

              {/* Pathology - Dropdown */}
              <div className="field mb-5 col-12 md:col-10">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.pathology')}
                </label>
                {role !== 'clinic' && role !== 'particular' ? (
                  <MultiSelect
                    inputId="input-edit-patient-pathology"
                    name="pathology"
                    value={formik.values.pathology}
                    options={pathologyOptions}
                    optionLabel="label"
                    optionValue="value"
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('pathology'),
                    })}
                    placeholder={t('pages.patients.form.pathology')}
                    onChange={(e) => {
                      formik.setFieldValue('pathology', e.value);
                    }}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.pathology}
                  </label>
                )}
                {getFormErrorMessage('pathology')}
              </div>

              {/* Treatment - Dropdown */}
              <div className="field mb-5 col-12 md:col-10">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.treatment')}
                </label>
                {role !== 'clinic' && role !== 'particular' ? (
                  <MultiSelect
                    inputId="input-edit-patient-treatment"
                    name="treatment"
                    value={formik.values.treatment}
                    options={treatmentOptions}
                    optionLabel="label"
                    optionValue="value"
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('treatment'),
                    })}
                    placeholder={t('pages.patients.form.treatment')}
                    onChange={(e) => {
                      formik.setFieldValue('treatment', e.target.value);
                    }}
                    disabled={!editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.treatment}
                  </label>
                )}
                {getFormErrorMessage('treatment')}
              </div>

              {/* Affectacion */}
              <div className="field mb-5 col-12 md:col-10">
                <label className="font-bold block mb-2">
                  {t('pages.patients.form.affectation')}
                </label>
                {role !== 'personal' ? (
                  <CustomMultiSelect
                    affectation={formik.values.affectation}
                    setFieldValue={formik.setFieldValue}
                    editingPatient={editingPatient}
                  />
                ) : (
                  <label className=" block mb-2">
                    {formik.values.affectation.join(', ')}
                  </label>
                )}
                {getFormErrorMessage('affectation')}
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </form>
      <div className="text-center   col-12 pt- md:flex ">
        {role !== 'clinic' && role !== 'particular' && (
          <>
            <div className="col-12 md:col-3 ">
              <Button
                icon="pi pi-times"
                label={t('deletePatient')}
                onClick={() => confirmDeletePatient(props.patient.p_id)}
                severity="danger"
                aria-label="Eliminar"
              />
            </div>
            <div className=" mb-5 col-12 md:col-6" />
            <div className=" mb-5 col-12 md:col-3">
              <Button
                disabled={!editingPatient}
                label={t('save')}
                icon="pi pi-save"
                severity="secondary"
                aria-label="Guardar Cambios"
                type="submit"
                className="mr-3 md:mr-0"
                onClick={() =>
                  editPatient({
                    ...formik.values,
                    version: props.patient.version + 1,
                  })
                }
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default EditPatient;
