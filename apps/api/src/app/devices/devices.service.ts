import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeviceDto, DeviceTable } from './dto/create-device.dto';
import {
  UpdateActiveDeviceDto,
  UpdateDeviceDto,
} from './dto/update-device.dto';
import { prisma } from '@mypaw/server';
import { UserTokenDto } from '../my-account/dto/dto';
import { Prisma } from '@prisma/client';
import { Organization } from '../admin/dto/dto';

@Injectable()
export class DevicesService {
  /**
   *  Create a new device.
   * @param createDeviceDto
   * @returns
   */
  async create(createDeviceDto: CreateDeviceDto) {
    const organization = await prisma.organizations.findUnique({
      where: { o_id: createDeviceDto.o_id },
    });

    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    try {
      // Crear el dispositivo
      const device = await prisma.devices.create({
        data: {
          active: false,
          model: createDeviceDto.model,
          serial: createDeviceDto.serial,
          password: createDeviceDto.password,
          structure_version: createDeviceDto.structure_version,
        },
      });

      // Añadir el dispositivo a la organización
      await prisma.organization_has_device.create({
        data: {
          o_id: createDeviceDto.o_id,
          d_id: device.d_id,
        },
      });

      return device;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          error.code === 'P2002' &&
          error.meta &&
          Array.isArray(error.meta.target) &&
          error.meta.target.includes('serial')
        ) {
          throw new HttpException(
            'A device with this serial number already exists',
            HttpStatus.CONFLICT
          );
        }
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Retrieves all devices accessible to the user based on their role.
   * Users with the 'marsi' role can view all devices, whereas others can only view devices within their organization.
   * @param user The user token containing user's role and organization information.
   * @returns An array of device records.
   */
  async findAll(user: UserTokenDto): Promise<DeviceTable[]> {
    // Si el usuario es 'marsi', obtén todos los dispositivos.

    if (user.role === 'marsi') {
      return prisma.devices.findMany();
    } else {
      // Si el usuario tiene otro rol, obtén los dispositivos asociados con su organización.
      const organizationDevices = await prisma.organizations.findUnique({
        where: { o_id: user.o_id },
        include: {
          organization_has_device: {
            select: {
              devices: true, // Suponiendo que hay una relación configurada correctamente en Prisma
            },
          },
        },
      });

      if (!organizationDevices) {
        throw new HttpException(
          'Devices not found in organization',
          HttpStatus.NOT_FOUND
        );
      }

      // Extraer los dispositivos de la estructura de datos resultante.
      return organizationDevices.organization_has_device.map(
        (association) => association.devices
      );
    }
  }

  /**
   * Retrieve a device by its ID.
   * @param id The unique identifier for the device.
   * @returns The device with the specified ID.
   */
  async findOne(id: string, user): Promise<DeviceTable> {
    if (user.role === 'marsi') {
      const device = await prisma.devices.findUnique({
        where: { d_id: id },
      });
      if (!device) {
        throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
      }
      return device;
    }

    const organization = await prisma.organizations.findUnique({
      where: { o_id: user.o_id },
      include: {
        organization_has_device: {
          where: {
            d_id: id,
          },
        },
      },
    });

    if (!organization || organization.organization_has_device.length === 0) {
      throw new HttpException(
        'Device not found in your organization',
        HttpStatus.NOT_FOUND
      );
    }

    const device = await prisma.devices.findUnique({
      where: { d_id: id },
    });

    if (!device) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }

    return device;
  }

  /**
   * Update the active status of a device.
   * @param id The unique identifier for the device.
   * @param updateDeviceDto The updated device.
   * @returns The updated device.
   */
  async updateActive(id: string, updateDeviceDto: UpdateActiveDeviceDto) {
    const device_update = await prisma.devices.update({
      where: {
        d_id: id,
      },
      data: {
        ...updateDeviceDto,
      },
    });

    if (!device_update) {
      throw new NotFoundException(`Device #${id} not found`);
    }
    return device_update;
  }

