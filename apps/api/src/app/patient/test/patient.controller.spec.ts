import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';

import { PatientController } from '../patient.controller';
import { PatientService } from '../patient.service';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import {
  AddPatientDTO,
  PatientDto,
  UpdatePatientDto,
  RemovePatientOrgDTO,
  emailsDTO,
  PatientView,
  PatientTable,
} from '../dto/dto';
import { UserTokenDto } from '../../my-account/dto/dto';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
            findAllConfig: jest.fn(),
            findOne: jest.fn(),
            findSessionsOfPatientBetweenDates: jest.fn(),
            addPatientToOrganization: jest.fn(),
            syncPatientsWithOrganization: jest.fn(),
            removePatientFromOrganization: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthenticatedGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a patient', async () => {
      const dto: PatientDto = {
        p_id: '123e4567-e89b-12d3-a456-426614174000',
        o_ids: ['123e4567-e89b-12d3-a456-426614174000'],
        birth_date: '1980-01-01',
        sex: 'M',
        pathology: ['Diabetes'],
        affectation: ['Arthritis'],
        treatment: ['Insulin'],
        city: 'New York',
        nationality: 'USA',
        name: 'John',
        surnames: 'Doe',
        phone: '+11234567890',
        legal_guardian_email_1: 'guardian1@example.com',
        legal_guardian_email_2: 'guardian2@example.com',
        legal_guardian_name_1: 'Jane',
        legal_guardian_name_2: 'Jack',
        weight: 70,
        height: 175,
        shoe_size: 42,
        femur_len_r: 25,
        femur_len_l: 25,
        tibia_len_r: 30,
        tibia_len_l: 30,
        walker_len: 2,
        hip_width: 30,
        chest_size: 'M',
        flexos_hip: 10,
        flexos_knee: 15,
        abd: 5,
        ankle_lock: true,
        corset: 'Small Flat',
        version: 1,
      };
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };
      const result: PatientDto = { ...dto };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto, user)).toBe(result);
    });

    it('should throw an error if create fails', async () => {
      const dto: PatientDto = {
        p_id: '123e4567-e89b-12d3-a456-426614174000',
        o_ids: ['123e4567-e89b-12d3-a456-426614174000'],
        birth_date: '1980-01-01',
        sex: 'M',
        pathology: ['Diabetes'],
        affectation: ['Arthritis'],
        treatment: ['Insulin'],
        city: 'New York',
        nationality: 'USA',
        name: 'John',
        surnames: 'Doe',
        phone: '+11234567890',
        legal_guardian_email_1: 'guardian1@example.com',
        legal_guardian_email_2: 'guardian2@example.com',
        legal_guardian_name_1: 'Jane',
        legal_guardian_name_2: 'Jack',
        weight: 70,
        height: 175,
        shoe_size: 42,
        femur_len_r: 25,
        femur_len_l: 25,
        tibia_len_r: 30,
        tibia_len_l: 30,
        walker_len: 2,
        hip_width: 30,
        chest_size: 'M',
        flexos_hip: 10,
        flexos_knee: 15,
        abd: 5,
        ankle_lock: true,
        corset: 'Small Flat',
        version: 1,
      };
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new HttpException('Error creating patient.', HttpStatus.BAD_REQUEST)
        );

      await expect(controller.create(dto, user)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a patient', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const dto: UpdatePatientDto = {
        name: 'John Updated',
        version: 2,
        weight: 75,
        height: 180,
      };
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };
      const result: UpdatePatientDto = { ...dto };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto, user)).toBe(result);
    });

    it('should throw an error if update fails', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const dto: UpdatePatientDto = {
        name: 'John Updated',
        version: 2,
        weight: 75,
        height: 180,
      };
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new HttpException(
            'Error updating patient data.',
            HttpStatus.BAD_REQUEST
          )
        );

      await expect(controller.update(id, dto, user)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('remove', () => {
    it('should remove a patient', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const result = {
        p_id: '123e4567-e89b-12d3-a456-426614174000',
        version: 1,
        weight: 70,
        height: 175,
        weight_units: 'kg',
        height_units: 'cm',
        chest_size: 'M',
        shoe_size: 42,
        femur_len_l: 25,
        femur_len_r: 25,
        tibia_len_l: 30,
        tibia_len_r: 30,
        walker_len: 2,
        hip_width: 30,
        flexos_hip: 10,
        flexos_knee: 15,
        abd: 5,
        corset: 'Small Flat',
        ankle_lock: true,
        u_id: 'user1',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toBe(result);
    });

    it('should throw an error if remove fails', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new HttpException('Error deleting patient.', HttpStatus.BAD_REQUEST)
        );

      await expect(controller.remove(id)).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };
      const result: PatientTable[] = [
        {
          p_id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John',
          surnames: 'Doe',
          institutions: ['Institution 1'],
          total_session: 20,
          last_session: new Date(),
          total_steps: 5000,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll(user)).toBe(result);
    });

    it('should throw an error if findAll fails', async () => {
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };

      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(
          new HttpException(
            'Error retrieving patients.',
            HttpStatus.BAD_REQUEST
          )
        );

      await expect(controller.findAll(user)).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a patient by id', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };
      const result: PatientView = {
        p_id: '123e4567-e89b-12d3-a456-426614174000',
        o_ids: ['123e4567-e89b-12d3-a456-426614174000'],
        birth_date: '1980-01-01',
        sex: 'M',
        pathology: ['Diabetes'],
        affectation: ['Arthritis'],
        treatment: ['Insulin'],
        city: 'New York',
        nationality: 'USA',
        name: 'John',
        surnames: 'Doe',
        phone: '+11234567890',
        legal_guardian_email_1: 'guardian1@example.com',
        legal_guardian_email_2: 'guardian2@example.com',
        legal_guardian_name_1: 'Jane',
        legal_guardian_name_2: 'Jack',
        weight: 70,
        height: 175,
        shoe_size: 42,
        femur_len_r: 25,
        femur_len_l: 25,
        tibia_len_r: 30,
        tibia_len_l: 30,
        walker_len: 2,
        hip_width: 30,
        chest_size: 'M',
        flexos_hip: 10,
        flexos_knee: 15,
        abd: 5,
        ankle_lock: true,
        corset: 'Small Flat',
        version: 1,
        weight_unit: 'kg',
        height_unit: 'cm',
        sessions: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id, user)).toBe(result);
    });

    it('should throw an error if findOne fails', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new HttpException('Error retrieving patient.', HttpStatus.BAD_REQUEST)
        );

      await expect(controller.findOne(id, user)).rejects.toThrow(HttpException);
    });
  });

  describe('addPatientToOrganization', () => {
    it('should add a patient to an organization', async () => {
      const dto: AddPatientDTO = {
        p_id: '123e4567-e89b-12d3-a456-426614174000',
        email1: 'guardian1@example.com',
        email2: 'guardian2@example.com',
      };
      const result = true;

      jest.spyOn(service, 'addPatientToOrganization').mockResolvedValue(result);

      expect(await controller.addPatientToOrganization(dto)).toBe(result);
    });

    it('should throw an error if addPatientToOrganization fails', async () => {
      const dto: AddPatientDTO = {
        p_id: '123e4567-e89b-12d3-a456-426614174000',
        email1: 'guardian1@example.com',
        email2: 'guardian2@example.com',
      };

      jest
        .spyOn(service, 'addPatientToOrganization')
        .mockRejectedValue(
          new HttpException(
            'Error adding patient to the organization.',
            HttpStatus.BAD_REQUEST
          )
        );

      await expect(controller.addPatientToOrganization(dto)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('syncPatientsWithOrganization', () => {
    it('should sync patients with the organization', async () => {
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };
      const emails: emailsDTO = {
        email1: 'guardian1@example.com',
        email2: 'guardian2@example.com',
      };
      const result = true;

      jest
        .spyOn(service, 'syncPatientsWithOrganization')
        .mockResolvedValue(result);

      expect(await controller.syncPatientsWithOrganization(user, emails)).toBe(
        result
      );
    });

    it('should throw an error if syncPatientsWithOrganization fails', async () => {
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };
      const emails: emailsDTO = {
        email1: 'guardian1@example.com',
        email2: 'guardian2@example.com',
      };

      jest
        .spyOn(service, 'syncPatientsWithOrganization')
        .mockRejectedValue(
          new HttpException(
            'Error syncing patients with the organization.',
            HttpStatus.BAD_REQUEST
          )
        );

      await expect(
        controller.syncPatientsWithOrganization(user, emails)
      ).rejects.toThrow(HttpException);
    });
  });

  describe('removePatientFromOrganization', () => {
    it('should remove a patient from an organization', async () => {
      const dto: RemovePatientOrgDTO = {
        p_id: '123e4567-e89b-12d3-a456-426614174000',
        o_id: '123e4567-e89b-12d3-a456-426614174000',
      };
      const result = true;

      jest
        .spyOn(service, 'removePatientFromOrganization')
        .mockResolvedValue(result);

      expect(await controller.removePatientFromOrganization(dto)).toBe(result);
    });

    it('should throw an error if removePatientFromOrganization fails', async () => {
      const dto: RemovePatientOrgDTO = {
        p_id: '123e4567-e89b-12d3-a456-426614174000',
        o_id: '123e4567-e89b-12d3-a456-426614174000',
      };

      jest
        .spyOn(service, 'removePatientFromOrganization')
        .mockRejectedValue(
          new HttpException(
            'Error removing patient from the organization.',
            HttpStatus.BAD_REQUEST
          )
        );

      await expect(
        controller.removePatientFromOrganization(dto)
      ).rejects.toThrow(HttpException);
    });
  });
  describe('getConfig', () => {
    it('should return the configuration of all patients', async () => {
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };
      const result: PatientDto[] = [
        {
          p_id: '123e4567-e89b-12d3-a456-426614174000',
          o_ids: ['123e4567-e89b-12d3-a456-426614174000'],
          birth_date: '1980-01-01',
          sex: 'M',
          pathology: ['Diabetes'],
          affectation: ['Arthritis'],
          treatment: ['Insulin'],
          city: 'New York',
          nationality: 'USA',
          name: 'John',
          surnames: 'Doe',
          phone: '+11234567890',
          legal_guardian_email_1: 'guardian1@example.com',
          legal_guardian_email_2: 'guardian2@example.com',
          legal_guardian_name_1: 'Jane',
          legal_guardian_name_2: 'Jack',
          weight: 70,
          height: 175,
          shoe_size: 42,
          femur_len_r: 25,
          femur_len_l: 25,
          tibia_len_r: 30,
          tibia_len_l: 30,
          walker_len: 2,
          hip_width: 30,
          chest_size: 'M',
          flexos_hip: 10,
          flexos_knee: 15,
          abd: 5,
          ankle_lock: true,
          corset: 'Small Flat',
          version: 1,
        },
      ];

      jest.spyOn(service, 'findAllConfig').mockResolvedValue(result);

      expect(await controller.getConfig(user)).toBe(result);
    });

    it('should throw an error if getConfig fails', async () => {
      const user: UserTokenDto = {
        u_id: 'user1',
        email: 'user@example.com',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        o_id: 'org1',
        role: 'admin',
        iat: 123456,
        exp: 123456,
      };

      jest
        .spyOn(service, 'findAllConfig')
        .mockRejectedValue(
          new HttpException(
            'Error retrieving patients.',
            HttpStatus.BAD_REQUEST
          )
        );

      await expect(controller.getConfig(user)).rejects.toThrow(HttpException);
    });
  });
});
