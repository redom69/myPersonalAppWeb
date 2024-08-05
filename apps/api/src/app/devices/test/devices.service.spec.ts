import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from '../devices.service';
import { prisma } from '@marsinet/server';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from '../dto/create-device.dto';
import {
  UpdateActiveDeviceDto,
  UpdateDeviceDto,
} from '../dto/update-device.dto';
import { UserTokenDto } from '../../my-account/dto/dto';
import { Prisma } from '@prisma/client';

jest.mock('@marsinet/server', () => ({
  prisma: {
    organizations: {
      findUnique: jest.fn(),
    },
    devices: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    organization_has_device: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));

describe('DevicesService', () => {
  let service: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevicesService],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new device', async () => {
      const createDeviceDto: CreateDeviceDto = {
        model: 'Model X Pro',
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        password: 'P@ssw0rd!',
        o_id: '123e4567-e89b-12d3-a456-426614174000',
      };

      const device = {
        d_id: '1',
        active: false,
        model: createDeviceDto.model,
        serial: createDeviceDto.serial,
        password: createDeviceDto.password,
        structure_version: createDeviceDto.structure_version,
        created_at: new Date(),
        updated_at: new Date(),
      };

      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(true);
      (prisma.devices.create as jest.Mock).mockResolvedValue(device);
      (prisma.organization_has_device.create as jest.Mock).mockResolvedValue(
        true
      );

      expect(await service.create(createDeviceDto)).toBe(device);
    });

    it('should throw an error if organization not found', async () => {
      const createDeviceDto: CreateDeviceDto = {
        model: 'Model X Pro',
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        password: 'P@ssw0rd!',
        o_id: '123e4567-e89b-12d3-a456-426614174000',
      };

      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.create(createDeviceDto)).rejects.toThrow(
        HttpException
      );
      await expect(service.create(createDeviceDto)).rejects.toThrow(
        'Organization not found'
      );
    });

    it('should throw a conflict error if device with serial number already exists', async () => {
      const createDeviceDto: CreateDeviceDto = {
        model: 'Model X Pro',
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        password: 'P@ssw0rd!',
        o_id: '123e4567-e89b-12d3-a456-426614174000',
      };

      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(true);
      (prisma.devices.create as jest.Mock).mockImplementation(() => {
        const error = new Prisma.PrismaClientKnownRequestError(
          'Error message',
          {
            code: 'P2002',
            clientVersion: '2.19.0',
            meta: { target: ['serial'] },
          }
        );
        throw error;
      });

      await expect(service.create(createDeviceDto)).rejects.toThrow(
        HttpException
      );
      await expect(service.create(createDeviceDto)).rejects.toThrow(
        'A device with this serial number already exists'
      );
    });

    it('should throw an internal server error for other errors', async () => {
      const createDeviceDto: CreateDeviceDto = {
        model: 'Model X Pro',
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        password: 'P@ssw0rd!',
        o_id: '123e4567-e89b-12d3-a456-426614174000',
      };

      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(true);
      (prisma.devices.create as jest.Mock).mockImplementation(() => {
        throw new Error('Some error');
      });

      await expect(service.create(createDeviceDto)).rejects.toThrow(
        HttpException
      );
      await expect(service.create(createDeviceDto)).rejects.toThrow(
        'Internal server error'
      );
    });
  });

  describe('findAll', () => {
    it('should return all devices for marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const devices: any[] = [
        {
          d_id: '1',
          active: true,
          serial: 'SN123456789',
          structure_version: 'v1.0.0',
          model: 'Model X Pro',
          password: 'P@ssw0rd!',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      (prisma.devices.findMany as jest.Mock).mockResolvedValue(devices);

      expect(await service.findAll(user)).toBe(devices);
    });

    it('should return devices associated with user organization', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const organizationDevices = {
        organization_has_device: [
          {
            devices: {
              d_id: '1',
              active: true,
              serial: 'SN123456789',
              structure_version: 'v1.0.0',
              model: 'Model X Pro',
              password: 'P@ssw0rd!',
              created_at: new Date(),
              updated_at: new Date(),
            },
          },
        ],
      };

      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(
        organizationDevices
      );

      expect(await service.findAll(user)).toEqual([
        organizationDevices.organization_has_device[0].devices,
      ]);
    });

    it('should throw an error if no devices found in organization', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findAll(user)).rejects.toThrow(HttpException);
      await expect(service.findAll(user)).rejects.toThrow(
        'Devices not found in organization'
      );
    });
  });

  describe('findOne', () => {
    it('should retrieve a device by its ID for marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const device = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(device);

      expect(await service.findOne('1', user)).toBe(device);
    });

    it('should throw an error if device not found for marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne('1', user)).rejects.toThrow(HttpException);
      await expect(service.findOne('1', user)).rejects.toThrow(
        'Device not found'
      );
    });

    it('should retrieve a device by its ID for non-marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const organizationDevices = {
        organization_has_device: [
          {
            devices: {
              d_id: '1',
              active: true,
              serial: 'SN123456789',
              structure_version: 'v1.0.0',
              model: 'Model X Pro',
              password: 'P@ssw0rd!',
              created_at: new Date(),
              updated_at: new Date(),
            },
          },
        ],
      };

      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(
        organizationDevices
      );
      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(
        organizationDevices.organization_has_device[0].devices
      );

      expect(await service.findOne('1', user)).toEqual(
        organizationDevices.organization_has_device[0].devices
      );
    });

    it('should throw an error if device not found for non-marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const organizationDevices = {
        organization_has_device: [],
      };

      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(
        organizationDevices
      );

      await expect(service.findOne('1', user)).rejects.toThrow(HttpException);
      await expect(service.findOne('1', user)).rejects.toThrow(
        'Device not found in your organization'
      );
    });

    it('should throw an error if device not found after checking organization for non-marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const organizationDevices = {
        organization_has_device: [
          {
            devices: {
              d_id: '1',
              active: true,
              serial: 'SN123456789',
              structure_version: 'v1.0.0',
              model: 'Model X Pro',
              password: 'P@ssw0rd!',
              created_at: new Date(),
              updated_at: new Date(),
            },
          },
        ],
      };

      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(
        organizationDevices
      );
      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne('1', user)).rejects.toThrow(HttpException);
      await expect(service.findOne('1', user)).rejects.toThrow(
        'Device not found'
      );
    });
  });

  describe('updateActive', () => {
    it('should update the active status of a device', async () => {
      const updateActiveDeviceDto: UpdateActiveDeviceDto = { active: true };

      const updatedDevice = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (prisma.devices.update as jest.Mock).mockResolvedValue(updatedDevice);

      expect(await service.updateActive('1', updateActiveDeviceDto)).toBe(
        updatedDevice
      );
    });

    it('should throw an error if device not found', async () => {
      const updateActiveDeviceDto: UpdateActiveDeviceDto = { active: true };

      (prisma.devices.update as jest.Mock).mockResolvedValue(null);

      await expect(
        service.updateActive('1', updateActiveDeviceDto)
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.updateActive('1', updateActiveDeviceDto)
      ).rejects.toThrow('Device #1 not found');
    });
  });

  describe('update', () => {
    it('should update a device by its ID for marsi role', async () => {
      const updateDeviceDto: UpdateDeviceDto = { model: 'Updated Model' };
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const updatedDevice = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Updated Model',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (prisma.devices.update as jest.Mock).mockResolvedValue(updatedDevice);

      expect(await service.update('1', updateDeviceDto, user)).toBe(
        updatedDevice
      );
    });

    it('should update a device by its ID for non-marsi role', async () => {
      const updateDeviceDto: UpdateDeviceDto = { model: 'Updated Model' };
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const deviceAssociation = {
        o_id_d_id: {
          o_id: user.o_id,
          d_id: '1',
        },
      };

      const updatedDevice = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Updated Model',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (
        prisma.organization_has_device.findUnique as jest.Mock
      ).mockResolvedValue(deviceAssociation);
      (prisma.devices.update as jest.Mock).mockResolvedValue(updatedDevice);

      expect(await service.update('1', updateDeviceDto, user)).toBe(
        updatedDevice
      );
    });

    it('should throw an error if device not found in user organization for non-marsi role', async () => {
      const updateDeviceDto: UpdateDeviceDto = { model: 'Updated Model' };
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (
        prisma.organization_has_device.findUnique as jest.Mock
      ).mockResolvedValue(null);

      await expect(service.update('1', updateDeviceDto, user)).rejects.toThrow(
        HttpException
      );
      await expect(service.update('1', updateDeviceDto, user)).rejects.toThrow(
        'Device not found in your organization'
      );
    });

    it('should throw an error if device not found', async () => {
      const updateDeviceDto: UpdateDeviceDto = { model: 'Updated Model' };
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.devices.update as jest.Mock).mockResolvedValue(null);

      await expect(service.update('1', updateDeviceDto, user)).rejects.toThrow(
        NotFoundException
      );
      await expect(service.update('1', updateDeviceDto, user)).rejects.toThrow(
        'Device #1 not found'
      );
    });
  });

  describe('remove', () => {
    it('should delete a device by its ID for marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const device = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (prisma.devices.delete as jest.Mock).mockResolvedValue(device);

      expect(await service.remove('1', user)).toBe(device);
    });

    it('should throw an error if device not found in user organization for non-marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (
        prisma.organization_has_device.findUnique as jest.Mock
      ).mockResolvedValue(null);

      await expect(service.remove('1', user)).rejects.toThrow(HttpException);
      await expect(service.remove('1', user)).rejects.toThrow(
        'Device not found in your organization'
      );
    });

    it('should throw an error if device not found', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.devices.delete as jest.Mock).mockResolvedValue(null);

      await expect(service.remove('1', user)).rejects.toThrow(
        NotFoundException
      );
      await expect(service.remove('1', user)).rejects.toThrow(
        'Device #1 not found'
      );
    });
  });

  describe('findAllOrganizations', () => {
    it('should find all organizations associated with a device', async () => {
      const associations = [
        {
          organizations: {
            o_id: '456e8977-e89b-12d3-a456-426614174000',
            name: 'Test Org',
            street_name: 'Main Street',
            street_number: '100A',
            postal_code: 'A1A 1A1',
            country: 'Canada',
            city: 'Ottawa',
            role: 'admin',
            premium: true,
          },
        },
      ];

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(true);
      (prisma.organization_has_device.findMany as jest.Mock).mockResolvedValue(
        associations
      );

      expect(await service.findAllOrganizations('1')).toEqual([
        associations[0].organizations,
      ]);
    });

    it('should throw an error if device not found', async () => {
      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findAllOrganizations('1')).rejects.toThrow(
        HttpException
      );
      await expect(service.findAllOrganizations('1')).rejects.toThrow(
        'Device not found'
      );
    });

    it('should return an empty array if no organizations found', async () => {
      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(true);
      (prisma.organization_has_device.findMany as jest.Mock).mockResolvedValue(
        []
      );

      expect(await service.findAllOrganizations('1')).toEqual([]);
    });
  });

  describe('addDeviceToOrganization', () => {
    it('should add a device to an organization', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(true);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(true);
      (
        prisma.organization_has_device.findUnique as jest.Mock
      ).mockResolvedValue(null);
      (prisma.organization_has_device.create as jest.Mock).mockResolvedValue(
        true
      );

      expect(
        await service.addDeviceToOrganization('SN123456789', '1', user)
      ).toBe(true);
    });

    it('should throw an error if device not found', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.addDeviceToOrganization('SN123456789', '1', user)
      ).rejects.toThrow(HttpException);
      await expect(
        service.addDeviceToOrganization('SN123456789', '1', user)
      ).rejects.toThrow('Device not found');
    });

    it('should throw an error if organization not found', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(true);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.addDeviceToOrganization('SN123456789', '1', user)
      ).rejects.toThrow(HttpException);
      await expect(
        service.addDeviceToOrganization('SN123456789', '1', user)
      ).rejects.toThrow('Organization not found');
    });

    it('should throw an error if access denied', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '2',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(true);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(true);

      await expect(
        service.addDeviceToOrganization('SN123456789', '1', user)
      ).rejects.toThrow(HttpException);
      await expect(
        service.addDeviceToOrganization('SN123456789', '1', user)
      ).rejects.toThrow('Access denied');
    });

    it('should throw an error if device already associated with organization', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const existingAssociation = {
        o_id_d_id: {
          o_id: '1',
          d_id: '1',
        },
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(true);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(true);
      (
        prisma.organization_has_device.findUnique as jest.Mock
      ).mockResolvedValue(existingAssociation);

      await expect(
        service.addDeviceToOrganization('SN123456789', '1', user)
      ).rejects.toThrow(HttpException);
      await expect(
        service.addDeviceToOrganization('SN123456789', '1', user)
      ).rejects.toThrow('Device is already associated with this organization');
    });
  });

  describe('removeFromOrg', () => {
    it('should delete relation of device with its organization for marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const device = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(device);
      (
        prisma.organization_has_device.deleteMany as jest.Mock
      ).mockResolvedValue({ count: 1 });

      expect(await service.removeFromOrg('1', user)).toBe(device);
    });

    it('should delete relation of device with its organization for non-marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const deviceAssociation = {
        o_id_d_id: {
          o_id: '1',
          d_id: '1',
        },
      };

      const device = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (
        prisma.organization_has_device.findUnique as jest.Mock
      ).mockResolvedValue(deviceAssociation);
      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(device);
      (
        prisma.organization_has_device.deleteMany as jest.Mock
      ).mockResolvedValue({ count: 1 });

      expect(await service.removeFromOrg('1', user)).toBe(device);
    });

    it('should throw an error if device not found', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(null);
      (
        prisma.organization_has_device.deleteMany as jest.Mock
      ).mockResolvedValue({ count: 0 });

      await expect(service.removeFromOrg('1', user)).rejects.toThrow(
        NotFoundException
      );
      await expect(service.removeFromOrg('1', user)).rejects.toThrow(
        'Device #1 not found'
      );
    });

    it('should throw an error if device not found in user organization for non-marsi role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (
        prisma.organization_has_device.findUnique as jest.Mock
      ).mockResolvedValue(null);

      await expect(service.removeFromOrg('1', user)).rejects.toThrow(
        HttpException
      );
      await expect(service.removeFromOrg('1', user)).rejects.toThrow(
        'Device not found in your organization'
      );
    });
  });

  describe('removeDeviceFromOrganization', () => {
    it('should remove a device from an organization', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const deviceExists = {
        d_id: '1',
      };

      const organizationExists = {
        o_id: '1',
      };

      const existingAssociation = {
        o_id_d_id: {
          o_id: '1',
          d_id: '1',
        },
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(deviceExists);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(
        organizationExists
      );
      (
        prisma.organization_has_device.findUnique as jest.Mock
      ).mockResolvedValue(existingAssociation);
      (prisma.organization_has_device.delete as jest.Mock).mockResolvedValue(
        true
      );

      expect(await service.removeDeviceFromOrganization('1', '1', user)).toBe(
        true
      );
    });

    it('should throw an error if device not found', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.removeDeviceFromOrganization('1', '1', user)
      ).rejects.toThrow(HttpException);
      await expect(
        service.removeDeviceFromOrganization('1', '1', user)
      ).rejects.toThrow('Device not found');
    });

    it('should throw an error if organization not found', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const deviceExists = {
        d_id: '1',
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(deviceExists);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.removeDeviceFromOrganization('1', '1', user)
      ).rejects.toThrow(HttpException);
      await expect(
        service.removeDeviceFromOrganization('1', '1', user)
      ).rejects.toThrow('Organization not found');
    });

    it('should throw an error if access denied', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '2',
        role: 'user',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const deviceExists = {
        d_id: '1',
      };

      const organizationExists = {
        o_id: '1',
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(deviceExists);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(
        organizationExists
      );

      await expect(
        service.removeDeviceFromOrganization('1', '1', user)
      ).rejects.toThrow(HttpException);
      await expect(
        service.removeDeviceFromOrganization('1', '1', user)
      ).rejects.toThrow('Access denied');
    });

    it('should throw an error if device is not associated with organization', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        iat: 0,
        exp: 0,
      };

      const deviceExists = {
        d_id: '1',
      };

      const organizationExists = {
        o_id: '1',
      };

      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(deviceExists);
      (prisma.organizations.findUnique as jest.Mock).mockResolvedValue(
        organizationExists
      );
      (
        prisma.organization_has_device.findUnique as jest.Mock
      ).mockResolvedValue(null);

      await expect(
        service.removeDeviceFromOrganization('1', '1', user)
      ).rejects.toThrow(HttpException);
      await expect(
        service.removeDeviceFromOrganization('1', '1', user)
      ).rejects.toThrow('Device is not associated with this organization');
    });
  });
});
