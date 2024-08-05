import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import {
  CreateOrganization,
  CreateUser,
  DevicesOfOrganization,
  Organization,
  UpdateOrganizationDto,
  UpdateUser,
  UsersView,
} from './dto/dto';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(AuthenticatedGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Retrieves a list of all organizations.
   * @returns Promise<Organization[]> - An array of organization entities.
   */
  @Get('organizations')
  @ApiOperation({ summary: 'Retrieves all organizations' })
  @ApiResponse({
    status: 200,
    description: 'List of organizations',
    type: [Organization],
  })
  allOrganizations(): Promise<Organization[]> {
    return this.adminService.allOrganizations();
  }

  /**
   * Creates a new organization along with an admin user.
   * @param data - Data needed to create an organization with an admin user.
   * @returns The created organization data.
   */
  @Post('organizations/create')
  @ApiOperation({ summary: 'Creates a new organization' })
  @ApiBody({ description: 'Organization data', type: CreateOrganization })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Organization created',
    type: CreateOrganization,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error creating organization',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  createOrganization(@Body() data: CreateOrganization) {
    return this.adminService.createOrganization(data);
  }

  /**
   * Updates the information of an existing organization.
   * @param organization_id - The unique identifier of the organization to update.
   * @param data - Updated organization data.
   * @returns Promise<Organization> - The updated organization entity.
   */
  @Post('organization/:organization_id/update')
  @ApiOperation({ summary: 'Updates an organization' })
  @ApiParam({
    name: 'organization_id',
    description: 'Organization ID',
    type: 'string',
  })
  @ApiBody({ description: 'Organization data', type: UpdateOrganizationDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Organization updated',
    type: Organization,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error updating organization',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  updateOrganization(
    @Param('organization_id') organization_id: string,
    @Body() data: UpdateOrganizationDto
  ): Promise<Organization> {
    return this.adminService.updateOrganization(organization_id, data);
  }

  /**
   * Toggles the premium status of an organization.
   * @param organization_id - The unique identifier of the organization.
   */
  @Post('organization/:organization_id/toggle-premium')
  @ApiOperation({ summary: 'Toggles the premium status of an organization' })
  @ApiParam({
    name: 'organization_id',
    description: 'Organization ID',
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Organization premium status toggled',
    type: Organization,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error toggling premium status',
  })
  organizationTogglePremium(@Param('organization_id') organization_id: string) {
    return this.adminService.organizationTogglePremium(organization_id);
  }

  /**
   * Retrieves all devices associated with an organization.
   * @param organization_id - The unique identifier of the organization.
   * @returns An array of devices that belong to the organization.
   */
  @Get('organization/:organization_id/devices')
  @ApiOperation({ summary: 'Retrieves all devices of an organization' })
  @ApiParam({
    name: 'organization_id',
    description: 'Organization ID',
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of devices of organizations',
    type: [DevicesOfOrganization],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error retrieving devices',
  })
  findAllDevicesOfOrganization(
    @Param('organization_id') organization_id: string
  ) {
    return this.adminService.deviesOfOrganization(organization_id);
  }

  /**
   * Retrieves data for a single organization.
   * @param organization_id - The unique identifier of the organization to find.
   * @returns The organization data.
   */
  @Get('organization/:organization_id')
  @ApiOperation({ summary: 'Retrieves a single organization' })
  @ApiParam({
    name: 'organization_id',
    description: 'Organization ID',
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Organization data',
    type: Organization,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error retrieving organization',
  })
  findOneOrganization(@Param('organization_id') organization_id: string) {
    return this.adminService.findOneOrganization(organization_id);
  }

  /**
   * Deletes an organization.
   * @param organization_id - The unique identifier of the organization to delete.
   */
  @Delete('organization/:organization_id/delete')
  @ApiOperation({ summary: 'Deletes an organization' })
  @ApiParam({
    name: 'organization_id',
    description: 'Organization ID',
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Organization deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error deleting organization',
  })
  deleteOrganization(@Param('organization_id') organization_id: string) {
    return this.adminService.deleteOrganization(organization_id);
  }

  /**
   * Retrieves data for a single user.
   * @param user_id - The unique identifier of the user to find.
   * @returns The user view data including user details and permissions.
   */
  @Get('users/:user_id')
  @ApiOperation({ summary: 'Retrieves a single user' })
  @ApiParam({
    name: 'user_id',
    description: 'User ID',
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User data',
    type: UsersView,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error retrieving user',
  })
  findOneUser(@Param('user_id') user_id: string) {
    return this.adminService.findOneUser(user_id);
  }

  /**
   * Updates a user's data.
   * @param id - The unique identifier of the user to update.
   * @param data - The updated user data.
   * @returns A boolean indicating if the update was successful.
   */
  @Post('users/update/:id')
  @ApiOperation({ summary: 'Updates a user' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: 'string',
  })
  @ApiBody({ description: 'User data', type: UsersView })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User data updated',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error updating user',
  })
  updateUserData(@Param('id') id: string, @Body() data: UpdateUser) {
    return this.adminService.updateUserData(id, data);
  }

  /**
   * Creates a new user.
   * @param data - Data needed to create a new user.
   * @returns A boolean indicating if the creation was successful.
   */
  @Post('users/create')
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({ description: 'User data', type: CreateUser })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error creating user',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  createUser(@Body() data: CreateUser) {
    return this.adminService.createUser(data);
  }

  /**
   * Deletes a user.
   * @param id - The unique identifier of the user to delete.
   * @returns A boolean indicating if the deletion was successful.
   */
  @Delete('users/delete/:id')
  @ApiOperation({ summary: 'Deletes a user' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error deleting user',
  })
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }
}
