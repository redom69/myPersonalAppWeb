import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, NotFoundException } from '@nestjs/common';

import { PatientService } from '../patient.service';

import {
  AddPatientDTO,
  emailsDTO,
  PatientDto,
  RemovePatientOrgDTO,
  UpdatePatientDto,
} from '../dto/dto';
import { UserTokenDto } from '../../my-account/dto/dto';

import { prisma } from '@mypaw/server';
import { processSessions } from '@mypaw/commons';

jest.mock('@mypaw/server', () => ({
  prisma: {
    $transaction: jest.fn(),
    patients: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    config_patient: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
    patient_data: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
    organization_has_patient: {
      create: jest.fn(),
      deleteMany: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    sessions: {
      findMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    organizations: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock('@mypaw/commons', () => ({
  processSessions: jest.fn(),
}));

describe('PatientService', () => {
  let service: PatientService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    }).compile();

    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    service = module.get<PatientService>(PatientService);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a patient', async () => {
      const createPatientDto: PatientDto = {
        p_id: 'patient123',
        sex: 'male',
        birth_date: '2000-01-01',
        pathology: ['pathology'],
        treatment: ['treatment'],
        affectation: ['affection'],
        city: 'city',
        nationality: 'nationality',
        version: 1,
        weight: 70,
        height: 175,
        chest_size: 'M',
        shoe_size: 42,
        femur_len_r: 40,
        femur_len_l: 40,
        tibia_len_r: 35,
        tibia_len_l: 35,
        walker_len: 50,
        hip_width: 30,
        flexos_hip: 10,
        flexos_knee: 10,
        abd: 20,
        corset: 'M',
        ankle_lock: true,
        name: 'John',
        surnames: 'Doe',
        legal_guardian_email_1: 'guardian1@example.com',
        legal_guardian_email_2: 'guardian2@example.com',
        phone: '123456789',
        legal_guardian_name_1: 'Guardian1',
        legal_guardian_name_2: 'Guardian2',
        o_ids: ['org1', 'org2'],
      };
      const user: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };

      (prisma.$transaction as jest.Mock).mockImplementation((callback) =>
        callback(prisma)
      );
      (prisma.patients.create as jest.Mock).mockResolvedValue(createPatientDto);
      (prisma.config_patient.create as jest.Mock).mockResolvedValue({});
      (prisma.patient_data.create as jest.Mock).mockResolvedValue({});
      (prisma.organization_has_patient.create as jest.Mock).mockResolvedValue(
        {}
      );

      const result = await service.create(createPatientDto, user);
      expect(result).toEqual(createPatientDto);
    });

    it('should throw an error if creation fails', async () => {
      const createPatientDto: PatientDto = {
        p_id: 'patient123',
        sex: 'male',
        birth_date: '2000-01-01',
        pathology: ['pathology'],
        treatment: ['treatment'],
        affectation: ['affection'],
        city: 'city',
        nationality: 'nationality',
        version: 1,
        weight: 70,
        height: 175,
        chest_size: 'M',
        shoe_size: 42,
        femur_len_r: 40,
        femur_len_l: 40,
        tibia_len_r: 35,
        tibia_len_l: 35,
        walker_len: 50,
        hip_width: 30,
        flexos_hip: 10,
        flexos_knee: 10,
        abd: 20,
        corset: 'M',
        ankle_lock: true,
        name: 'John',
        surnames: 'Doe',
        legal_guardian_email_1: 'guardian1@example.com',
        legal_guardian_email_2: 'guardian2@example.com',
        phone: '123456789',
        legal_guardian_name_1: 'Guardian1',
        legal_guardian_name_2: 'Guardian2',
        o_ids: ['org1', 'org2'],
      };
      const user: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };

      (prisma.$transaction as jest.Mock).mockImplementation(() => {
        throw new Error('Transaction failed');
      });

      await expect(service.create(createPatientDto, user)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('update', () => {
    it('should update a patient', async () => {
      const updatePatientDto: UpdatePatientDto = {
        p_id: 'patient123',
        sex: 'male',
        birth_date: '2000-01-01',
        pathology: ['pathology'],
        treatment: ['treatment'],
        affectation: ['affection'],
        city: 'city',
        nationality: 'nationality',
        version: 2,
        weight: 70,
        height: 175,
        chest_size: 'M',
        shoe_size: 42,
        femur_len_r: 40,
        femur_len_l: 40,
        tibia_len_r: 35,
        tibia_len_l: 35,
        walker_len: 50,
        hip_width: 30,
        flexos_hip: 10,
        flexos_knee: 10,
        abd: 20,
        corset: 'M',
        ankle_lock: true,
        name: 'John',
        surnames: 'Doe',
        legal_guardian_email_1: 'guardian1@example.com',
        legal_guardian_email_2: 'guardian2@example.com',
        phone: '123456789',
        legal_guardian_name_1: 'Guardian1',
        legal_guardian_name_2: 'Guardian2',
        o_ids: ['org1', 'org2'],
      };
      const user: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      (prisma.$transaction as jest.Mock).mockImplementation((callback) =>
        callback(prisma)
      );
      (prisma.config_patient.findUnique as jest.Mock).mockResolvedValue({
        p_id: 'patient123',
        version: 1,
      });
      (prisma.patients.update as jest.Mock).mockResolvedValue(updatePatientDto);
      (prisma.config_patient.update as jest.Mock).mockResolvedValue({});
      (prisma.patient_data.update as jest.Mock).mockResolvedValue({});
      (prisma.organization_has_patient.create as jest.Mock).mockResolvedValue(
        {}
      );
      (
        prisma.organization_has_patient.deleteMany as jest.Mock
      ).mockResolvedValue({});

      const result = await service.update('patient123', updatePatientDto, user);
      expect(result).toEqual(updatePatientDto);
    });

    it('should delete organization-patient relationships when updating with empty organization IDs', async () => {
      const updatePatientDto: UpdatePatientDto = {
        p_id: 'patient123',
        version: 2,
        o_ids: [],
      };
      const user: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };

      prisma.config_patient.findUnique = jest
        .fn()
        .mockResolvedValue({ p_id: 'patient123', version: 1 });
      prisma.patients.update = jest.fn().mockResolvedValue({});
      prisma.config_patient.update = jest.fn().mockResolvedValue({});
      prisma.patient_data.update = jest.fn().mockResolvedValue({});
      prisma.organization_has_patient.deleteMany = jest
        .fn()
        .mockResolvedValue({});

      await service.update('patient123', updatePatientDto, user);

      expect(prisma.organization_has_patient.deleteMany).toHaveBeenCalledWith({
        where: { p_id: 'patient123' },
      });
    });

    it('should throw an error if patient is not found', async () => {
      const updatePatientDto: UpdatePatientDto = {
        p_id: 'patient123',
        sex: 'male',
        birth_date: '2000-01-01',
        pathology: ['pathology'],
        treatment: ['treatment'],
        affectation: ['affection'],
        city: 'city',
        nationality: 'nationality',
        version: 2,
        weight: 70,
        height: 175,
        chest_size: 'M',
        shoe_size: 42,
        femur_len_r: 40,
        femur_len_l: 40,
        tibia_len_r: 35,
        tibia_len_l: 35,
        walker_len: 50,
        hip_width: 30,
        flexos_hip: 10,
        flexos_knee: 10,
        abd: 20,
        corset: 'M',
        ankle_lock: true,
        name: 'John',
        surnames: 'Doe',
        legal_guardian_email_1: 'guardian1@example.com',
        legal_guardian_email_2: 'guardian2@example.com',
        phone: '123456789',
        legal_guardian_name_1: 'Guardian1',
        legal_guardian_name_2: 'Guardian2',
        o_ids: ['org1', 'org2'],
      };
      const user: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      (prisma.config_patient.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.update('patient123', updatePatientDto, user)
      ).rejects.toThrow(HttpException);
    });

    it('should throw an error if version is less than or equal to current version', async () => {
      const updatePatientDto: UpdatePatientDto = {
        p_id: 'patient123',
        sex: 'male',
        birth_date: '2000-01-01',
        pathology: ['pathology'],
        treatment: ['treatment'],
        affectation: ['affection'],
        city: 'city',
        nationality: 'nationality',
        version: 1,
        weight: 70,
        height: 175,
        chest_size: 'M',
        shoe_size: 42,
        femur_len_r: 40,
        femur_len_l: 40,
        tibia_len_r: 35,
        tibia_len_l: 35,
        walker_len: 50,
        hip_width: 30,
        flexos_hip: 10,
        flexos_knee: 10,
        abd: 20,
        corset: 'M',
        ankle_lock: true,
        name: 'John',
        surnames: 'Doe',
        legal_guardian_email_1: 'guardian1@example.com',
        legal_guardian_email_2: 'guardian2@example.com',
        phone: '123456789',
        legal_guardian_name_1: 'Guardian1',
        legal_guardian_name_2: 'Guardian2',
        o_ids: ['org1', 'org2'],
      };
      const user: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      (prisma.config_patient.findUnique as jest.Mock).mockResolvedValue({
        p_id: 'patient123',
        version: 2,
      });

      await expect(
        service.update('patient123', updatePatientDto, user)
      ).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should remove a patient', async () => {
      const transaction = [
        { count: 1 },
        { count: 1 },
        { count: 1 },
        { count: 1 },
      ];

      (prisma.$transaction as jest.Mock).mockResolvedValue(transaction);

      const result = await service.remove('patient123');
      expect(result).toEqual(transaction[1]);
    });

    it('should throw an error if removal fails', async () => {
      (prisma.$transaction as jest.Mock).mockImplementation(() => {
        throw new Error('Transaction failed');
      });

      await expect(service.remove('patient123')).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return all patients for non-marsi user', async () => {
      const user = { o_id: 'org123', role: 'clinic' };

      const organizationPatients = [
        { p_id: 'patient123' },
        { p_id: 'patient456' },
      ];

      const patients = [
        {
          p_id: 'patient123',
          last_session: null,
          total_sessions: 0,
          total_steps: 0,
          organization_has_patient: [
            {
              organizations: { name: 'Org1', o_id: 'org123' },
            },
          ],
        },
        {
          p_id: 'patient456',
          last_session: null,
          total_sessions: 0,
          total_steps: 0,
          organization_has_patient: [
            {
              organizations: { name: 'Org1', o_id: 'org123' },
            },
          ],
        },
      ];

      const patientDataResults = [
        { p_id: 'patient123', name: 'John', surnames: 'Doe' },
        { p_id: 'patient456', name: 'Jane', surnames: 'Doe' },
      ];

      (prisma.organization_has_patient.findMany as jest.Mock).mockResolvedValue(
        organizationPatients
      );
      (prisma.patients.findMany as jest.Mock).mockResolvedValue(patients);
      (prisma.patient_data.findMany as jest.Mock).mockResolvedValue(
        patientDataResults
      );

      const result = await service.findAll(user);
      expect(result).toHaveLength(2);
    });
    it('should return "Desconocido" for name and surnames if data is not found', async () => {
      const user = { o_id: 'org123', role: 'clinic' };

      const organizationPatients = [{ p_id: 'patient123' }];

      const patients = [
        {
          p_id: 'patient123',
          last_session: null,
          total_sessions: 0,
          total_steps: 0,
          organization_has_patient: [
            {
              organizations: { name: 'Org1', o_id: 'org123' },
            },
          ],
        },
      ];

      (prisma.organization_has_patient.findMany as jest.Mock).mockResolvedValue(
        organizationPatients
      );
      (prisma.patients.findMany as jest.Mock).mockResolvedValue(patients);
      (prisma.patient_data.findMany as jest.Mock).mockResolvedValue([]);

      const result = await service.findAll(user);
      expect(result[0].name).toBe('Desconocido');
      expect(result[0].surnames).toBe('Desconocido');
    });
    it('should return all patients for marsi user', async () => {
      const user = { o_id: 'org123', role: 'admin' };

      const patients = [
        {
          p_id: 'patient123',
          last_session: null,
          total_sessions: 0,
          total_steps: 0,
          organization_has_patient: [
            {
              organizations: { name: 'Org1', o_id: 'org123' },
            },
          ],
        },
        {
          p_id: 'patient456',
          last_session: null,
          total_sessions: 0,
          total_steps: 0,
          organization_has_patient: [
            {
              organizations: { name: 'Org1', o_id: 'org123' },
            },
          ],
        },
      ];

      const patientDataResults = [
        { p_id: 'patient123', name: 'John', surnames: 'Doe' },
        { p_id: 'patient456', name: 'Jane', surnames: 'Doe' },
      ];

      (prisma.patients.findMany as jest.Mock).mockResolvedValue(patients);
      (prisma.patient_data.findMany as jest.Mock).mockResolvedValue(
        patientDataResults
      );

      const result = await service.findAll(user);
      expect(result).toHaveLength(2);
    });

    it('should throw an error if no patients are found', async () => {
      const user = { o_id: 'org123', role: 'clinic' };

      (prisma.organization_has_patient.findMany as jest.Mock).mockResolvedValue(
        []
      );
      (prisma.patients.findMany as jest.Mock).mockResolvedValue([]);

      await expect(service.findAll(user)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a patient view for marsi user', async () => {
      const user = { role: 'admin', o_id: 'org123' };
      const patient = {
        p_id: 'patient123',
        birth_date: new Date(),
        sex: 'male',
        pathology: 'pathology',
        affection: 'affection',
        treatment: 'treatment',
        city: 'city',
        nationality: 'nationality',
        patient_data: {
          name: 'John',
          surnames: 'Doe',
          legal_guardian_email_1: 'guardian1@example.com',
          legal_guardian_email_2: 'guardian2@example.com',
          phone: '123456789',
          legal_guardian_name_1: 'Guardian1',
          legal_guardian_name_2: 'Guardian2',
        },
        config_patient: {
          version: 1,
          weight: 70,
          height: 175,
          chest_size: 'M',
          shoe_size: 42,
          femur_len_r: 40,
          femur_len_l: 40,
          tibia_len_r: 35,
          tibia_len_l: 35,
          walker_len: 50,
          hip_width: 30,
          flexos_hip: 10,
          flexos_knee: 10,
          abd: 20,
          corset: true,
          ankle_lock: true,
          weight_units: 'kg',
          height_units: 'cm',
          u_id: 'user123',
        },
        organization_has_patient: [
          {
            organizations: { o_id: 'org123' },
          },
        ],
      };

      const sessions = [
        { s_id: 'session123', steps: 1000 },
        { s_id: 'session456', steps: 2000 },
      ];

      (prisma.patients.findUnique as jest.Mock).mockResolvedValue(patient);
      (prisma.sessions.findMany as jest.Mock).mockResolvedValue(sessions);
      (processSessions as jest.Mock).mockReturnValue(sessions);

      const result = await service.findOne('patient123', user);
      expect(result).toEqual(expect.any(Object));
      expect(result.sessions).toHaveLength(2);
    });

    it('should return "kg" and "cm" as default weight and height units when config_patient is null', async () => {
      const user = { role: 'admin', o_id: 'org123' };
      const patient = {
        p_id: 'patient123',
        birth_date: new Date(),
        sex: 'male',
        pathology: 'pathology',
        affection: 'affection',
        treatment: 'treatment',
        city: 'city',
        nationality: 'nationality',
        patient_data: {
          name: 'John',
          surnames: 'Doe',
          legal_guardian_email_1: 'guardian1@example.com',
          legal_guardian_email_2: 'guardian2@example.com',
          phone: '123456789',
          legal_guardian_name_1: 'Guardian1',
          legal_guardian_name_2: 'Guardian2',
        },
        config_patient: null,
        organization_has_patient: [
          {
            organizations: { o_id: 'org123' },
          },
        ],
      };

      (prisma.patients.findUnique as jest.Mock).mockResolvedValue(patient);
      (prisma.sessions.findMany as jest.Mock).mockResolvedValue([]);
      (processSessions as jest.Mock).mockReturnValue([]);

      const result = await service.findOne('patient123', user);
      expect(result.weight_unit).toBe('kg');
      expect(result.height_unit).toBe('cm');
      expect(result.corset).toBeUndefined();
      expect(result.ankle_lock).toBeUndefined();
    });

    it('should return "Desconocido" for name and surnames when patient_data is null', async () => {
      const user = { role: 'admin', o_id: 'org123' };
      const patient = {
        p_id: 'patient123',
        birth_date: new Date(),
        sex: 'male',
        pathology: 'pathology',
        affection: 'affection',
        treatment: 'treatment',
        city: 'city',
        nationality: 'nationality',
        patient_data: null,
        config_patient: {
          version: 1,
          weight: 70,
          height: 175,
          chest_size: 'M',
          shoe_size: 42,
          femur_len_r: 40,
          femur_len_l: 40,
          tibia_len_r: 35,
          tibia_len_l: 35,
          walker_len: 50,
          hip_width: 30,
          flexos_hip: 10,
          flexos_knee: 10,
          abd: 20,
          corset: true,
          ankle_lock: true,
          weight_units: 'kg',
          height_units: 'cm',
          u_id: 'user123',
        },
        organization_has_patient: [
          {
            organizations: { o_id: 'org123' },
          },
        ],
      };

      (prisma.patients.findUnique as jest.Mock).mockResolvedValue(patient);
      (prisma.sessions.findMany as jest.Mock).mockResolvedValue([]);
      (processSessions as jest.Mock).mockReturnValue([]);

      const result = await service.findOne('patient123', user);
      expect(result.name).toBeUndefined();
      expect(result.surnames).toBeUndefined();
    });

    it('should throw an error if patient is not found', async () => {
      const user = { role: 'admin', o_id: 'org123' };

      (prisma.patients.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne('patient123', user)).rejects.toThrow(
        NotFoundException
      );
    });

    it('should throw an error if patient does not belong to user organization', async () => {
      const user = { role: 'clinic', o_id: 'org123' };

      (
        prisma.organization_has_patient.findFirst as jest.Mock
      ).mockResolvedValue(null);

      await expect(service.findOne('patient123', user)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('findAllConfig', () => {
    it('should return all patient configs for non-marsi user', async () => {
      const user = { role: 'clinic', o_id: 'org123' };

      const patients = [
        {
          p_id: 'patient123',
          birth_date: new Date(),
          sex: 'male',
          pathology: 'pathology',
          affection: 'affection',
          treatment: 'treatment',
          city: 'city',
          nationality: 'nationality',
          patient_data: {
            name: 'John',
            surnames: 'Doe',
            legal_guardian_email_1: 'guardian1@example.com',
            legal_guardian_email_2: 'guardian2@example.com',
            phone: '123456789',
            legal_guardian_name_1: 'Guardian1',
            legal_guardian_name_2: 'Guardian2',
          },
          config_patient: {
            version: 1,
            weight: 70,
            height: 175,
            chest_size: 'M',
            shoe_size: 42,
            femur_len_r: 40,
            femur_len_l: 40,
            tibia_len_r: 35,
            tibia_len_l: 35,
            walker_len: 50,
            hip_width: 30,
            flexos_hip: 10,
            flexos_knee: 10,
            abd: 20,
            corset: true,
            ankle_lock: true,
            weight_units: 'kg',
            height_units: 'cm',
            u_id: 'user123',
          },
          organization_has_patient: [
            {
              organizations: { o_id: 'org123' },
            },
          ],
        },
      ];

      (prisma.patients.findMany as jest.Mock).mockResolvedValue(patients);

      const result = await service.findAllConfig(user);
      expect(result).toHaveLength(1);
    });

    it('should return all patient configs for non-marsi user with default values for patient_data', async () => {
      const user = { role: 'clinic', o_id: 'org123' };

      const patients = [
        {
          p_id: 'patient123',
          birth_date: new Date(),
          sex: 'male',
          pathology: 'pathology',
          affection: 'affection',
          treatment: 'treatment',
          city: 'city',
          nationality: 'nationality',
          patient_data: null,
          config_patient: {
            version: 1,
            weight: 70,
            height: 175,
            chest_size: 'M',
            shoe_size: 42,
            femur_len_r: 40,
            femur_len_l: 40,
            tibia_len_r: 35,
            tibia_len_l: 35,
            walker_len: 50,
            hip_width: 30,
            flexos_hip: 10,
            flexos_knee: 10,
            abd: 20,
            corset: true,
            ankle_lock: true,
            weight_units: 'kg',
            height_units: 'cm',
            u_id: 'user123',
          },
          organization_has_patient: [
            {
              organizations: { o_id: 'org123' },
            },
          ],
        },
      ];

      (prisma.patients.findMany as jest.Mock).mockResolvedValue(patients);

      const result = await service.findAllConfig(user);

      expect(result).toHaveLength(1);
      const patientConfig = result[0];
      expect(patientConfig.name).toBe('');
      expect(patientConfig.surnames).toBe('');
      expect(patientConfig.phone).toBe('');
      expect(patientConfig.legal_guardian_email_1).toBe('');
      expect(patientConfig.legal_guardian_email_2).toBe('');
      expect(patientConfig.legal_guardian_name_1).toBeUndefined();
      expect(patientConfig.legal_guardian_name_2).toBeUndefined();
      expect(patientConfig.weight).toBe(70);
      expect(patientConfig.height).toBe(175);
    });

    it('should return all patient configs for non-marsi user with default values for config_patient', async () => {
      const user = { role: 'clinic', o_id: 'org123' };

      const patients = [
        {
          p_id: 'patient123',
          birth_date: new Date(),
          sex: 'male',
          pathology: 'pathology',
          affection: 'affection',
          treatment: 'treatment',
          city: 'city',
          nationality: 'nationality',
          patient_data: {
            name: 'John',
            surnames: 'Doe',
            legal_guardian_email_1: 'guardian1@example.com',
            legal_guardian_email_2: 'guardian2@example.com',
            phone: '123456789',
            legal_guardian_name_1: 'Guardian1',
            legal_guardian_name_2: 'Guardian2',
          },
          config_patient: null,
          organization_has_patient: [
            {
              organizations: { o_id: 'org123' },
            },
          ],
        },
      ];

      (prisma.patients.findMany as jest.Mock).mockResolvedValue(patients);

      const result = await service.findAllConfig(user);

      expect(result).toHaveLength(1);
      const patientConfig = result[0];
      expect(patientConfig.name).toBe('John');
      expect(patientConfig.surnames).toBe('Doe');
      expect(patientConfig.phone).toBe('123456789');
      expect(patientConfig.legal_guardian_email_1).toBe(
        'guardian1@example.com'
      );
      expect(patientConfig.legal_guardian_email_2).toBe(
        'guardian2@example.com'
      );
      expect(patientConfig.weight).toBe(0);
      expect(patientConfig.height).toBe(0);
    });

    it('should return all patient configs for marsi user', async () => {
      const user = { role: 'admin', o_id: 'org123' };

      const patients = [
        {
          p_id: 'patient123',
          birth_date: new Date(),
          sex: 'male',
          pathology: 'pathology',
          affection: 'affection',
          treatment: 'treatment',
          city: 'city',
          nationality: 'nationality',
          patient_data: {
            name: 'John',
            surnames: 'Doe',
            legal_guardian_email_1: 'guardian1@example.com',
            legal_guardian_email_2: 'guardian2@example.com',
            phone: '123456789',
            legal_guardian_name_1: 'Guardian1',
            legal_guardian_name_2: 'Guardian2',
          },
          config_patient: {
            version: 1,
            weight: 70,
            height: 175,
            chest_size: 'M',
            shoe_size: 42,
            femur_len_r: 40,
            femur_len_l: 40,
            tibia_len_r: 35,
            tibia_len_l: 35,
            walker_len: 50,
            hip_width: 30,
            flexos_hip: 10,
            flexos_knee: 10,
            abd: 20,
            corset: true,
            ankle_lock: true,
            weight_units: 'kg',
            height_units: 'cm',
            u_id: 'user123',
          },
          organization_has_patient: [
            {
              organizations: { o_id: 'org123' },
            },
          ],
        },
      ];

      (prisma.patients.findMany as jest.Mock).mockResolvedValue(patients);

      const result = await service.findAllConfig(user);
      expect(result).toHaveLength(1);
    });

    it('should throw an error if no patients are found', async () => {
      const user = { role: 'clinic', o_id: 'org123' };

      (prisma.patients.findMany as jest.Mock).mockResolvedValue([]);

      await expect(service.findAllConfig(user)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('addPatientToOrganization', () => {
    it('should add patient to organization', async () => {
      const dto: AddPatientDTO = {
        p_id: 'patient123',
        email1: 'org1@example.com',
        email2: 'org2@example.com',
      };

      const patient = { p_id: 'patient123' };

      const organization1 = {
        organizations: { o_id: 'org1' },
      };

      const organization2 = {
        organizations: { o_id: 'org2' },
      };

      (prisma.patients.findUnique as jest.Mock).mockResolvedValue(patient);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(organization1)
        .mockResolvedValueOnce(organization2);
      (
        prisma.organization_has_patient.findFirst as jest.Mock
      ).mockResolvedValue(null);
      (prisma.organization_has_patient.create as jest.Mock).mockResolvedValue(
        {}
      );

      const result = await service.addPatientToOrganization(dto);
      expect(result).toBe(true);
    });

    it('should throw an error if patient is not found', async () => {
      const dto: AddPatientDTO = {
        p_id: 'patient123',
        email1: 'org1@example.com',
        email2: 'org2@example.com',
      };

      (prisma.patients.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.addPatientToOrganization(dto)).rejects.toThrow(
        HttpException
      );
    });

    it('should throw a HttpException if organization is not found', async () => {
      const dto: AddPatientDTO = {
        p_id: 'patient123',
        email1: 'org1@example.com',
        email2: 'org2@example.com',
      };

      prisma.patients.findUnique = jest
        .fn()
        .mockResolvedValue({ p_id: 'patient123' });
      prisma.user.findUnique = jest
        .fn()
        .mockResolvedValue({ organizations: null });

      await expect(service.addPatientToOrganization(dto)).rejects.toThrow(
        HttpException
      );
      await expect(service.addPatientToOrganization(dto)).rejects.toThrow(
        'Error al agregar el paciente a la organización: Organization not found.'
      );
    });
  });

  describe('syncPatientsWithOrganization', () => {
    it('should sync patients with organization', async () => {
      const user: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      const dto: emailsDTO = {
        email1: 'org1@example.com',
        email2: 'org2@example.com',
      };

      const organization1 = {
        organizations: { o_id: 'org1' },
      };

      const organization2 = {
        organizations: { o_id: 'org2' },
      };

      const patients = [{ p_id: 'patient123' }, { p_id: 'patient456' }];

      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(organization1)
        .mockResolvedValueOnce(organization2);
      (prisma.patients.findMany as jest.Mock).mockResolvedValue(patients);
      (
        prisma.organization_has_patient.findFirst as jest.Mock
      ).mockResolvedValue(null);
      (prisma.organization_has_patient.create as jest.Mock).mockResolvedValue(
        {}
      );

      const result = await service.syncPatientsWithOrganization(user, dto);
      expect(result).toBe(true);
    });

    it('should throw a HttpException if organization is not found', async () => {
      const user: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: 'org123',
        role: 'clinic',
        iat: 0,
        exp: 0,
      };
      const dto: emailsDTO = {
        email1: 'org1@example.com',
        email2: 'org2@example.com',
      };

      prisma.user.findUnique = jest
        .fn()
        .mockResolvedValue({ organizations: null });

      await expect(
        service.syncPatientsWithOrganization(user, dto)
      ).rejects.toThrow(HttpException);
      await expect(
        service.syncPatientsWithOrganization(user, dto)
      ).rejects.toThrow(
        'Error al sincronizar los pacientes con la organización: Organization not found.'
      );
    });
  });

  describe('removePatientFromOrganization', () => {
    it('should remove patient from organization', async () => {
      const dto: RemovePatientOrgDTO = { p_id: 'patient123', o_id: 'org123' };

      const patient = { p_id: 'patient123' };
      const organization = { o_id: 'org123' };

      (prisma.patients.findUnique as jest.Mock).mockResolvedValue(patient);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(
        organization
      );
      (
        prisma.organization_has_patient.deleteMany as jest.Mock
      ).mockResolvedValue({});

      const result = await service.removePatientFromOrganization(dto);
      expect(result).toBe(true);
    });

    it('should throw an error if patient is not found', async () => {
      const dto: RemovePatientOrgDTO = { p_id: 'patient123', o_id: 'org123' };

      (prisma.patients.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.removePatientFromOrganization(dto)).rejects.toThrow(
        HttpException
      );
    });

    it('should throw an error if organization is not found', async () => {
      const dto: RemovePatientOrgDTO = { p_id: 'patient123', o_id: 'org123' };

      const patient = { p_id: 'patient123' };

      (prisma.patients.findUnique as jest.Mock).mockResolvedValue(patient);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.removePatientFromOrganization(dto)).rejects.toThrow(
        HttpException
      );
    });
  });
});
