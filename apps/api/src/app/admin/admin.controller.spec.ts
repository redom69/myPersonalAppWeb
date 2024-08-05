import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import {
  CreateOrganization,
  UpdateOrganizationDto,
  CreateUser,
  UpdateUser,
} from './dto/dto';

jest.mock('./admin.service');

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      jest.spyOn(service, 'allOrganizations').mockResolvedValue(result);

      expect(await controller.allOrganizations()).toBe(result);
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
        organization: {
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
        },
      };
      jest.spyOn(service, 'createOrganization').mockResolvedValue(result);

      expect(await controller.createOrganization(dto)).toBe(result);
    });
  });

  describe('updateOrganization', () => {
    it('should update an organization', async () => {
      const dto: UpdateOrganizationDto = {
        name: 'Updated Org',
      };
      const result = {
        o_id: '1',
        name: 'Updated Org',
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
      jest.spyOn(service, 'updateOrganization').mockResolvedValue(result);

      expect(await controller.updateOrganization('1', dto)).toBe(result);
    });
  });

  describe('organizationTogglePremium', () => {
    it('should toggle premium status', async () => {
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
        premium: true,
        postal_code: '12345',
      };
      jest
        .spyOn(service, 'organizationTogglePremium')
        .mockResolvedValue(result);

      expect(await controller.organizationTogglePremium('1')).toBe(result);
    });
  });

  describe('findAllDevicesOfOrganization', () => {
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
      jest.spyOn(service, 'deviesOfOrganization').mockResolvedValue(result);

      expect(await controller.findAllDevicesOfOrganization('1')).toBe(result);
    });
  });

  describe('findOneOrganization', () => {
    it('should return a single organization', async () => {
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
      jest.spyOn(service, 'findOneOrganization').mockResolvedValue(result);

      expect(await controller.findOneOrganization('1')).toBe(result);
    });
  });

  describe('deleteOrganization', () => {
    it('should delete an organization', async () => {
      jest.spyOn(service, 'deleteOrganization').mockResolvedValue(true);

      expect(await controller.deleteOrganization('1')).toBe(true);
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
      jest.spyOn(service, 'findOneUser').mockResolvedValue(result);

      expect(await controller.findOneUser('1')).toBe(result);
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
      const result = {
        u_id: '1',
        name: 'Updated User',
        surnames: 'Updated Surnames',
        phone: '9876543210',
        birth_date: new Date(),
        nationality: 'Updated Nationality',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(service, 'updateUserData').mockResolvedValue(result);

      expect(await controller.updateUserData('1', dto)).toBe(result);
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
      jest.spyOn(service, 'createUser').mockResolvedValue(true);

      expect(await controller.createUser(dto)).toBe(true);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      jest.spyOn(service, 'deleteUser').mockResolvedValue(true);

      expect(await controller.deleteUser('1')).toBe(true);
    });
  });
});
