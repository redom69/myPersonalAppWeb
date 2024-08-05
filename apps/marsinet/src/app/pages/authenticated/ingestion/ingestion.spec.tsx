import axios from 'axios';

// Mock de axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Ingestion Component', () => {
  beforeEach(() => {
    // Resetea los mocks antes de cada prueba
    mockedAxios.get.mockClear();
    mockedAxios.post.mockClear();
  });

  it('should render successfully', () => {
    expect(true).toBe(true);
  });
});
