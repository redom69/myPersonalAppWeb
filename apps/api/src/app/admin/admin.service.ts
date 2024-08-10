import {
  generate_reset_token_password_and_send_email_new_admin_clinic,
  hash_password,
  prisma,
} from '@mypaw/server';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateOrganization,
  CreateUser,
  UpdateOrganizationDto,
  UpdateUser,
} from './dto/dto';

@Injectable()
export class AdminService {
  /**
   * Retrieves all organizations ordered by name.
   * @returns A promise resolved with the list of organizations.
   */
  async allOrganizations() {
    return prisma.organizations.findMany({ orderBy: { name: 'asc' } });
  }

  /**
   * Finds a single organization by its ID.
   * @param organization_id The unique identifier of the organization.
   * @throws Will throw an error if the organization is not found.
   * @returns A promise resolved with the organization data.
   */
  async findOneOrganization(organization_id: string) {
    const organization = await prisma.organizations.findUnique({
      where: { o_id: organization_id },
    });
    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }
    return organization;
  }

  /**
   * Creates a new organization with initial admin user details.
   * @param data The creation data for the organization and admin user.
   * @throws Will throw an error if the creation fails.
   * @returns A promise resolved with the created organization details.
   */
  async createOrganization(data: CreateOrganization) {
    try {
      // Create organization and add device
      const organization = await prisma.organizations.create({
        data: {
          name: data.name_organization,
          city: data.city,
          country: data.country,
          postal_code: data.postal_code,
          street_name: data.street_name,
          street_number: data.street_number,
          role: data.role,
          premium: false,
        },
      });

      return {
        organization,
      };
    } catch (error) {
      throw new HttpException(
        'Algo inesperado ocurrió',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /**
   * Updates an organization's details.
   * @param organization_id The ID of the organization to update.
   * @param data New data to update the organization.
   * @returns A promise resolved with the updated organization.
   */

  async updateOrganization(
    organization_id: string,
    data: UpdateOrganizationDto
  ) {
    const organization = await prisma.organizations.findUnique({
      where: { o_id: organization_id },
    });

    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    return prisma.organizations.update({
      where: { o_id: organization_id },
      data: { ...data },
    });
  }

  /**
   * Deletes an organization by its ID.
   * @param organization_id The ID of the organization to delete.
   * @throws Will throw an error if the organization is not found.
   * @returns A promise resolved with a boolean indicating successful deletion.
   */
  async deleteOrganization(organization_id: string) {
    const organization = await prisma.organizations.findUnique({
      where: { o_id: organization_id },
    });

    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    await prisma.organization_has_device.deleteMany({
      where: { o_id: organization_id },
    });

    await prisma.organizations.delete({
      where: { o_id: organization_id },
    });

    return true;
  }

  /**
   * Toggles the premium status of an organization.
   * @param organization_id The unique identifier of the organization.
   * @throws Error if the organization is not found.
   * @returns The updated organization with the new premium status.
   */
  async organizationTogglePremium(organization_id: string) {
    const organization = await prisma.organizations.findUnique({
      where: { o_id: organization_id },
    });
    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    return prisma.organizations.update({
      where: { o_id: organization_id },
      data: { premium: !organization.premium },
    });
  }

  /**
   * Retrieves all devices belonging to an organization.
   * @param organization_id The unique identifier of the organization.
   * @throws Error if the organization or its devices are not found.
   * @returns An array of devices associated with the organization.
   */
  async deviesOfOrganization(organization_id: string) {
    const organizationWithDevices = await prisma.organizations.findUnique({
      where: { o_id: organization_id },
      include: {
        organization_has_device: {
          select: {
            devices: true,
          },
        },
      },
    });

    if (!organizationWithDevices) {
      throw new Error('Organization not found');
    }

    const devices = organizationWithDevices.organization_has_device.map(
      (association) => association.devices
    );

    return devices;
  }

  /**
   * Updates the data of a specific user.
   * @param user_id The unique identifier of the user to be updated.
   * @param data The new data for the user.
   * @throws HttpException if no valid data is provided or if the user is not found.
   * @returns The updated or newly created user data.
   */
  async updateUserData(user_id: string, data: UpdateUser) {
    const user = await prisma.user.findUnique({
      where: {
        u_id: user_id,
      },
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const baseData = {
      ...(data.name ? { name: data.name } : {}), // Añadir 'name' solo si existe y es válido
      ...(data.surnames ? { surnames: data.surnames } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.birth_date ? { birth_date: new Date(data.birth_date) } : {}),
      ...(data.nationality ? { nationality: data.nationality } : {}),
    };

    if (Object.keys(baseData).length === 0) {
      throw new Error('No valid data provided to update or create user data.');
    }

    try {
      return await prisma.user_data.upsert({
        where: { u_id: user_id },
        update: baseData,
        create: {
          u_id: user_id,
          ...baseData,
        },
      });
    } catch (error) {
      console.error('Error al intentar actualizar o crear', error);
      throw new HttpException(
        'Error al actualizar o crear',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /**
   * Creates a new user within an organization.
   * @param data Data required to create a new user.
   * @throws HttpException if the organization or email is not valid.
   * @returns A boolean indicating if the creation was successful.
   */
  async createUser(data: CreateUser): Promise<boolean> {
    const {
      name,
      surnames,
      email,
      birth_date,
      nationality,
      password: _password,
      phone,
      organization_id,
    } = data;
    const password = await hash_password(_password);

    const organization = await prisma.organizations.findUnique({
      where: { o_id: organization_id },
    });

    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }

    const users = await prisma.user.findMany({
      where: {
        o_id: organization_id,
      },
    });

    await prisma.user.create({
      data: {
        email,
        password,
        is_admin: users.length === 0,
        o_id: organization_id,
        active: users.length === 0,
        user_data: {
          create: {
            birth_date: new Date(birth_date),
            name,
            surnames,
            nationality,
            phone: phone,
          },
        },
      },
    });

    await generate_reset_token_password_and_send_email_new_admin_clinic(email);

    return true;
  }

  /**
   * Deletes a user by their unique identifier.
   * @param user_id The unique identifier of the user to delete.
   * @throws If the user does not exist.
   * @returns A boolean indicating if the deletion was successful.
   */
  async deleteUser(user_id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        u_id: user_id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userData = await prisma.user_data.findUnique({
      where: {
        u_id: user_id,
      },
    });

    if (userData) {
      await prisma.user_data.delete({
        where: {
          u_id: user_id,
        },
      });
    }

    await prisma.user.delete({
      where: {
        u_id: user_id,
      },
    });

    return true;
  }

  /**
   * Finds a single user by their unique identifier.
   * @param user_id The unique identifier of the user to find.
   * @throws If the user does not exist.
   * @returns The user data if found.
   */
  async findOneUser(user_id: string) {
    const user = await prisma.user.findUnique({
      where: {
        u_id: user_id,
      },
      include: {
        user_data: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