  /**
   * Update a device by its unique identifier.
   * @param id The unique identifier of the device.
   * @param updateDeviceDto The updated device.
   * @returns The updated device.
   * @throws Error if the user does not have permission to update the device.
   * @throws Error if the device does not exist in the user's organization.
   */
  async update(
    id: string,
    updateDeviceDto: UpdateDeviceDto,
    user: UserTokenDto
  ) {
    // Verificar el rol del usuario para determinar el permiso de actualización
    if (user.role !== 'marsi') {
      // Si el usuario no es 'marsi', verifica si el dispositivo pertenece a su organización
      const deviceAssociation = await prisma.organization_has_device.findUnique(
        {
          where: {
            o_id_d_id: {
              o_id: user.o_id,
              d_id: id,
            },
          },
        }
      );

      // Si no se encuentra el dispositivo en la organización del usuario, arroja un error
      if (!deviceAssociation) {
        throw new HttpException(
          'Device not found in your organization',
          HttpStatus.NOT_FOUND
        );
      }
    }

    const updatedDevice = await prisma.devices.update({
      where: {
        d_id: id,
      },
      data: updateDeviceDto,
    });

    if (!updatedDevice) {
      throw new NotFoundException(`Device #${id} not found`);
    }

    return updatedDevice;
  }

  /**
   * Delete relation of the device with its organizations.
   * @param id The unique identifier of the device.
   * @returns The deleted devices.
   * @throws NotFoundException if the device does not exist.
   * @throws UnauthorizedException if the user does not have permission to delete the device.
   */
  async removeFromOrg(id: string, user: UserTokenDto) {
    if (user.role !== 'marsi') {
      // Si el usuario no es 'marsi', verifica si el dispositivo pertenece a su organización
      const deviceAssociation = await prisma.organization_has_device.findUnique(
        {
          where: {
            o_id_d_id: {
              o_id: user.o_id,
              d_id: id,
            },
          },
        }
      );

      // Si no se encuentra el dispositivo en la organización del usuario, arroja un error
      if (!deviceAssociation) {
        throw new HttpException(
          'Device not found in your organization',
          HttpStatus.NOT_FOUND
        );
      }
    }

    await prisma.organization_has_device.deleteMany({
      where: {
        d_id: id,
      },
    });

    const devices = await prisma.devices.findUnique({
      where: {
        d_id: id,
      },
    });

    if (!devices) {
      throw new NotFoundException(`Device #${id} not found`);
    }

    return devices;
  }

  /**
   * Delete a device by its unique identifier and all relations with the organizations that it belongs.
   * @param id The unique identifier of the device.
   * @returns The deleted device.
   * @throws NotFoundException if the device does not exist.
   * @throws UnauthorizedException if the user does not have permission to delete the device.
   */
  async remove(id: string, user: UserTokenDto) {
    if (user.role !== 'marsi') {
      // Si el usuario no es 'marsi', verifica si el dispositivo pertenece a su organización
      const deviceAssociation = await prisma.organization_has_device.findUnique(
        {
          where: {
            o_id_d_id: {
              o_id: user.o_id,
              d_id: id,
            },
          },
        }
      );

      // Si no se encuentra el dispositivo en la organización del usuario, arroja un error
      if (!deviceAssociation) {
        throw new HttpException(
          'Device not found in your organization',
          HttpStatus.NOT_FOUND
        );
      }
    }

    await prisma.organization_has_device.deleteMany({
      where: {
        d_id: id,
      },
    });

    const devices = await prisma.devices.delete({
      where: {
        d_id: id,
      },
    });

    if (!devices) {
      throw new NotFoundException(`Device #${id} not found`);
    }
    return devices;
  }

