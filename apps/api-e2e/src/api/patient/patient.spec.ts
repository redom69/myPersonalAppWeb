import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PatientModule } from '../../../../api/src/app/patient/patient.module'; // Asegúrate de ajustar la ruta al módulo de tu aplicación
import { AuthenticatedGuard } from '../../../../api/src/app/guards/authenticated.guard';

const patients = [
  {
    id: '8bee35b5-3e89-41fc-a7df-f7de85ea4fd5',
    name: 'a',
    surnames: 'a',
    last_session: null,
    total_session: 0,
    total_steps: 0,
  },
  {
    id: 'e4edf1ee-d924-4a4d-b788-9a457afad90c',
    name: 'Juan',
    surnames: 'Pérez Martinez',
    last_session: null,
    total_session: 0,
    total_steps: 0,
  },
  {
    id: 'c7f13a22-86b8-4dcf-b54e-e596dc133781',
    name: 'Juan',
    surnames: 'Pérez Martinez',
    last_session: null,
    total_session: 0,
    total_steps: 0,
  },
  {
    id: '2f9c6a54-8e50-4f08-9286-b3a058057d3a',
    name: 'Juan',
    surnames: 'Pérez Martinez',
    last_session: null,
    total_session: 0,
    total_steps: 0,
  },
];

describe('PatientModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PatientModule],
    })
      .overrideGuard(AuthenticatedGuard) // Asegúrate de que este sea el guardia correcto
      .useValue({ canActivate: () => true }) // Forzar el acceso permitido
      .compile();

    app = moduleRef.createNestApplication();

    // Middleware para simular request.user
    app.use((req, _, next) => {
      req.user = {
        role: 'admin_marsinet',
        id: 'some-user-id', // Simula el usuario como parte de la solicitud
        // Agrega cualquier otra propiedad necesaria
      };
      next();
    });

    await app.init();
  });

  it('/patient list(GET)', async () => {
    await request(app.getHttpServer())
      .get('/patient')
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(patients);
      });
  });

  it('/patient/:id (GET) - obtener datos de un paciente específico', async () => {
    const patientId = 'e4edf1ee-d924-4a4d-b788-9a457afad90c';

    // Simula un usuario con rol de admin_marsinet si es necesario para esta prueba
    // Esto se haría en el middleware que has configurado en tu aplicación de prueba

    await request(app.getHttpServer())
      .get(`/patient/${patientId}`)
      .expect(200)
      .expect((response) => {
        // Verifica que la respuesta contenga los datos esperados del paciente
        // Esto depende de cómo estés estructurando los datos de respuesta en tu aplicación
        expect(response.body.id).toEqual(patientId);
        // Añade aquí más expectativas según sea necesario
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
