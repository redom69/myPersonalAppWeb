import { Test, TestingModule } from '@nestjs/testing';
import { SessionController } from '../session.controller';
import { SessionService } from '../session.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Session } from '../dto/session.dto';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

describe('SessionController', () => {
  let controller: SessionController;
  let service: SessionService;

  beforeEach(async () => {
    const mockSessionService = {
      findAllSessionsOfDevice: jest.fn(),
      findAllSessionsOfPatient: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        {
          provide: SessionService,
          useValue: mockSessionService,
        },
      ],
    }).compile();
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    controller = module.get<SessionController>(SessionController);
    service = module.get<SessionService>(SessionService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllSessionsOfDevice', () => {
    it('should return sessions of device', async () => {
      const result: Session[] = [
        {
          id: '1',
          steps_automatic_forward: 10,
          steps_automatic_backward: 5,
          steps_intention_forward: 20,
          steps_intention_backward: 10,
          flexos_hip: 30,
          flexos_knee: 45,
          flexos_ankle: 15,
          threshold_hipL: 20,
          threshold_kneeL: 25,
          threshold_hipR: 20,
          threshold_kneeR: 25,
          therapist_dungarees: 8,
          therapist_effort: 5,
          d_id: 'device1',
          date: new Date().toISOString(),
          start: null,
          end: new Date().toISOString(),
          time_automatic_forward: 10,
          time_automatic_backward: 5,
          time_intentiton_forward: 15,
          time_intention_backward: 10,
          steps_total: 50,
          time_total: 60,
          cadence_automatic_forward: 2,
          cadence_automatic_backward: 1,
          cadence_intention_forward: 1.5,
          cadence_intention_backward: 0.5,
          chest: 1,
          evaluation: 7,
          ingestion_id: 'fe338788-8b9a-4666-92b6-dd3b44c5a91d',
        },
      ];
      jest.spyOn(service, 'findAllSessionsOfDevice').mockResolvedValue(result);

      expect(await controller.findAllSessionsOfDevice('device1')).toBe(result);
    });

    it('should throw an error if device not found', async () => {
      jest
        .spyOn(service, 'findAllSessionsOfDevice')
        .mockRejectedValue(
          new HttpException('Device not found', HttpStatus.NOT_FOUND)
        );

      await expect(
        controller.findAllSessionsOfDevice('device1')
      ).rejects.toThrow(HttpException);
    });
  });

  describe('findAllSessionsOfPatient', () => {
    it('should return sessions of patient', async () => {
      const result: Session[] = [
        {
          id: '1',
          steps_automatic_forward: 10,
          steps_automatic_backward: 5,
          steps_intention_forward: 20,
          steps_intention_backward: 10,
          flexos_hip: 30,
          flexos_knee: 45,
          flexos_ankle: 15,
          threshold_hipL: 20,
          threshold_kneeL: 25,
          threshold_hipR: 20,
          threshold_kneeR: 25,
          therapist_dungarees: 8,
          therapist_effort: 5,
          d_id: 'device1',
          date: new Date().toISOString(),
          start: null,
          end: new Date().toISOString(),
          time_automatic_forward: 10,
          time_automatic_backward: 5,
          time_intentiton_forward: 15,
          time_intention_backward: 10,
          steps_total: 50,
          time_total: 60,
          cadence_automatic_forward: 2,
          cadence_automatic_backward: 1,
          cadence_intention_forward: 1.5,
          cadence_intention_backward: 0.5,
          chest: 1,
          evaluation: 7,
          ingestion_id: 'fe338788-8b9a-4666-92b6-dd3b44c5a91d',
        },
      ];
      jest.spyOn(service, 'findAllSessionsOfPatient').mockResolvedValue(result);

      expect(await controller.findAllSessionsOfPatient('patient1')).toBe(
        result
      );
    });

    it('should throw an error if patient not found', async () => {
      jest
        .spyOn(service, 'findAllSessionsOfPatient')
        .mockRejectedValue(
          new HttpException('Patient not found', HttpStatus.NOT_FOUND)
        );

      await expect(
        controller.findAllSessionsOfPatient('patient1')
      ).rejects.toThrow(HttpException);
    });
  });
});
