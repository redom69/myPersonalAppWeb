import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { AlarmController } from '../alarms.controller';
import { AlarmService } from '../alarms.service';
import { Alarm, UpdateAlarm } from '../dto/alarms.dto';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

describe('AlarmController', () => {
  let controller: AlarmController;
  let service: AlarmService;

  beforeEach(async () => {
    const mockAlarmService = {
      findAllAlarms: jest.fn(),
      findAllAlarmOfDevice: jest.fn(),
      createAlarm: jest.fn(),
      updateAlarm: jest.fn(),
      deleteAlarm: jest.fn(),
      getAlarmsOfDeviceBetweenDates: jest.fn(),
      findAllAlarmOfDevicePerDay: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmController],
      providers: [
        {
          provide: AlarmService,
          useValue: mockAlarmService,
        },
      ],
    }).compile();

    controller = module.get<AlarmController>(AlarmController);
    service = module.get<AlarmService>(AlarmService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of alarms', async () => {
      const result: Alarm[] = [];
      jest.spyOn(service, 'findAllAlarms').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findAllAlarmOfDevicePerDay', () => {
    it('should throw an exception if date is invalid', async () => {
      await expect(
        controller.findAllAlarmOfDevicePerDay('device1', 'invalid-date')
      ).rejects.toThrow(NotFoundException);
    });

    it('should return an array of alarms for a specific device per day', async () => {
      const result: Alarm[] = [];
      jest
        .spyOn(service, 'findAllAlarmOfDevicePerDay')
        .mockResolvedValue(result);

      expect(
        await controller.findAllAlarmOfDevicePerDay('device1', '2022-01-01')
      ).toBe(result);
    });
  });

  describe('findAllAlarmOfDevice', () => {
    it('should return an array of alarms for a specific device', async () => {
      const result: Alarm[] = [];
      jest.spyOn(service, 'findAllAlarmOfDevice').mockResolvedValue(result);

      expect(await controller.findAllAlarmOfDevice('device1')).toBe(result);
    });
  });

  describe('createAlarm', () => {
    it('should create a new alarm', async () => {
      const alarmDto: Alarm = {
        event_type: 'test_event',
        event_id: 'e1',
        value: 100,
        timestamp: new Date().toISOString(),
        params: {},
        version: 'v1',
      };
      jest.spyOn(service, 'createAlarm').mockResolvedValue(alarmDto);
      expect(await controller.createAlarm(alarmDto)).toBe(alarmDto);
    });
  });

  describe('updateAlarm', () => {
    it('should update an alarm', async () => {
      const updateDto: UpdateAlarm = {
        event_type: 'updated_event',
        value: 200,
      };
      const updatedAlarm: Alarm = {
        event_type: updateDto.event_type ?? 'default_event_type',
        event_id: 'e1',
        value: updateDto.value ?? 0,
        timestamp: new Date().toISOString(),
        params: {},
        version: 'v1',
      };

      jest.spyOn(service, 'updateAlarm').mockResolvedValue(updatedAlarm);
      expect(await controller.updateAlarm('a1', updateDto)).toBe(updatedAlarm);
    });
  });

  describe('deleteAlarm', () => {
    it('should delete an alarm', async () => {
      const result = { success: true };
      jest.spyOn(service, 'deleteAlarm').mockResolvedValue(result as any);
      expect(await controller.deleteAlarm('a1')).toBe(result);
    });
  });
});
