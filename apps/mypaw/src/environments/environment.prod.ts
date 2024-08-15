export const LOCAL_STORAGE_TOKEN = 'at';
export const LOCAL_STORAGE_REFRESH_TOKEN = 'rt';
export const VERSION = '0.0.1';

export const environment = {
  production: true,
  loginForm: {
    username: '',
    password: '',
  },
  registerForm: {
    email: '',
    password: '',
    name: '',
    surnames: '',
    phone: '',
    birth_date: null,
    nationality: '',
    organization_id: '',
  },
  resetPasswordForm: {
    password: '',
    confirmPassword: '',
  },
  newPatientForm: {
    name: '',
    surnames: '',
    institution: '',
    birth_date: null,
    sex: '',
    weight: null,
    height: null,
    pathology: '',
    treatment: '',
    nationality: '',
    nif: '',
    phone: '',
    email: '',
    street_name: '',
    street_number: '',
    postal_code: '',
    country: '',
    state: '',
    city: '',
    legal_guardian: false,
    years: '',
    name_legal_guardian: '',
  },
  newClinicForm: {
    name_organization: '',
    street_name: '',
    street_number: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    role: '',
  },
};
