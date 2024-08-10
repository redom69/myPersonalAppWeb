export const LOCAL_STORAGE_TOKEN = 'at';
export const LOCAL_STORAGE_REFRESH_TOKEN = 'rt';

export const VERSION = '2.1.1';

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3334',
  // apiBaseUrl: 'https://api.develop.marsinet.com',
  loginForm: {
    username: 'administracion@marsinet.com',
    password: 'MarsiMola2023',
  },
  registerForm: {
    email: 'email-ayuda.test@marsinet.com',
    password: 'Mola2020',
    name: 'Damian',
    surnames: 'Romero',
    phone: '987654321',
    birth_date: new Date('2023-05-07T22:00:00.000Z'),
    nationality: 'ESPAÑOLA',
    organization_id: '62f18ac7-2fef-4ae2-99fc-337bd321a30c',
  },
  resetPasswordForm: {
    password: 'MarsiMola2023',
    confirmPassword: 'MarsiMola2023',
  },
  newPatientForm: {
    name: 'Damian',
    surnames: 'Romero',
    institution: 'Prueba',
    birth_date: new Date('2023-06-21T22:00:00.000Z'),
    sex: 'M',
    weight: 10,
    height: 170,
    pathology: 'Patologia',
    treatment: 'Tratamiento',
    nationality: 'ESPAÑOLA',
    nif: '1234567890',
    phone: '9876543',
    email: 'd.romero@alicunde.com',
    street_name: 'Direccion de pruebas',
    street_number: '1',
    postal_code: '11111',
    country: 'ES',
    state: 'SEVILLA',
    city: 'SEVILLA',
    legal_guardian: false,
    years: '8 días',
    name_legal_guardian: 'Nombre del tutor',
    institutions: [],
    total_session: 0,
    last_session: null,
    total_steps: 0,
  },
  newClinicForm: {
    name_organization: 'Organizacion de pruebas',
    street_name: 'Sevilla',
    street_number: '25',
    city: 'Marchena',
    state: 'Sevilla',
    postal_code: '41620',
    country: 'ES',
    role: 'clinic',
  },
};