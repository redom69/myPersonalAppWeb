import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { ToggleUserActiveDto, UsersView, UserTable } from './dto/user.dto';
import { AuthenticatedGuard, GetUser } from '../guards/authenticated.guard';
import { UserTokenDto } from '../my-account/dto/dto';
import { Organization } from '../admin/dto/dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Finds and returns all users along with their organization creation permissions.
   * The response is encapsulated in the UsersView object.
   * @param user - The authenticated user DTO obtained through the @GetUser() decorator.
   * @returns UsersView - An object containing the permission flag and the list of users.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieves all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users and organization creation permissions',
    type: UsersView,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  findAll(@GetUser() user: UserTokenDto): Promise<UserTable[]> {
    return this.usersService.findAll(user);
  }

  /**
   * Toggles the 'active' status of a user.
   * @param data - DTO containing the 'active' status and the UUID of the user to be updated.
   * @returns Boolean - The result of the status change.
   */
  @Post('active')
  @ApiOperation({ summary: 'Toggles the active status of a user' })
  @ApiBody({
    type: ToggleUserActiveDto,
    description: 'User active status data',
    required: true,
    schema: { example: { u_id: '123', active: true } },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User active status updated',
  })
  toggleActiveUser(@Body() data: ToggleUserActiveDto): Promise<boolean> {
    return this.usersService.toggleActiveUser(data);
  }

  /**
   * Retrieves organization information based on the provided ID.
   * @param id - The UUID of the organization to retrieve.
   * @returns - The data of the found organization.
   */
  @Get('organizations/:id')
  @ApiOperation({
    summary: 'Retrieves organization information',
  })
  @ApiParam({ name: 'id', type: String, description: 'Organization UUID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Organization data',
    type: Organization,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  getOrganization(@Param('id') id: string): Promise<Organization> {
    return this.usersService.getOrganization(id);
  }
}
