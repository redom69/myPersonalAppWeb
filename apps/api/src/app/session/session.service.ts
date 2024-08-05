import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Session } from './dto/session.dto';
import { prisma } from '@marsinet/server';
import { processSessionsByPatient } from '@marsinet/commons';

@Injectable()
export class SessionService {
  async findAllSessionsOfDevice(device_id: string): Promise<Session[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const device = await prisma.devices.findFirst({
      where: {
        d_id: device_id,
      },
    });

    if (!device) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessions: any[] = await prisma.sessions.findMany({
      where: {
        d_id: device_id,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return processSessionsByPatient(sessions);
  }

  async findAllSessionsOfPatient(patient_id: string): Promise<Session[]> {
    const patient = await prisma.patients.findFirst({
      where: {
        p_id: patient_id,
      },
    });

    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessions: any[] = await prisma.sessions.findMany({
      where: {
        p_id: patient_id,
      },
    });
    return sessions;
  }
}
