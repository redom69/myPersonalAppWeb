import {
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  HttpStatus,
  Query,
  NotFoundException,
} from '@nestjs/common';

import { AlarmService } from './alarms.service';
import { Alarm, UpdateAlarm } from './dto/alarms.dto';

@ApiTags('Alarm')
@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  /**
   * Retrieves all alarms.
   * @returns An array of all alarms.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieves all alarms' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all alarms',
    type: Alarm,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No alarms found',
  })
  async findAll() {
    return this.alarmService.findAllAlarms();
  }

  /**
   * Retrieves all alarms for a given device.
   * @param device_id The unique identifier for the device.
   * @returns An array of alarms associated with the device.
   */
  @Get('of-device-per-day/:device_id')
  @ApiOperation({
    summary: 'Retrieves all alarms for a specific device',
  })
  @ApiParam({
    name: 'device_id',
    required: true,
    description: 'Unique device identifier',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    description: 'Date to filter alarms',
  })
  @ApiResponse({
    description: 'List of alarms for the specified device',
    type: Alarm,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found',
  })
  async findAllAlarmOfDevicePerDay(
    @Param('device_id') device_id: string,
    @Query('date') date: string
  ) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new NotFoundException('Invalid date format.');
    }

    return this.alarmService.findAllAlarmOfDevicePerDay(device_id, parsedDate);
  }

  /**
   * Retrieves all alarms for a given device.
   * @param device_id The unique identifier for the device.
   * @returns An array of alarms associated with the device.
   */
  @Get('of-device/:device_id')
  @ApiOperation({
    summary: 'Retrieves all alarms for a specific device',
  })
  @ApiParam({
    name: 'device_id',
    required: true,
    description: 'Unique device identifier',
  })
  @ApiResponse({
    description: 'List of alarms for the specified device',
    type: Alarm,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found',
  })
  async findAllAlarmOfDevice(@Param('device_id') device_id: string) {
    return this.alarmService.findAllAlarmOfDevice(device_id);
  }

  /**
   * Creates a new alarm.
   * @param id The unique identifier of the alarm.
   * @returns The alarm entity.
   */
  @Post()
  @ApiOperation({
    summary: 'Create a new alarm',
  })
  @ApiBody({
    type: Alarm,
    description: 'Alarm data',
  })
  @ApiResponse({
    description: 'Alarm created successfully',
    type: Alarm,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid alarm data',
  })
  async createAlarm(@Body() alarm: Alarm) {
    return this.alarmService.createAlarm(alarm);
  }

  /**
   * Updates an alarm by its unique identifier.
   * @param id
   * @param updatedAlarm
   * @returns
   */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update an alarm by ID',
  })
  @ApiBody({
    type: UpdateAlarm,
    description: 'Updated alarm data',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique alarm identifier',
  })
  @ApiResponse({
    description: 'Alarm updated successfully',
    type: Alarm,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid alarm data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Alarm not found',
  })
  async updateAlarm(
    @Param('id') id: string,
    @Body() updatedAlarm: UpdateAlarm
  ) {
    return this.alarmService.updateAlarm(id, updatedAlarm);
  }

  /**
   * Deletes an alarm by its unique identifier.
   * @param id
   * @returns
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an alarm by ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique alarm identifier',
  })
  @ApiResponse({
    description: 'Alarm deleted successfully',
    type: Alarm,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Alarm not found',
  })
  async deleteAlarm(@Param('id') id: string) {
    return this.alarmService.deleteAlarm(id);
  }
}
