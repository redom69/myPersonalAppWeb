import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { SessionService } from './session.service';
import { ApiResponse, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { Session } from './dto/session.dto';

@ApiTags('Sessions')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  /**
   * Get all sessions of a device.
   * @param device_id The device ID.
   * @returns The sessions of a device.
   * @throws {Error} If the device is not found.
   */

  @Get('of-device/:device_id')
  @ApiOperation({
    summary: 'Get all sessions of a device',
  })
  @ApiParam({
    name: 'device_id',
    description: 'Device ID',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    description: 'Sessions of a device',
    status: HttpStatus.OK,
    type: Session,
  })
  @ApiResponse({
    description: 'Device not found',
    status: HttpStatus.NOT_FOUND,
  })
  async findAllSessionsOfDevice(@Param('device_id') device_id: string) {
    return this.sessionService.findAllSessionsOfDevice(device_id);
  }

  /**
   * Get all sessions of a patient.
   * @param patient_id The patient ID.
   * @returns The sessions of a patient.
   * @throws {Error} If the patient is not found.
   */

  @Get('of-patient/:patient_id')
  @ApiOperation({
    summary: 'Get all sessions of a patient',
  })
  @ApiParam({
    name: 'patient_id',
    description: 'Patient ID',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    description: 'Sessions of a patient',
    status: HttpStatus.OK,
    type: Session,
  })
  @ApiResponse({
    description: 'Patient not found',
    status: HttpStatus.NOT_FOUND,
  })
  async findAllSessionsOfPatient(@Param('patient_id') patient_id: string) {
    return this.sessionService.findAllSessionsOfPatient(patient_id);
  }
}
