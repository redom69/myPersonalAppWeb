import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';

import {
  GetMenuInfo,
  MyAccount,
  MyDevices,
  OrganizationUpdateDto,
  User,
  UserData,
  UserUpdateDto,
} from '../dto/dto';
import { MyAccountService } from '../my-account.service';

import {
  prisma,
  get_if_organization_has_premium,
  user_is_active,
} from '@mypaw/server';

jest.mock('@mypaw/server', () => ({
  prisma: {
    user: {
      findFirstOrThrow: jest.fn(),
      findUnique: jest.fn(),
    },
    user_data: {
      update: jest.fn(),
    },
    organization_has_device: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
    },
    devices: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    organizations: {
      update: jest.fn(),
    },
  },
  get_if_organization_has_premium: jest.fn(),
  user_is_active: jest.fn(),
}));

describe('MyAccountService', () => {
  let service: MyAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyAccountService],
    }).compile();

    service = module.get<MyAccountService>(MyAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getData', () => {
    const baseUser = {
      u_id: 'user123',
      email: 'test@example.com',
      is_admin: true,
      user_data: {
        name: 'John',
        surnames: 'Doe',
        birth_date: new Date(),
        nationality: 'American',
        phone: '123456789',
      },
    };

    const expectMyAccount = (result, user) => {
      expect(result).toEqual(expect.any(MyAccount));
      expect(result.user).toEqual(expect.any(User));
      expect(result.user.email).toBe(user.email);
      expect(result.user.user_data).toEqual(expect.any(UserData));
      expect(result.user.user_data.name).toBe(user.user_data?.name);
      expect(result.user.user_data.surnames).toBe(user.user_data?.surnames);
      expect(result.user.user_data.birth_date).toEqual(
        user.user_data?.birth_date
      );
      expect(result.user.user_data.nationality).toBe(
        user.user_data?.nationality
      );
      expect(result.user.user_data.phone).toBe(user.user_data?.phone);
      expect(result.organization).toEqual(user.organizations);
      expect(result.can_edit).toBe(user.is_admin);
      expect(prisma.user.findFirstOrThrow).toHaveBeenCalledWith({
        where: { u_id: user.u_id },
        include: { user_data: true, organizations: true },
      });
    };

    it('should return user account data with single organization', async () => {
      const user = { ...baseUser, organizations: { name: 'Org1' } };
      (prisma.user.findFirstOrThrow as jest.Mock).mockResolvedValue(user);

      const result = await service.getData('user123');

      expectMyAccount(result, user);
    });

    it('should return user account data with null user_data fields', async () => {
      const user = {
        ...baseUser,
        user_data: null,
        organizations: { name: 'Org1' },
      };
      (prisma.user.findFirstOrThrow as jest.Mock).mockResolvedValue(user);

      const result = await service.getData('user123');

      expectMyAccount(result, user);
    });

    it('should return user account data with null organizations', async () => {
      const user = { ...baseUser, organizations: null };
      (prisma.user.findFirstOrThrow as jest.Mock).mockResolvedValue(user);

      const result = await service.getData('user123');

      expectMyAccount(result, user);
    });

    it('should return user account data with undefined organizations', async () => {
      const user = { ...baseUser, organizations: undefined };
      (prisma.user.findFirstOrThrow as jest.Mock).mockResolvedValue(user);

      const result = await service.getData('user123');

      expectMyAccount(result, user);
    });

    it('should return user account data with organizations having multiple entries', async () => {
      const user = {
        ...baseUser,
        organizations: [{ name: 'Org1' }, { name: 'Org2' }],
      };
      (prisma.user.findFirstOrThrow as jest.Mock).mockResolvedValue(user);

      const result = await service.getData('user123');

      expect(result).toEqual(expect.any(MyAccount));
      expect(result.user).toEqual(expect.any(User));
      expect(result.user.email).toBe(user.email);
      expect(result.user.user_data).toEqual(expect.any(UserData));
      expect(result.user.user_data.name).toBe(user.user_data.name);
      expect(result.user.user_data.surnames).toBe(user.user_data.surnames);
      expect(result.user.user_data.birth_date).toEqual(
        user.user_data.birth_date
      );
      expect(result.user.user_data.nationality).toBe(
        user.user_data.nationality
      );
      expect(result.user.user_data.phone).toBe(user.user_data.phone);
      expect(result.organization).toHaveLength(2);
      expect(result.organization[0].name).toBe('Org1');
      expect(result.organization[1].name).toBe('Org2');
      expect(result.can_edit).toBe(user.is_admin);
    });

    it('should handle user being null gracefully', async () => {
      (prisma.user.findFirstOrThrow as jest.Mock).mockResolvedValue(null);

      await expect(service.getData('user123')).rejects.toThrow(HttpException);
      await expect(service.getData('user123')).rejects.toThrow(
        'User not found'
      );
    });

    it('should handle user being undefined gracefully', async () => {
      (prisma.user.findFirstOrThrow as jest.Mock).mockResolvedValue(undefined);

      await expect(service.getData('user123')).rejects.toThrow(HttpException);
      await expect(service.getData('user123')).rejects.toThrow(
        'User not found'
      );
    });

    it('should throw a not found exception if user is not found', async () => {
      (prisma.user.findFirstOrThrow as jest.Mock).mockRejectedValue(
        new HttpException('User not found', HttpStatus.NOT_FOUND)
      );

      await expect(service.getData('user123')).rejects.toThrow(HttpException);
      await expect(service.getData('user123')).rejects.toThrow(
        'User not found'
      );
    });
  });

  describe('getMenu', () => {
    it('should return menu for active marsi user', async () => {
      const user = { u_id: 'user123', role: 'admin' };
      (user_is_active as jest.Mock).mockResolvedValue(true);
      (get_if_organization_has_premium as jest.Mock).mockResolvedValue(true);

      const result = await service.getMenu(user);

      expect(result).toEqual(expect.any(GetMenuInfo));
      expect(result.menu.length).toBeGreaterThan(1);
      expect(result.is_active).toBe(true);
      expect(result.premium).toBe(true);
      expect(result.menu).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            translation: 'pages.menu.devices',
          }),
          expect.objectContaining({
            translation: 'pages.menu.institutions',
          }),
          expect.objectContaining({
            translation: 'pages.menu.maintenance',
          }),
          expect.objectContaining({
            translation: 'pages.menu.patients',
          }),
          expect.objectContaining({
            translation: 'pages.menu.sessions',
          }),
          expect.objectContaining({
            translation: 'pages.menu.users',
          }),
        ])
      );
      expect(user_is_active).toHaveBeenCalledWith('user123');
      expect(get_if_organization_has_premium).toHaveBeenCalledWith('user123');
    });

    it('should return menu for active maintenance user', async () => {
      const user = { u_id: 'user123', role: 'maintenance' };
      (user_is_active as jest.Mock).mockResolvedValue(true);
      (get_if_organization_has_premium as jest.Mock).mockResolvedValue(true);

      const result = await service.getMenu(user);

      expect(result).toEqual(expect.any(GetMenuInfo));
      expect(result.menu.length).toBeGreaterThan(1);
      expect(result.is_active).toBe(true);
      expect(result.premium).toBe(true);
      expect(result.menu).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            translation: 'pages.menu.devices',
          }),
          expect.objectContaining({
            translation: 'pages.menu.maintenance',
          }),
        ])
      );
      expect(user_is_active).toHaveBeenCalledWith('user123');
      expect(get_if_organization_has_premium).toHaveBeenCalledWith('user123');
    });

    it('should return menu for active clinic user', async () => {
      const user = { u_id: 'user123', role: 'clinic' };
      (user_is_active as jest.Mock).mockResolvedValue(true);
      (get_if_organization_has_premium as jest.Mock).mockResolvedValue(true);

      const result = await service.getMenu(user);

      expect(result).toEqual(expect.any(GetMenuInfo));
      expect(result.menu.length).toBeGreaterThan(1);
      expect(result.is_active).toBe(true);
      expect(result.premium).toBe(true);
      expect(result.menu).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            translation: 'pages.menu.patients',
          }),
          expect.objectContaining({
            translation: 'pages.menu.sessions',
          }),
          expect.objectContaining({
            translation: 'pages.menu.users',
          }),
        ])
      );
      expect(user_is_active).toHaveBeenCalledWith('user123');
      expect(get_if_organization_has_premium).toHaveBeenCalledWith('user123');
    });

    it('should return menu for active personal user', async () => {
      const user = { u_id: 'user123', role: 'personal' };
      (user_is_active as jest.Mock).mockResolvedValue(true);
      (get_if_organization_has_premium as jest.Mock).mockResolvedValue(true);

      const result = await service.getMenu(user);

      expect(result).toEqual(expect.any(GetMenuInfo));
      expect(result.menu.length).toBeGreaterThan(1);
      expect(result.is_active).toBe(true);
      expect(result.premium).toBe(true);
      expect(result.menu).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            translation: 'pages.menu.patients',
          }),
          expect.objectContaining({
            translation: 'pages.menu.sessions',
          }),
        ])
      );
      expect(user_is_active).toHaveBeenCalledWith('user123');
      expect(get_if_organization_has_premium).toHaveBeenCalledWith('user123');
    });

    it('should return menu for inactive user', async () => {
      const user = { u_id: 'user123', role: 'admin' };
      (user_is_active as jest.Mock).mockResolvedValue(false);
      (get_if_organization_has_premium as jest.Mock).mockResolvedValue(false);

      const result = await service.getMenu(user);

      expect(result).toEqual(expect.any(GetMenuInfo));
      expect(result.menu.length).toBe(1);
      expect(result.is_active).toBe(false);
      expect(result.premium).toBe(false);
      expect(user_is_active).toHaveBeenCalledWith('user123');
      expect(get_if_organization_has_premium).toHaveBeenCalledWith('user123');
    });
  });

  describe('update', () => {
    it('should throw a not found exception if user is not found', async () => {
      (prisma.user.findFirstOrThrow as jest.Mock).mockResolvedValue(null);

      const userData: UserUpdateDto = {
        name: 'Jane',
        surnames: 'Doe',
        birth_date: new Date().toISOString(),
        nationality: 'American',
        phone: '987654321',
      };

      await expect(service.update('user123', userData)).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND)
      );
    });

    it('should update user account data', async () => {
      const user = { u_id: 'user123' };
      const userData: UserUpdateDto = {
        name: 'Jane',
        surnames: 'Doe',
        birth_date: new Date().toISOString(),
        nationality: 'American',
        phone: '987654321',
      };

      (prisma.user.findFirstOrThrow as jest.Mock).mockResolvedValue(user);
      (prisma.user_data.update as jest.Mock).mockResolvedValue(true);

      const result = await service.update('user123', userData);
      expect(result).toBe(true);
      expect(prisma.user.findFirstOrThrow).toHaveBeenCalledWith({
        where: { u_id: 'user123' },
      });
      expect(prisma.user_data.update).toHaveBeenCalledWith({
        data: userData,
        where: { u_id: 'user123' },
      });
    });
  });

  describe('getMyDevices', () => {
    it('should return all devices for user with marsi role', async () => {
      const user = {
        u_id: 'user123',
        organizations: { role: 'admin', o_id: 'org123' },
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      const allDevices = [{ d_id: 'device1' }, { d_id: 'device2' }];
      (prisma.devices.findMany as jest.Mock).mockResolvedValue(allDevices);

      const result = await service.getMyDevices('user123');
      expect(result.devices).toEqual(allDevices);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { u_id: 'user123' },
        include: { organizations: true },
      });
      expect(prisma.devices.findMany).toHaveBeenCalled();
    });

    it('should return organization devices for user without marsi role', async () => {
      const user = {
        u_id: 'user123',
        organizations: { role: 'clinic', o_id: 'org123' },
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      const orgDevices = [
        { devices: { d_id: 'device1' } },
        { devices: { d_id: 'device2' } },
      ];
      (prisma.organization_has_device.findMany as jest.Mock).mockResolvedValue(
        orgDevices
      );

      const result = await service.getMyDevices('user123');
      const devices = orgDevices.map((association) => association.devices);
      expect(result.devices).toEqual(devices);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { u_id: 'user123' },
        include: { organizations: true },
      });
      expect(prisma.organization_has_device.findMany).toHaveBeenCalledWith({
        where: { o_id: 'org123' },
        include: { devices: true },
      });
    });

    it('should throw a not found exception if user or organization is not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.getMyDevices('user123')).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('addDeviceToMyAccount', () => {
    it('should add device to user account', async () => {
      const userOrganization = {
        organizations: { o_id: 'org123' },
      };
      (prisma.organization_has_device.findFirst as jest.Mock).mockResolvedValue(
        null
      );
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userOrganization);
      const device = {
        d_id: 'device123',
        model: 'ModelX',
        serial: '12345',
        active: true,
      };
      (prisma.organization_has_device.create as jest.Mock).mockResolvedValue(
        true
      );
      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(device);

      const result = await service.addDeviceToMyAccount('user123', 'device123');
      expect(result).toEqual(expect.any(MyDevices));
      expect(prisma.organization_has_device.findFirst).toHaveBeenCalledWith({
        where: { d_id: 'device123' },
      });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { u_id: 'user123' },
        select: { organizations: true },
      });
      expect(prisma.organization_has_device.create).toHaveBeenCalledWith({
        data: {
          o_id: 'org123',
          d_id: 'device123',
        },
      });
      expect(prisma.devices.findUnique).toHaveBeenCalledWith({
        where: { d_id: 'device123' },
      });
    });

    it('should throw an error if device is already associated with an organization', async () => {
      (prisma.organization_has_device.findFirst as jest.Mock).mockResolvedValue(
        true
      );

      await expect(
        service.addDeviceToMyAccount('user123', 'device123')
      ).rejects.toThrow(HttpException);
    });

    it('should throw a bad request exception if user does not belong to any organization', async () => {
      const user_id = 'user123';
      const device_id = 'device123';

      (prisma.organization_has_device.findFirst as jest.Mock).mockResolvedValue(
        null
      );

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.addDeviceToMyAccount(user_id, device_id)
      ).rejects.toThrow(
        new HttpException(
          'User does not belong to any organization',
          HttpStatus.BAD_REQUEST
        )
      );

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        u_id: user_id,
        organizations: null,
      });

      await expect(
        service.addDeviceToMyAccount(user_id, device_id)
      ).rejects.toThrow(
        new HttpException(
          'User does not belong to any organization',
          HttpStatus.BAD_REQUEST
        )
      );
    });

    it('should throw a not found exception if device is not found', async () => {
      const userOrganization = {
        organizations: { o_id: 'org123' },
      };
      (prisma.organization_has_device.findFirst as jest.Mock).mockResolvedValue(
        null
      );
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userOrganization);
      (prisma.devices.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.addDeviceToMyAccount('user123', 'device123')
      ).rejects.toThrow(HttpException);
    });
  });

  describe('updateMyOrganization', () => {
    it('should update the organization', async () => {
      const organizationUpdate: OrganizationUpdateDto = {
        name: 'Updated Org',
        street_name: '',
        street_number: '',
        postal_code: '',
        country: '',
        state: '',
        city: '',
      };
      const updatedOrg = {
        o_id: 'org123',
        name: 'Updated Org',
      };
      (prisma.organizations.update as jest.Mock).mockResolvedValue(updatedOrg);

      const result = await service.updateMyOrganization(
        'user123',
        'org123',
        organizationUpdate
      );
      expect(result).toBe(true);
      expect(prisma.organizations.update).toHaveBeenCalledWith({
        where: { o_id: 'org123' },
        data: organizationUpdate,
      });
    });

    it('should throw a not found exception if organization is not found', async () => {
      (prisma.organizations.update as jest.Mock).mockResolvedValue(null);

      const organizationUpdate: OrganizationUpdateDto = {
        name: 'Updated Org',
        street_name: '',
        street_number: '',
        postal_code: '',
        country: '',
        state: '',
        city: '',
      };

      await expect(
        service.updateMyOrganization('user123', 'org123', organizationUpdate)
      ).rejects.toThrow(HttpException);
    });
  });
});
