export const mockContextValue = {
  isLogged: true, // Valor mock para el estado de autenticación
  setIsLogged: jest.fn(), // Mock de la función para cambiar el estado de autenticación
  access_token: 'fake_access_token', // Token de acceso mock
  setAccessToken: jest.fn(), // Mock de la función para cambiar el token de acceso
  languageContext: 'en', // Contexto de idioma mock
  setLanguageContext: jest.fn(), // Mock de la función para cambiar el contexto de idioma
  refresh_token: 'fake_refresh_token', // Token de refresco mock
  setRefreshToken: jest.fn(), // Mock de la función para cambiar el token de refresco
  role: 'admin', // Rol mock
  setRole: jest.fn(), // Mock de la función para cambiar el rol
  type: 'user', // Tipo mock
  setType: jest.fn(), // Mock de la función para cambiar el tipo
  // Agrega mocks para cualquier otra propiedad que tu contexto necesite
};
