import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from '../session.service';
import { prisma } from '@mypaw/server';
import { HttpException } from '@nestjs/common';
import { processSessionsByPatient } from '@mypaw/commons';

jest.mock('@mypaw/server', () => ({
  prisma: {
    devices: {
      findFirst: jest.fn(),
    },
    sessions: {
      findMany: jest.fn(),
    },
    patients: {
      findFirst: jest.fn(),
    },
  },
}));

jest.mock('@mypaw/commons', () => ({
  processSessions: jest.fn(),
  processSessionsByPatient: jest.fn(),
}));

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionService],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllSessionsOfDevice', () => {
    it('should return processed sessions if device exists', async () => {
      const device_id = 'device1';
      const device = {
        d_id: device_id,
        created_at: new Date(),
        updated_at: new Date(),
        active: true,
        serial: 'SN001',
        structure_version: 'v1',
        password: 'password123',
        model: 'model1',
      };
      const sessions = [
        {
          steps_automatic_forward: 209,
          steps_automatic_backward: 0,
          steps_intention_forward: 0,
          steps_intention_backward: 0,
          time_automatic_forward: 19,
          time_automatic_backward: 0,
          time_intentiton_forward: 0,
          time_intention_backward: 0,
          steps_total: 209,
          time_total: 21,
          timeWalking: 18.150000000000002,
          timeUse: 21.08333333333333,
          timeSession: 19.216666666666665,
          flexos_hip: 0,
          flexos_knee: 0,
          flexos_ankle: 0,
          threshold_hipl: 0,
          threshold_kneel: 0,
          threshold_hipr: 0,
          threshold_kneer: 0,
          threshold_anklel: 0,
          threshold_ankler: 0,
          start_time: new Date('2024-02-19T10:07:52.000Z'),
          end_time: new Date('2024-02-19T10:15:13.000Z'),
          date: new Date('2024-02-19T10:07:52.000Z'),
          id: '66360105-1f7c-4f94-9a2e-4d2f0f5f0700',
          created_at: new Date('2024-05-22T12:37:12.179Z'),
          updated_at: new Date('2024-05-22T12:41:05.213Z'),
          effort: 1,
          d_id: '750df25f-c520-4e1d-b747-4417d4ccdd11',
          p_id: '49b8bc66-26d6-4a66-aab4-fd51756f794a',
          evaluation: 7,
          has_chest: 1,
          i_id: '4382c6e7-4169-4aa1-911e-66943dcfb0b9',
          cadence_automatic_forward: 11,
          cadence_automatic_backward: 0,
          cadence_intention_forward: 0,
          cadence_intention_backward: 0,
        },
      ];
      const processedSessions = [
        {
          ...sessions[0],
          processed: true,
        },
      ];

      jest.spyOn(prisma.devices, 'findFirst').mockResolvedValue(device);
      jest.spyOn(prisma.sessions, 'findMany').mockResolvedValue(sessions);
      (processSessionsByPatient as jest.Mock).mockReturnValue(
        processedSessions
      );

      const result = await service.findAllSessionsOfDevice(device_id);
      expect(result).toBe(processedSessions);
    });

    it('should throw an error if device does not exist', async () => {
      jest.spyOn(prisma.devices, 'findFirst').mockResolvedValue(null);

      await expect(service.findAllSessionsOfDevice('device1')).rejects.toThrow(
        HttpException
      );
      await expect(service.findAllSessionsOfDevice('device1')).rejects.toThrow(
        'Device not found'
      );
    });
  });

  describe('findAllSessionsOfPatient', () => {
    it('should return sessions if patient exists', async () => {
      const patient_id = 'patient1';
      const patient = {
        p_id: patient_id,
        sex: 'M',
        birth_date: new Date(),
        pathology: ['pathology1'],
        affection: ['affection1'],
        treatment: ['treatment1'],
        city: 'city1',
        nationality: 'nationality1',
        last_session: new Date(),
        total_sessions: 1,
        total_steps: 100,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const sessions = [
        {
          steps_automatic_forward: 209,
          steps_automatic_backward: 0,
          steps_intention_forward: 0,
          steps_intention_backward: 0,
          time_automatic_forward: 19,
          time_automatic_backward: 0,
          time_intentiton_forward: 0,
          time_intention_backward: 0,
          steps_total: 209,
          time_total: 21,
          timeWalking: 18.150000000000002,
          timeUse: 21.08333333333333,
          timeSession: 19.216666666666665,
          flexos_hip: 0,
          flexos_knee: 0,
          flexos_ankle: 0,
          threshold_hipl: 0,
          threshold_kneel: 0,
          threshold_hipr: 0,
          threshold_kneer: 0,
          threshold_anklel: 0,
          threshold_ankler: 0,
          start_time: new Date('2024-02-19T10:07:52.000Z'),
          end_time: new Date('2024-02-19T10:15:13.000Z'),
          date: new Date('2024-02-19T10:07:52.000Z'),
          id: '66360105-1f7c-4f94-9a2e-4d2f0f5f0700',
          created_at: new Date('2024-05-22T12:37:12.179Z'),
          updated_at: new Date('2024-05-22T12:41:05.213Z'),
          effort: 1,
          d_id: '750df25f-c520-4e1d-b747-4417d4ccdd11',
          p_id: '49b8bc66-26d6-4a66-aab4-fd51756f794a',
          evaluation: 7,
          has_chest: 1,
          i_id: '4382c6e7-4169-4aa1-911e-66943dcfb0b9',
          cadence_automatic_forward: 11,
          cadence_automatic_backward: 0,
          cadence_intention_forward: 0,
          cadence_intention_backward: 0,
        },
      ];

      jest.spyOn(prisma.patients, 'findFirst').mockResolvedValue(patient);
      jest.spyOn(prisma.sessions, 'findMany').mockResolvedValue(sessions);

      const result = await service.findAllSessionsOfPatient(patient_id);
      expect(result).toBe(sessions);
    });

    it('should throw an error if patient does not exist', async () => {
      jest.spyOn(prisma.patients, 'findFirst').mockResolvedValue(null);

      await expect(
        service.findAllSessionsOfPatient('patient1')
      ).rejects.toThrow(HttpException);
      await expect(
        service.findAllSessionsOfPatient('patient1')
      ).rejects.toThrow('Patient not found');
    });
  });
});
