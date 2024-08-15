import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { prisma, sendWelcomeEmailToUser } from '@mypaw/server';

import { UsersService } from '../users.service';
import { ToggleUserActiveDto } from '../dto/user.dto';
import { UserTokenDto } from '../../my-account/dto/dto';

jest.mock('@mypaw/server', () => ({
  prisma: {
    organizations: {
      findFirst: jest.fn(),
    },
    user: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
  sendWelcomeEmailToUser: jest.fn(),
}));

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of users for admin role', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'admin',
        created_at: '',
        updated_at: '',
        iat: 0,
        exp: 0,
      };
      const organization = { o_id: '1' };
      const users = [
        {
          u_id: '1',
          email: 'test@example.com',
          user_data: { name: 'Test', surnames: 'User' },
          organizations: { role: 'admin' },
          o_id: '1',
          is_admin: true,
          active: true,
        },
        {
          u_id: '2',
          email: 'example@example.com',
          user_data: null,
          organizations: null,
          o_id: '1',
          is_admin: false,
          active: true,
        },
      ];

      (prisma.organizations.findFirst as jest.Mock).mockResolvedValue(
        organization
      );
      (prisma.user.findMany as jest.Mock).mockResolvedValue(users);

      const result = await service.findAll(user);
      expect(result).toEqual([
        {
          u_id: '1',
          name: 'Test',
          surnames: 'User',
          email: 'test@example.com',
          o_id: '1',
          is_admin: true,
          active: true,
          role: 'admin',
        },
        {
          u_id: '2',
          name: undefined,
          surnames: undefined,
          email: 'example@example.com',
          o_id: '1',
          is_admin: false,
          active: true,
          role: undefined,
        },
      ]);
    });

    it('should return an array of users for non-admin role', async () => {
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
      const organization = { o_id: '1' };
      const users = [
        {
          u_id: '1',
          email: 'test@example.com',
          user_data: { name: 'Test', surnames: 'User' },
          organizations: { role: 'admin' },
          o_id: '1',
          is_admin: true,
          active: true,
        },
        {
          u_id: '2',
          email: 'example@example.com',
          user_data: null,
          organizations: null,
          o_id: '1',
          is_admin: false,
          active: true,
        },
      ];

      (prisma.organizations.findFirst as jest.Mock).mockResolvedValue(
        organization
      );
      (prisma.user.findMany as jest.Mock).mockResolvedValue(users);

      const result = await service.findAll(user);
      expect(result).toEqual([
        {
          u_id: '1',
          name: 'Test',
          surnames: 'User',
          email: 'test@example.com',
          o_id: '1',
          is_admin: true,
          active: true,
          role: 'admin',
        },
        {
          u_id: '2',
          name: undefined,
          surnames: undefined,
          email: 'example@example.com',
          o_id: '1',
          is_admin: false,
          active: true,
          role: undefined,
        },
      ]);
    });

    it('should throw an exception if organization not found', async () => {
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

      (prisma.organizations.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.findAll(user)).rejects.toThrow(HttpException);
      await expect(service.findAll(user)).rejects.toThrow(
        'Organization not found'
      );
    });
  });

  describe('getOrganization', () => {
    it('should return an organization', async () => {
      const organization = { o_id: '1', name: 'Test Org', role: 'admin' };
      const user = {
        u_id: '1',
        organizations: organization,
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(user);

      const result = await service.getOrganization('1');
      expect(result).toEqual(organization);
    });

    it('should throw an exception if user not found', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getOrganization('1')).rejects.toThrow(HttpException);
      await expect(service.getOrganization('1')).rejects.toThrow(
        'User not found'
      );
    });
  });

  describe('toggleActiveUser', () => {
    it('should return true and send email if user is activated', async () => {
      const data: ToggleUserActiveDto = { u_id: '1', o_id: '1', active: true };
      const user = {
        u_id: '1',
        email: 'test@example.com',
        active: true,
      };

      (prisma.user.update as jest.Mock).mockResolvedValue(user);
      (sendWelcomeEmailToUser as jest.Mock).mockResolvedValue(true);

      const result = await service.toggleActiveUser(data);
      expect(result).toBe(true);
      expect(sendWelcomeEmailToUser).toHaveBeenCalledWith('test@example.com');
    });

    it('should return true without sending email if user is deactivated', async () => {
      const data: ToggleUserActiveDto = { u_id: '1', o_id: '1', active: false };
      const user = {
        u_id: '1',
        email: 'test@example.com',
        active: false,
      };

      (prisma.user.update as jest.Mock).mockResolvedValue(user);

      const result = await service.toggleActiveUser(data);
      expect(result).toBe(true);
      expect(sendWelcomeEmailToUser).not.toHaveBeenCalled();
    });

    it('should log an error if sending email fails', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(jest.fn());

      const data: ToggleUserActiveDto = { u_id: '1', o_id: '1', active: true };
      const user = {
        u_id: '1',
        email: 'test@example.com',
        active: true,
      };

      (prisma.user.update as jest.Mock).mockResolvedValue(user);
      (sendWelcomeEmailToUser as jest.Mock).mockRejectedValue(
        new Error('Email send failed')
      );

      const result = await service.toggleActiveUser(data);
      expect(result).toBe(true);
      expect(sendWelcomeEmailToUser).toHaveBeenCalledWith('test@example.com');
      expect(console.error).toHaveBeenCalledWith('Error sending email');

      consoleSpy.mockRestore();
    });

    it('should throw an exception if there is an error updating the user', async () => {
      const data: ToggleUserActiveDto = { u_id: '1', o_id: '1', active: true };

      (prisma.user.update as jest.Mock).mockRejectedValue(
        new Error('Update failed')
      );

      await expect(service.toggleActiveUser(data)).rejects.toThrow(
        HttpException
      );
      await expect(service.toggleActiveUser(data)).rejects.toThrow(
        'Error updating user'
      );
    });
  });
});
