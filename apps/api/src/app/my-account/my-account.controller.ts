import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  UserUpdateDto,
  MyAccount,
  GetMenuInfo,
  MyDevices,
  OrganizationUpdateDto,
  UserTokenDto,
} from './dto/dto';
import { AuthenticatedGuard, GetUser } from '../guards/authenticated.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MyAccountService } from './my-account.service';

@ApiTags('MyAccount')
@ApiBearerAuth()
@Controller('my-account')
@UseGuards(AuthenticatedGuard)
export class MyAccountController {
  constructor(private readonly myAccountService: MyAccountService) {}

  /**
   * Get user account data.
   * @param user The user token.
   * @returns The user account data.
   */
  @Get()
  @ApiOperation({ summary: 'Get user account data' })
  @ApiResponse({
    description: 'User account data',
    type: MyAccount,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'User account not found',
    status: HttpStatus.NOT_FOUND,
  })
  getData(@GetUser() user: UserTokenDto) {
    return this.myAccountService.getData(user.u_id);
  }

  /**
   * Update user account data.
   * @param userData The user data to update.
   * @param user The user token.
   * @returns The updated user account data.
   * @throws {Error} If the user data is invalid.
   * @throws {Error} If the user account data cannot be updated.
   * @throws {Error} If the user account data cannot be found.
   */
  @Post()
  @ApiOperation({ summary: 'Update user account data' })
  @ApiBody({
    type: UserUpdateDto,
    description: 'User data to update',
    required: true,
  })
  @ApiResponse({
    description: 'Updated user account data',
    type: MyAccount,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'User account not found',
    status: HttpStatus.NOT_FOUND,
  })
  update(@Body() userData: UserUpdateDto, @GetUser() user: UserTokenDto) {
    return this.myAccountService.update(user.u_id, userData);
  }

  /**
   * Get menu of user.
   * @param user The user token.
   * @returns The menu of user.
   * @throws {Error} If the user account data cannot be found.
   * @throws {Error} If the user account data cannot be updated.
   * @throws {Error} If the user data is invalid.
   *
   */
  @Get('menu')
  @ApiOperation({ summary: 'Get menu of user' })
  @ApiResponse({
    description: 'Get menu of user',
    type: GetMenuInfo,
    status: HttpStatus.OK,
  })
  getMenu(@GetUser() user: UserTokenDto) {
    return this.myAccountService.getMenu(user);
  }

  /**
   * Get devices access of user.
   * @param user The user token.
   * @returns The devices access of user.
   * @throws {Error} If the user account data cannot be found.
   * @throws {Error} If the user account data cannot be updated.
   * @throws {Error} If the user data is invalid.
   *
   */
  @Get('my-devices')
  @ApiOperation({ summary: 'Get devices access of user' })
  @ApiResponse({
    description: 'Devices access of user',
    type: MyDevices,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'User organization not found',
    status: HttpStatus.NOT_FOUND,
  })
  getMyDevices(@GetUser() user: UserTokenDto) {
    return this.myAccountService.getMyDevices(user.u_id);
  }

  /**
   * Add device to my account.
   * @param user The user token.
   * @param device_id The device id.
   * @returns The devices access of user.
   * @throws {Error} If the user account data cannot be found.
   * @throws {Error} If the user account data cannot be updated.
   * @throws {Error} If the user data is invalid.
   */
  @Post('add-device/:device_id')
  @ApiOperation({ summary: 'Add device to my account' })
  @ApiParam({
    name: 'device_id',
    description: 'Device ID',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    description: 'Devices access of user',
    type: MyDevices,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Device is already associated with an organization',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'User does not belong to any organization',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Device not found',
    status: HttpStatus.NOT_FOUND,
  })
  addDeviceToMyAccount(
    @GetUser() user: UserTokenDto,
    @Param('device_id') device_id: string
  ) {
    return this.myAccountService.addDeviceToMyAccount(user.u_id, device_id);
  }

  /**
   * Update organization.
   * @param user The user token.
   * @param organization_id The organization id.
   * @param organizationUpdate The organization data to update.
   * @returns The updated organization.
   * @throws {Error} If the user account data cannot be found.
   */
  @Post('update-organization/:organization_id')
  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({
    description: 'Updated organization',
    type: MyAccount,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'User organization not found',
    status: HttpStatus.NOT_FOUND,
  })
  updateOrganization(
    @GetUser() user: UserTokenDto,
    @Param('organization_id') organization_id: string,
    @Body() organizationUpdate: OrganizationUpdateDto
  ) {
    return this.myAccountService.updateMyOrganization(
      user.u_id,
      organization_id,
      organizationUpdate
    );
  }
}
