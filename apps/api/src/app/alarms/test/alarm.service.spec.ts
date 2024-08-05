import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, NotFoundException } from '@nestjs/common';

import { AlarmService } from '../alarms.service';
import { Alarm, UpdateAlarm } from '../dto/alarms.dto';

import { prisma } from '@marsinet/server';

// Mocking prisma
jest.mock('@marsinet/server', () => ({
  prisma: {
    alarms: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('AlarmService', () => {
  let service: AlarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlarmService],
    }).compile();

    service = module.get<AlarmService>(AlarmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAlarm', () => {
    it('should create a new alarm', async () => {
      const alarm: Alarm = {
        event_type: 'event_type',
        event_id: 'event_id',
        value: 1,
        timestamp: new Date(),
        version: 'version',
        i_id: 'i_id',
        params: null,
      };
      (prisma.alarms.create as jest.Mock).mockResolvedValue(alarm);

      expect(await service.createAlarm(alarm)).toEqual(alarm);
    });

    it('should throw an error if creation fails', async () => {
      const alarm: Alarm = {
        event_type: 'event_type',
        event_id: 'event_id',
        value: 1,
        timestamp: new Date(),
        version: 'version',
        i_id: 'i_id',
        params: null,
      };
      (prisma.alarms.create as jest.Mock).mockRejectedValue(
        new Error('Creation failed')
      );

      await expect(service.createAlarm(alarm)).rejects.toThrow(
        new HttpException('Error creating alarm', 500)
      );
    });
  });

  describe('findAllAlarmOfDevicePerDay', () => {
    it('should return all alarms for a device on a specific day', async () => {
      const device_id = 'device_id';
      const date = new Date();
      const alarms: Alarm[] = [
        {
          event_type: 'event_type',
          event_id: 'event_id',
          value: 1,
          timestamp: new Date(),
          version: 'version',
          i_id: 'i_id',
          params: null,
        },
      ];
      (prisma.alarms.findMany as jest.Mock).mockResolvedValue(alarms);

      expect(await service.findAllAlarmOfDevicePerDay(device_id, date)).toEqual(
        alarms
      );
    });

    it('should return an empty array if no alarms are found', async () => {
      const device_id = 'device_id';
      const date = new Date();
      (prisma.alarms.findMany as jest.Mock).mockResolvedValue([]);

      expect(await service.findAllAlarmOfDevicePerDay(device_id, date)).toEqual(
        []
      );
    });
  });

  describe('findAllAlarmOfDevice', () => {
    it('should return all alarms for a device', async () => {
      const device_id = 'device_id';
      const alarms: Alarm[] = [
        {
          event_type: 'event_type',
          event_id: 'event_id',
          value: 1,
          timestamp: new Date(),
          version: 'version',
          i_id: 'i_id',
          params: null,
        },
      ];
      (prisma.alarms.findMany as jest.Mock).mockResolvedValue(alarms);

      expect(await service.findAllAlarmOfDevice(device_id)).toEqual(alarms);
    });

    it('should throw an exception if no alarms are found', async () => {
      const device_id = 'device_id';
      (prisma.alarms.findMany as jest.Mock).mockResolvedValue([]);

      await expect(service.findAllAlarmOfDevice(device_id)).rejects.toThrow(
        new NotFoundException('No alarms found for this device.')
      );
    });
  });

  describe('findAllAlarms', () => {
    it('should return all alarms', async () => {
      const alarms: Alarm[] = [
        {
          event_type: 'event_type',
          event_id: 'event_id',
          value: 1,
          timestamp: new Date(),
          version: 'version',
          i_id: 'i_id',
          params: null,
        },
      ];
      (prisma.alarms.findMany as jest.Mock).mockResolvedValue(alarms);

      expect(await service.findAllAlarms()).toEqual(alarms);
    });

    it('should throw an exception if no alarms are found', async () => {
      (prisma.alarms.findMany as jest.Mock).mockResolvedValue([]);

      await expect(service.findAllAlarms()).rejects.toThrow(
        new NotFoundException('No alarms found.')
      );
    });
  });

  describe('findAlarmById', () => {
    it('should return an alarm by ID', async () => {
      const id = 'id';
      const alarm: Alarm = {
        event_type: 'event_type',
        event_id: 'event_id',
        value: 1,
        timestamp: new Date(),
        version: 'version',
        i_id: 'i_id',
        params: null,
      };
      (prisma.alarms.findUnique as jest.Mock).mockResolvedValue(alarm);

      expect(await service.findAlarmById(id)).toEqual(alarm);
    });

    it('should throw an exception if the alarm is not found', async () => {
      const id = 'id';
      (prisma.alarms.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findAlarmById(id)).rejects.toThrow(
        new NotFoundException(`Alarm with id ${id} not found.`)
      );
    });
  });

  describe('updateAlarm', () => {
    const existingAlarm: Alarm = {
      event_type: 'event_type',
      event_id: 'event_id',
      value: 1,
      timestamp: new Date(),
      version: 'version',
      i_id: 'i_id',
      params: null,
    };

    beforeEach(() => {
      (prisma.alarms.findUnique as jest.Mock).mockResolvedValue(existingAlarm);
    });

    it('should update event_type of an existing alarm', async () => {
      const id = 'id';
      const updateData: UpdateAlarm = {
        event_type: 'new_event_type',
      };
      const updatedAlarm = { ...existingAlarm, event_type: 'new_event_type' };

      (prisma.alarms.update as jest.Mock).mockResolvedValue(updatedAlarm);

      expect(await service.updateAlarm(id, updateData)).toEqual(updatedAlarm);
    });

    it('should update event_id of an existing alarm', async () => {
      const id = 'id';
      const updateData: UpdateAlarm = {
        event_id: 'new_event_id',
      };
      const updatedAlarm = { ...existingAlarm, event_id: 'new_event_id' };

      (prisma.alarms.update as jest.Mock).mockResolvedValue(updatedAlarm);

      expect(await service.updateAlarm(id, updateData)).toEqual(updatedAlarm);
    });

    it('should update value of an existing alarm', async () => {
      const id = 'id';
      const updateData: UpdateAlarm = {
        value: 2,
      };
      const updatedAlarm = { ...existingAlarm, value: 2 };

      (prisma.alarms.update as jest.Mock).mockResolvedValue(updatedAlarm);

      expect(await service.updateAlarm(id, updateData)).toEqual(updatedAlarm);
    });

    it('should update timestamp of an existing alarm', async () => {
      const id = 'id';
      const newTimestamp = new Date();
      const updateData: UpdateAlarm = {
        timestamp: newTimestamp,
      };
      const updatedAlarm = { ...existingAlarm, timestamp: newTimestamp };

      (prisma.alarms.update as jest.Mock).mockResolvedValue(updatedAlarm);

      expect(await service.updateAlarm(id, updateData)).toEqual(updatedAlarm);
    });

    it('should update params of an existing alarm', async () => {
      const id = 'id';
      const newParams = { param1: 'value1' };
      const updateData: UpdateAlarm = {
        params: newParams,
      };
      const updatedAlarm = { ...existingAlarm, params: newParams };

      (prisma.alarms.update as jest.Mock).mockResolvedValue(updatedAlarm);

      expect(await service.updateAlarm(id, updateData)).toEqual(updatedAlarm);
    });

    it('should update version of an existing alarm', async () => {
      const id = 'id';
      const updateData: UpdateAlarm = {
        version: 'new_version',
      };
      const updatedAlarm = { ...existingAlarm, version: 'new_version' };

      (prisma.alarms.update as jest.Mock).mockResolvedValue(updatedAlarm);

      expect(await service.updateAlarm(id, updateData)).toEqual(updatedAlarm);
    });

    it('should update i_id of an existing alarm', async () => {
      const id = 'id';
      const updateData: UpdateAlarm = {
        i_id: 'new_i_id',
      };
      const updatedAlarm = { ...existingAlarm, i_id: 'new_i_id' };

      (prisma.alarms.update as jest.Mock).mockResolvedValue(updatedAlarm);

      expect(await service.updateAlarm(id, updateData)).toEqual(updatedAlarm);
    });

    it('should throw an exception if the alarm is not found', async () => {
      const id = 'id';
      const updateData: UpdateAlarm = {
        event_type: 'new_event_type',
      };
      (prisma.alarms.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.updateAlarm(id, updateData)).rejects.toThrow(
        new NotFoundException(`Alarm with id ${id} not found.`)
      );
    });
  });

  describe('deleteAlarm', () => {
    it('should delete an alarm by ID', async () => {
      const id = 'id';
      const existingAlarm: Alarm = {
        event_type: 'event_type',
        event_id: 'event_id',
        value: 1,
        timestamp: new Date(),
        version: 'version',
        i_id: 'i_id',
        params: null,
      };
      (prisma.alarms.findUnique as jest.Mock).mockResolvedValue(existingAlarm);
      (prisma.alarms.delete as jest.Mock).mockResolvedValue(null);

      await service.deleteAlarm(id);
      expect(prisma.alarms.delete).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an exception if the alarm is not found', async () => {
      const id = 'id';
      (prisma.alarms.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.deleteAlarm(id)).rejects.toThrow(
        new NotFoundException(`Alarm with id ${id} not found.`)
      );
    });
  });
});