  /**
   * Find all organizations associated with a device.
   * @param id The unique identifier for the device.
   * @returns An array of organizations associated with the device.
   */
  async findAllOrganizations(id: string): Promise<Organization[]> {
    const device = await prisma.devices.findUnique({
      where: { d_id: id },
    });

    if (!device) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }
    // Encontrar todas las entradas en la tabla de asociación que corresponden al dispositivo dado
    const associations = await prisma.organization_has_device.findMany({
      where: { d_id: id },
      include: {
        organizations: true, // Asegúrate de que esta relación está configurada correctamente en Prisma
      },
      distinct: ['o_id'], // Usar distinct para asegurar que no hay duplicados por ID de organización
    });

    if (!associations.length) {
      return [];
    }

    // Extraer y devolver solo los detalles de las organizaciones
    const organizations: Organization[] = associations.map(
      (association) => association.organizations
    );

    return organizations;
  }

  /**
   * Add a device to an organization.
   * @param device_id The unique identifier of the device.
   * @param organization_id The unique identifier of the organization.
   * @param user The user making the request.
   * @returns True if the device was added to the organization.
   * @throws Error if the device does not exist.
   * @throws Error if the organization does not exist.
   * @throws Error if the user does not have permission to add the device to the organization.
   * @throws Error if the device is already associated with the organization.
   */
  async addDeviceToOrganization(
    serial: string,
    organization_id: string,
    user: UserTokenDto
  ): Promise<boolean> {
    // Verificar si el dispositivo existe
    const deviceExists = await prisma.devices.findUnique({
      where: { serial: serial },
    });
    if (!deviceExists) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }

    // Verificar si la organización existe
    const organizationExists = await prisma.organizations.findUnique({
      where: { o_id: organization_id },
    });
    if (!organizationExists) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    // Verificar si el usuario tiene el rol 'marsi' o pertenece a la organización especificada
    if (user.role !== 'marsi' && user.o_id !== organization_id) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    // Verificar que el dispositivo no esté ya asociado a la organización
    const existingAssociation = await prisma.organization_has_device.findUnique(
      {
        where: {
          o_id_d_id: {
            o_id: organization_id,
            d_id: deviceExists.d_id,
          },
        },
      }
    );
    if (existingAssociation) {
      throw new HttpException(
        'Device is already associated with this organization',
        HttpStatus.BAD_REQUEST
      );
    }

    // Añadir el dispositivo a la organización
    await prisma.organization_has_device.create({
      data: {
        o_id: organization_id,
        d_id: deviceExists.d_id,
      },
    });

    return true;
  }

  /**
   * Remove a device from an organization.
   * @param device_id The unique identifier of the device.
   * @param organization_id The unique identifier of the organization.
   * @param user The user making the request.
   * @returns True if the device was removed from the organization.
   * @throws Error if the device does not exist.
   * @throws Error if the organization does not exist.
   * @throws Error if the user does not have permission to remove the device from the organization.
   * @throws Error if the device is not associated with the organization.
   */
  async removeDeviceFromOrganization(
    device_id: string,
    organization_id: string,
    user: UserTokenDto
  ): Promise<boolean> {
    // Verificar si el dispositivo existe

    const deviceExists = await prisma.devices.findUnique({
      where: { d_id: device_id },
    });
    if (!deviceExists) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }

    const organizationExists = await prisma.organizations.findUnique({
      where: { o_id: organization_id },
    });
    if (!organizationExists) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    if (user.role !== 'marsi' && user.o_id !== organization_id) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    const existingAssociation = await prisma.organization_has_device.findUnique(
      {
        where: {
          o_id_d_id: {
            o_id: organization_id,
            d_id: device_id,
          },
        },
      }
    );
    if (!existingAssociation) {
      throw new HttpException(
        'Device is not associated with this organization',
        HttpStatus.BAD_REQUEST
      );
    }

    // Eliminar la asociación del dispositivo con la organización
    await prisma.organization_has_device.delete({
      where: {
        o_id_d_id: {
          o_id: organization_id,
          d_id: device_id,
        },
      },
    });

    return true;
  }
}
