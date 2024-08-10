import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from '@mypaw/server';

import { Alarm, UpdateAlarm } from './dto/alarms.dto';

@Injectable()
export class AlarmService {
  /**
   * Creates a new alarm.
   * @param alarm The alarm data to create.
   * @returns A promise resolved with the created alarm.
   * @throws Will throw an error if the creation fails.
   */
  async createAlarm(alarm: Alarm): Promise<Alarm> {
    try {
      const createdAlarm = await prisma.alarms.create({ data: alarm });
      return createdAlarm;
    } catch (error) {
      throw new HttpException(
        'Error creating alarm',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Retrieves all alarms for a given device on a specific day.
   * @param device_id The unique identifier for the device.
   * @param date The date for which to retrieve the alarms.
   * @returns An array of alarms associated with the device on the specified date.
   */
  async findAllAlarmOfDevicePerDay(
    device_id: string,
    date: Date
  ): Promise<Alarm[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const alarms = await prisma.alarms.findMany({
      where: {
        ingestion: {
          d_id: device_id,
        },
        timestamp: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return alarms.length ? alarms : [];
  }

  /**
   * Retrieves all alarms for a given device.
   * @param device_id The unique identifier for the device.
   * @returns An array of alarms associated with the device.
   */
  async findAllAlarmOfDevice(device_id: string): Promise<Alarm[]> {
    const alarms = await prisma.alarms.findMany({
      where: {
        ingestion: {
          d_id: device_id,
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    if (!alarms.length) {
      throw new NotFoundException('No alarms found for this device.');
    }

    return alarms;
  }

  /**
   * Retrieves all alarms.
   * @returns An array of all alarms.
   * @throws Will throw an error if the retrieval fails.
   */
  async findAllAlarms(): Promise<Alarm[]> {
    const alarms = await prisma.alarms.findMany();
    if (!alarms.length) {
      throw new NotFoundException('No alarms found.');
    }
    return alarms;
  }

  /**
   * Retrieves an alarm by its unique identifier.
   * @param id The unique identifier of the alarm to find.
   * @returns The alarm data.
   * @throws Will throw an error if the alarm is not found.
   */
  async findAlarmById(id: string): Promise<Alarm> {
    const alarm = await prisma.alarms.findUnique({
      where: {
        id: id,
      },
    });

    if (!alarm) {
      throw new NotFoundException(`Alarm with id ${id} not found.`);
    }
    return alarm;
  }

  /**
   * Updates an alarm.
   * @param id The unique identifier of the alarm.
   * @param updatedAlarm The updated alarm data.
   * @returns The updated alarm entity.
   * @throws Will throw an error if the alarm is not found.
   */
  async updateAlarm(id: string, updatedAlarm: UpdateAlarm): Promise<Alarm> {
    const existingAlarm = await prisma.alarms.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingAlarm) {
      throw new NotFoundException(`Alarm with id ${id} not found.`);
    }

    const updatedData = {
      event_type: updatedAlarm.event_type ?? existingAlarm.event_type,
      event_id: updatedAlarm.event_id ?? existingAlarm.event_id,
      value: updatedAlarm.value ?? existingAlarm.value,
      timestamp: updatedAlarm.timestamp ?? existingAlarm.timestamp,
      params: updatedAlarm.params ?? existingAlarm.params,
      version: updatedAlarm.version ?? existingAlarm.version,
      i_id: updatedAlarm.i_id ?? existingAlarm.i_id,
    };

    const alarm = await prisma.alarms.update({
      where: { id: id },
      data: updatedData,
    });

    return alarm;
  }

  /**
   * Deletes an alarm by its unique identifier.
   * @param id The unique identifier of the alarm to delete.
   * @throws Will throw an error if the alarm is not found.
   */
  async deleteAlarm(id: string): Promise<void> {
    const existingAlarm = await prisma.alarms.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingAlarm) {
      throw new NotFoundException(`Alarm with id ${id} not found.`);
    }

    await prisma.alarms.delete({
      where: {
        id: id,
      },
    });
  }
}
