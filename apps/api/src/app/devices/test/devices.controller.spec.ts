import { Test, TestingModule } from '@nestjs/testing';

import { DevicesController } from '../devices.controller';
import { DevicesService } from '../devices.service';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { UserTokenDto } from '../../my-account/dto/dto';
import { CreateDeviceDto } from '../dto/create-device.dto';
import {
  UpdateActiveDeviceDto,
  UpdateDeviceDto,
} from '../dto/update-device.dto';
import { Organization } from '../../admin/dto/dto';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

describe('DevicesController', () => {
  let controller: DevicesController;
  let service: DevicesService;

  beforeEach(async () => {
    const mockDevicesService = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      updateActive: jest.fn(),
      update: jest.fn(),
      removeFromOrg: jest.fn(),
      remove: jest.fn(),
      findAllOrganizations: jest.fn(),
      addDeviceToOrganization: jest.fn(),
      removeDeviceFromOrganization: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        {
          provide: DevicesService,
          useValue: mockDevicesService,
        },
      ],
    })
      .overrideGuard(AuthenticatedGuard)
      .useValue({ canActivate: () => true })
      .compile();

    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    controller = module.get<DevicesController>(DevicesController);
    service = module.get<DevicesService>(DevicesService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      const result = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createDeviceDto)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should retrieve a device by its ID', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: '',
        updated_at: '',
        iat: 0,
        exp: 0,
      };
      const result = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1', user)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should retrieve all devices', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: '',
        updated_at: '',
        iat: 0,
        exp: 0,
      };
      const result: any[] = [
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

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll(user)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update the active status of a device', async () => {
      const updateActiveDeviceDto: UpdateActiveDeviceDto = { active: true };
      const result = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'updateActive').mockResolvedValue(result);

      expect(await controller.update('1', updateActiveDeviceDto)).toBe(result);
    });

    it('should update a device by its ID', async () => {
      const updateDeviceDto: UpdateDeviceDto = { model: 'Updated Model' };
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: '',
        updated_at: '',
        iat: 0,
        exp: 0,
      };
      const result = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Updated Model',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.updateDevice('1', updateDeviceDto, user)).toBe(
        result
      );
    });
  });

  describe('removeDeviceFromOrganizations', () => {
    it('should delete all devices from an organization', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: '',
        updated_at: '',
        iat: 0,
        exp: 0,
      };
      const result = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'removeFromOrg').mockResolvedValue(result);

      expect(await controller.removeDeviceFromOrganizations('1', user)).toBe(
        result
      );
    });
  });

  describe('remove', () => {
    it('should delete a device by its ID', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: '',
        updated_at: '',
        iat: 0,
        exp: 0,
      };
      const result = {
        d_id: '1',
        active: true,
        serial: 'SN123456789',
        structure_version: 'v1.0.0',
        model: 'Model X Pro',
        password: 'P@ssw0rd!',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1', user)).toBe(result);
    });
  });

  describe('findAllOrganizations', () => {
    it('should retrieve all organizations for a given device', async () => {
      const result: Organization[] = [
        {
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
      ];

      jest.spyOn(service, 'findAllOrganizations').mockResolvedValue(result);

      expect(await controller.findAllOrganizations('1')).toBe(result);
    });
  });

  describe('addDeviceToOrganization', () => {
    it('should add a device to an organization', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: '',
        updated_at: '',
        iat: 0,
        exp: 0,
      };
      const result = true;

      jest.spyOn(service, 'addDeviceToOrganization').mockResolvedValue(result);

      expect(await controller.addDeviceToOrganization('12345', '1', user)).toBe(
        result
      );
    });
  });

  describe('removeDeviceFromOrganization', () => {
    it('should remove a device from an organization', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'user',
        created_at: '',
        updated_at: '',
        iat: 0,
        exp: 0,
      };
      const result = true;

      jest
        .spyOn(service, 'removeDeviceFromOrganization')
        .mockResolvedValue(result);

      expect(
        await controller.removeDeviceFromOrganization('1', '1', user)
      ).toBe(result);
    });
  });
});
