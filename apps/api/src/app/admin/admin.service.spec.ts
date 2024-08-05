import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { prisma } from '@marsinet/server';
import {
  CreateOrganization,
  UpdateOrganizationDto,
  CreateUser,
  UpdateUser,
} from './dto/dto';
import { HttpException } from '@nestjs/common';

jest.mock('@marsinet/server', () => ({
  prisma: {
    organizations: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    devices: {
      findMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user_data: {
      upsert: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
    organization_has_device: {
      deleteMany: jest.fn(),
    },
  },
  hash_password: jest.fn().mockResolvedValue('hashed_password'),
  generate_reset_token_password_and_send_email_new_admin_clinic: jest.fn(),
}));

describe('AdminService', () => {
  let service: AdminService;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);

    // Silenciar temporalmente console.error
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      // Intentionally empty to silence console.error in tests
    });
  });

  afterEach(() => {
    // Restaurar console.error después de cada prueba
    consoleErrorSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('allOrganizations', () => {
    it('should return an array of organizations', async () => {
      const result = [
        {
          o_id: '1',
          name: 'Test Org',
          created_at: new Date(),
          updated_at: new Date(),
          street_name: 'Test Street',
          street_number: '123',
          country: 'Test Country',
          city: 'Test City',
          role: 'admin',
          premium: false,
          postal_code: '12345',
        },
      ];
      jest.spyOn(prisma.organizations, 'findMany').mockResolvedValue(result);

      expect(await service.allOrganizations()).toBe(result);
    });
  });

  describe('createOrganization', () => {
    it('should create an organization', async () => {
      const dto: CreateOrganization = {
        name_organization: 'Test Org',
        city: 'Test City',
        country: 'Test Country',
        postal_code: '12345',
        street_name: 'Test Street',
        street_number: '1',
        role: 'admin',
      };
      const result = {
        o_id: '1',
        name: 'Test Org',
        created_at: new Date(),
        updated_at: new Date(),
        street_name: 'Test Street',
        street_number: '1',
        country: 'Test Country',
        city: 'Test City',
        role: 'admin',
        premium: false,
        postal_code: '12345',
      };
      jest.spyOn(prisma.organizations, 'create').mockResolvedValue(result);

      expect(await service.createOrganization(dto)).toEqual({
        organization: result,
      });
    });

    it('should throw an error if creation fails', async () => {
      const dto: CreateOrganization = {
        name_organization: 'Test Org',
        city: 'Test City',
        country: 'Test Country',
        postal_code: '12345',
        street_name: 'Test Street',
        street_number: '1',
        role: 'admin',
      };
      jest.spyOn(prisma.organizations, 'create').mockRejectedValue(new Error());

      await expect(service.createOrganization(dto)).rejects.toThrow(
        HttpException
      );
      await expect(service.createOrganization(dto)).rejects.toThrow(
        'Algo inesperado ocurrió'
      );
    });
  });

  describe('updateOrganization', () => {
    it('should update an organization', async () => {
      const dto: UpdateOrganizationDto = {
        name: 'Updated Org',
      };
      const existingOrganization = {
        o_id: '1',
        name: 'Existing Org',
        created_at: new Date(),
        updated_at: new Date(),
        street_name: 'Existing Street',
        street_number: '1',
        country: 'Existing Country',
        city: 'Existing City',
        role: 'admin',
        premium: false,
        postal_code: '12345',
      };
      const updatedOrganization = { ...existingOrganization, ...dto };
      jest
        .spyOn(prisma.organizations, 'findUnique')
        .mockResolvedValue(existingOrganization);
      jest
        .spyOn(prisma.organizations, 'update')
        .mockResolvedValue(updatedOrganization);

      expect(await service.updateOrganization('1', dto)).toBe(
        updatedOrganization
      );
    });

    it('should throw an error if organization is not found', async () => {
      const dto: UpdateOrganizationDto = {
        name: 'Updated Org',
      };
      jest.spyOn(prisma.organizations, 'findUnique').mockResolvedValue(null);

      await expect(service.updateOrganization('1', dto)).rejects.toThrow(
        HttpException
      );
      await expect(service.updateOrganization('1', dto)).rejects.toThrow(
        'Organization not found'
      );
    });
  });

  describe('organizationTogglePremium', () => {
    it('should toggle premium status', async () => {
      const organization = {
        o_id: '1',
        name: 'Test Org',
        created_at: new Date(),
        updated_at: new Date(),
        street_name: 'Test Street',
        street_number: '1',
        country: 'Test Country',
        city: 'Test City',
        role: 'admin',
        premium: false,
        postal_code: '12345',
      };
      const updatedOrganization = { ...organization, premium: true };
      jest
        .spyOn(prisma.organizations, 'findUnique')
        .mockResolvedValue(organization);
      jest
        .spyOn(prisma.organizations, 'update')
        .mockResolvedValue(updatedOrganization);

      expect(await service.organizationTogglePremium('1')).toBe(
        updatedOrganization
      );
    });

    it('should throw an error if organization is not found', async () => {
      jest.spyOn(prisma.organizations, 'findUnique').mockResolvedValue(null);

      await expect(service.organizationTogglePremium('1')).rejects.toThrow(
        HttpException
      );
      await expect(service.organizationTogglePremium('1')).rejects.toThrow(
        'Organization not found'
      );
    });
  });

  describe('deviesOfOrganization', () => {
    it('should return all devices of an organization', async () => {
      const result = [
        {
          d_id: 'device1',
          created_at: new Date(),
          updated_at: new Date(),
          active: true,
          serial: 'SN-001',
          structure_version: 'v1',
          password: 'password123',
          model: 'model1',
        },
      ];
      jest.spyOn(prisma.devices, 'findMany').mockResolvedValue(result);

      const organizationWithDevices = {
        o_id: '1',
        name: 'Test Org',
        created_at: new Date(),
        updated_at: new Date(),
        street_name: 'Test Street',
        street_number: '1',
        country: 'Test Country',
        city: 'Test City',
        role: 'admin',
        premium: false,
        postal_code: '12345',
        organization_has_device: [{ devices: result[0] }],
      };
      jest
        .spyOn(prisma.organizations, 'findUnique')
        .mockResolvedValue(organizationWithDevices);

      expect(await service.deviesOfOrganization('1')).toStrictEqual(result);
    });

    it('should throw an error if organization is not found', async () => {
      jest.spyOn(prisma.organizations, 'findUnique').mockResolvedValue(null);

      await expect(service.deviesOfOrganization('1')).rejects.toThrow(Error);
      await expect(service.deviesOfOrganization('1')).rejects.toThrow(
        'Organization not found'
      );
    });
  });

  describe('deleteOrganization', () => {
    it('should delete an organization', async () => {
      const organization = {
        o_id: '1',
        name: 'Test Org',
        created_at: new Date(),
        updated_at: new Date(),
        street_name: 'Test Street',
        street_number: '1',
        country: 'Test Country',
        city: 'Test City',
        role: 'admin',
        premium: false,
        postal_code: '12345',
      };
      jest
        .spyOn(prisma.organizations, 'findUnique')
        .mockResolvedValue(organization);
      jest
        .spyOn(prisma.organization_has_device, 'deleteMany')
        .mockResolvedValue({ count: 1 });
      jest
        .spyOn(prisma.organizations, 'delete')
        .mockResolvedValue(organization);

      expect(await service.deleteOrganization('1')).toBe(true);
    });

    it('should throw an error if organization is not found', async () => {
      jest.spyOn(prisma.organizations, 'findUnique').mockResolvedValue(null);

      await expect(service.deleteOrganization('1')).rejects.toThrow(
        HttpException
      );
      await expect(service.deleteOrganization('1')).rejects.toThrow(
        'Organization not found'
      );
    });
  });

  describe('findOneOrganization', () => {
    it('should return an organization if found', async () => {
      const organization = {
        o_id: '1',
        name: 'Test Org',
        created_at: new Date(),
        updated_at: new Date(),
        street_name: 'Test Street',
        street_number: '123',
        country: 'Test Country',
        city: 'Test City',
        role: 'admin',
        premium: false,
        postal_code: '12345',
      };
      jest
        .spyOn(prisma.organizations, 'findUnique')
        .mockResolvedValue(organization);

      expect(await service.findOneOrganization('1')).toBe(organization);
    });

    it('should throw an error if organization is not found', async () => {
      jest.spyOn(prisma.organizations, 'findUnique').mockResolvedValue(null);

      await expect(service.findOneOrganization('1')).rejects.toThrow(
        HttpException
      );
      await expect(service.findOneOrganization('1')).rejects.toThrow(
        'Organization not found'
      );
    });
  });

  describe('findOneUser', () => {
    it('should return a single user', async () => {
      const result = {
        u_id: '1',
        email: 'test@user.com',
        password: 'password123',
        o_id: '1',
        active: true,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
        user_data: {
          u_id: '1',
          name: 'Test User',
          surnames: 'User Surnames',
          phone: '1234567890',
          birth_date: new Date(),
          nationality: 'Test Nationality',
          created_at: new Date(),
          updated_at: new Date(),
        },
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);

      expect(await service.findOneUser('1')).toBe(result);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      await expect(service.findOneUser('1')).rejects.toThrow(HttpException);
      await expect(service.findOneUser('1')).rejects.toThrow('User not found');
    });
  });

  describe('updateUserData', () => {
    it('should update a user data', async () => {
      const dto: UpdateUser = {
        name: 'Updated User',
        surnames: 'Updated Surnames',
        phone: '9876543210',
        birth_date: new Date().toISOString(),
        nationality: 'Updated Nationality',
      };
      const userData = {
        u_id: '1',
        name: 'Updated User',
        surnames: 'Updated Surnames',
        phone: '9876543210',
        birth_date: new Date(),
        nationality: 'Updated Nationality',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
        u_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        email: 'test@user.com',
        password: 'password123',
        o_id: '1',
        active: true,
        is_admin: true,
      });
      jest.spyOn(prisma.user_data, 'upsert').mockResolvedValue(userData);

      expect(await service.updateUserData('1', dto)).toBe(userData);
    });

    it('should throw an error if user is not found', async () => {
      const dto: UpdateUser = {
        name: 'Updated User',
        surnames: 'Updated Surnames',
        phone: '9876543210',
        birth_date: new Date().toISOString(),
        nationality: 'Updated Nationality',
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      await expect(service.updateUserData('1', dto)).rejects.toThrow(
        HttpException
      );
      await expect(service.updateUserData('1', dto)).rejects.toThrow(
        'Usuario no encontrado'
      );
    });

    it('should throw an error if no valid data is provided', async () => {
      // Use Partial<UpdateUser> to allow an empty object
      const dto: Partial<UpdateUser> = {};
      const user = {
        u_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        email: 'test@user.com',
        password: 'password123',
        o_id: '1',
        active: true,
        is_admin: true,
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);

      await expect(
        service.updateUserData('1', dto as UpdateUser)
      ).rejects.toThrow(Error);
      await expect(
        service.updateUserData('1', dto as UpdateUser)
      ).rejects.toThrow(
        'No valid data provided to update or create user data.'
      );
    });

    it('should throw an error if upsert fails', async () => {
      const dto: UpdateUser = {
        name: 'Updated User',
        surnames: 'Updated Surnames',
        phone: '9876543210',
        birth_date: new Date().toISOString(),
        nationality: 'Updated Nationality',
      };
      const user = {
        u_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        email: 'test@user.com',
        password: 'password123',
        o_id: '1',
        active: true,
        is_admin: true,
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(prisma.user_data, 'upsert').mockRejectedValue(new Error());

      await expect(service.updateUserData('1', dto)).rejects.toThrow(
        HttpException
      );
      await expect(service.updateUserData('1', dto)).rejects.toThrow(
        'Error al actualizar o crear'
      );
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const dto: CreateUser = {
        name: 'Test',
        surnames: 'User',
        email: 'test@user.com',
        password: 'password123',
        phone: '1234567890',
        birth_date: new Date().toISOString(),
        nationality: 'Test',
        organization_id: '1',
      };
      const user = {
        u_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        email: 'test@user.com',
        password: 'hashed_password',
        o_id: '1',
        active: true,
        is_admin: true,
      };
      jest.spyOn(prisma.organizations, 'findUnique').mockResolvedValue({
        o_id: '1',
        name: 'Test Org',
        created_at: new Date(),
        updated_at: new Date(),
        street_name: 'Test Street',
        street_number: '123',
        country: 'Test Country',
        city: 'Test City',
        role: 'admin',
        premium: false,
        postal_code: '12345',
      });
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([]);
      jest.spyOn(prisma.user, 'create').mockResolvedValue(user);

      expect(await service.createUser(dto)).toBe(true);
    });

    it('should throw an error if organization is not found', async () => {
      const dto: CreateUser = {
        name: 'Test',
        surnames: 'User',
        email: 'test@user.com',
        password: 'password123',
        phone: '1234567890',
        birth_date: new Date().toISOString(),
        nationality: 'Test',
        organization_id: '1',
      };
      jest.spyOn(prisma.organizations, 'findUnique').mockResolvedValue(null);

      await expect(service.createUser(dto)).rejects.toThrow(HttpException);
      await expect(service.createUser(dto)).rejects.toThrow(
        'Organization not found'
      );
    });

    it('should throw an error if email is already in use', async () => {
      const dto: CreateUser = {
        name: 'Test',
        surnames: 'User',
        email: 'test@user.com',
        password: 'password123',
        phone: '1234567890',
        birth_date: new Date().toISOString(),
        nationality: 'Test',
        organization_id: '1',
      };
      jest.spyOn(prisma.organizations, 'findUnique').mockResolvedValue({
        o_id: '1',
        name: 'Test Org',
        created_at: new Date(),
        updated_at: new Date(),
        street_name: 'Test Street',
        street_number: '123',
        country: 'Test Country',
        city: 'Test City',
        role: 'admin',
        premium: false,
        postal_code: '12345',
      });
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValue({
        u_id: '1',
        email: 'email@test.com',
        password: 'password123',
        o_id: '1',
        active: true,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await expect(service.createUser(dto)).rejects.toThrow(HttpException);
      await expect(service.createUser(dto)).rejects.toThrow(
        'Email already in use'
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = {
        u_id: '1',
        email: 'test@user.com',
        password: 'password123',
        o_id: '1',
        active: true,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const userData = {
        u_id: '1',
        name: 'Test User',
        surnames: 'User Surnames',
        phone: '1234567890',
        birth_date: new Date(),
        nationality: 'Test Nationality',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(prisma.user_data, 'findUnique').mockResolvedValue(userData);
      jest.spyOn(prisma.user_data, 'delete').mockResolvedValue(userData);
      jest.spyOn(prisma.user, 'delete').mockResolvedValue(user);

      expect(await service.deleteUser('1')).toBe(true);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      await expect(service.deleteUser('1')).rejects.toThrow(HttpException);
      await expect(service.deleteUser('1')).rejects.toThrow('User not found');
    });
  });
});
