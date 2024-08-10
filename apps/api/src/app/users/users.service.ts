import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { prisma, sendWelcomeEmailToUser } from '@mypaw/server';

import { ToggleUserActiveDto, UserTable } from './dto/user.dto';
import { UserTokenDto } from '../my-account/dto/dto';
import { Organization } from '../admin/dto/dto';

@Injectable()
export class UsersService {
  /**
   * Finds all users based on the role and organization of the authenticated user.
   * If the user has the role 'admin', all users are returned. Otherwise, only users from the same organization are returned.
   * @param user - The DTO containing the authenticated user's token information.
   * @returns An array of UserTable, each containing detailed user information.
   */
  async findAll(user: UserTokenDto): Promise<UserTable[]> {
    const organization = await prisma.organizations.findFirst({
      where: { o_id: user.o_id },
    });

    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }
    let users = [];

    if (user.role === 'admin') {
      users = await prisma.user.findMany({
        include: {
          user_data: true,
          organizations: true,
        },
      });
    } else {
      users = await prisma.user.findMany({
        where: {
          o_id: organization.o_id,
        },
        include: {
          user_data: true,
          organizations: true,
        },
      });
    }

    return users.map((user) => ({
      u_id: user.u_id,
      name: user.user_data?.name,
      surnames: user.user_data?.surnames,
      email: user.email,
      o_id: user.o_id,
      is_admin: user.is_admin,
      active: user.active,
      role: user.organizations?.role,
    }));
  }

  /**
   * Retrieves organization information based on the user's ID.
   * @param id - The unique identifier for the user.
   * @returns The organization details associated with the user.
   * @throws Error if no user is found with the given ID.
   */
  async getOrganization(id: string): Promise<Organization> {
    const user = await prisma.user.findFirst({
      where: {
        u_id: id,
      },
      include: {
        organizations: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.organizations;
  }

  /**
   * Toggles the active status of a user.
   * @param data - DTO containing the user's UUID and the new active status.
   * @returns A boolean indicating whether the update was successful.
   * @throws Error if there is an issue updating the user.
   */
  async toggleActiveUser(data: ToggleUserActiveDto): Promise<boolean> {
    try {
      const user = await prisma.user.update({
        where: {
          u_id: data.u_id,
        },
        data: {
          active: data.active,
        },
      });

      if (data.active) {
        await sendWelcomeEmailToUser(user.email).catch(() => {
          console.error('Error sending email');
        });
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
