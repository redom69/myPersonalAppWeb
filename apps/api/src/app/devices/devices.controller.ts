import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto, DeviceTable } from './dto/create-device.dto';
import {
  UpdateActiveDeviceDto,
  UpdateDeviceDto,
} from './dto/update-device.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { AuthenticatedGuard, GetUser } from '../guards/authenticated.guard';
import { UserTokenDto } from '../my-account/dto/dto';
import { Organization } from '../admin/dto/dto';

@ApiTags('Devices')
@ApiBearerAuth()
@Controller('devices')
@UseGuards(AuthenticatedGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  /**
   * Create a new device.
   * @param createDeviceDto The device to create.
   * @returns The newly created device.
   */

  @Post()
  @ApiOperation({ summary: 'Create a new device' })
  @ApiBody({ type: CreateDeviceDto, description: 'Device data' })
  @ApiResponse({
    description: 'Device created',
    type: DeviceTable,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error creating device.',
  })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  /**
   * Retrieve a device by its ID.
   * @param id The unique identifier for the device.
   * @returns The device with the specified ID.
   */
  @Get('one/:id')
  @ApiOperation({ summary: 'Retrieve a device by its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique device identifier',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Device found',
    type: DeviceTable,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found in your organization',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  findOne(@Param('id') id: string, @GetUser() user: UserTokenDto) {
    return this.devicesService.findOne(id, user);
  }

  /**
   * Retrieve all devices.
   * @returns An array of all devices.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all devices' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of devices',
    type: [DeviceTable],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Devices not found in organization',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error retrieving devices',
  })
  @ApiOperation({ summary: 'Retrieve all devices' })
  findAll(@GetUser() user: UserTokenDto) {
    return this.devicesService.findAll(user);
  }

  /**
   * Retrieve all devices for a given organization.
   * @param id The unique identifier for the organization.
   * @returns An array of devices associated with the organization.
   */
  @Post(':id/active')
  @ApiOperation({
    summary: 'Update the active status of a device',
  })
  @ApiBody({
    type: UpdateActiveDeviceDto,
    description: 'Device active status',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique device identifier',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Device updated',
    type: DeviceTable,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateActiveDeviceDto: UpdateActiveDeviceDto
  ) {
    return this.devicesService.updateActive(id, updateActiveDeviceDto);
  }

  /**
   * Update a device by its unique identifier.
   * @param id The unique identifier of the device.
   * @param updateDeviceDto The updated device.
   * @returns The updated device.
   */
  @Post(':id')
  @ApiOperation({ summary: 'Update a device by its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique device identifier',
  })
  @ApiBody({ type: UpdateDeviceDto, description: 'Device data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Device updated',
    type: DeviceTable,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found in your organization',
  })
  updateDevice(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
    @GetUser() user: UserTokenDto
  ) {
    return this.devicesService.update(id, updateDeviceDto, user);
  }

  /**
   * Delete all device from an organization.
   * @param id The unique identifier of the device.
   * @returns The deleted devices.
   * @throws NotFoundException if the device does not exist.
   * @throws UnauthorizedException if the user does not have permission to delete the device.
   */
  @Delete('all/:id')
  @ApiOperation({ summary: 'Delete all devices from an organization' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique device identifier',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Devices deleted',
    type: [DeviceTable],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found in your organization',
  })
  removeDeviceFromOrganizations(
    @Param('id') id: string,
    @GetUser() user: UserTokenDto
  ) {
    return this.devicesService.removeFromOrg(id, user);
  }

  /**
   * Delete a device by its unique identifier and all relations with the organizations that it belongs.
   * @param id The unique identifier of the device.
   * @returns The deleted device.
   * @throws NotFoundException if the device does not exist.
   * @throws UnauthorizedException if the user does not have permission to delete the device.
   */

  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete a device by its ID and all relations with the organizations that it belongs',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique device identifier',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Device deleted',
    type: DeviceTable,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found in your organization',
  })
  remove(@Param('id') id: string, @GetUser() user: UserTokenDto) {
    return this.devicesService.remove(id, user);
  }

  /**
   * Retrieve all organizations for a given device.
   * @param id The unique identifier for the device.
   * @returns An array of organizations associated with the device.
   */
  @Get('organizations/:id')
  @ApiOperation({
    summary: 'Retrieve all organizations for a given device',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique device identifier',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of organizations',
    type: [Organization],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error retrieving organizations',
  })
  findAllOrganizations(@Param('id') id: string) {
    return this.devicesService.findAllOrganizations(id);
  }

  /**
   * Add a device to an organization.
   * @param device_id The unique identifier for the device.
   * @param organization_id The unique identifier for the organization.
   * @returns The device added to the organization.
   * @throws NotFoundException if the device or organization does not exist.
   * @throws UnauthorizedException if the user does not have permission to add the device to the organization.
   */
  @Post('add-device-to-organization/:serial/:organization_id')
  @ApiOperation({ summary: 'Add a device to an organization' })
  @ApiParam({ name: 'serial', required: true, description: 'Serial number' })
  @ApiParam({
    name: 'organization_id',
    required: true,
    description: 'Organization ID',
  })
  @ApiResponse({
    description: 'Device added to organization',
    type: Boolean,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device or organization not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  addDeviceToOrganization(
    @Param('serial') serial: string,
    @Param('organization_id') organization_id: string,
    @GetUser() user: UserTokenDto
  ) {
    return this.devicesService.addDeviceToOrganization(
      serial,
      organization_id,
      user
    );
  }

  /**
   * Remove a device from an organization.
   * @param device_id The unique identifier for the device.
   * @param organization_id The unique identifier for the organization.
   * @returns The device removed from the organization.
   * @throws NotFoundException if the device or organization does not exist.
   * @throws UnauthorizedException if the user does not have permission to remove the device from the organization.
   */
  @Delete('remove-device-from-organization/:device_id/:organization_id')
  @ApiOperation({ summary: 'Remove a device from an organization' })
  @ApiParam({ name: 'device_id', required: true, description: 'Device ID' })
  @ApiParam({
    name: 'organization_id',
    required: true,
    description: 'Organization ID',
  })
  @ApiResponse({
    description: 'Device removed from organization',
    type: DeviceTable,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device or organization not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Device is not associated with this organization',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  removeDeviceFromOrganization(
    @Param('device_id') device_id: string,
    @Param('organization_id') organization_id: string,
    @GetUser() user: UserTokenDto
  ) {
    return this.devicesService.removeDeviceFromOrganization(
      device_id,
      organization_id,
      user
    );
  }
}
