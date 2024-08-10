import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  LoginDto,
  RegisterDto,
  RequestResetPasswordDto,
  ResetPasswordDto,
} from '../app.dtos';
import { User, prisma, sendEmailToAdmin, verifyAccount } from '@mypaw/server';

jest.mock('@mypaw/server', () => ({
  User: {
    login: jest.fn(),
    create_token: jest.fn(),
    create_refresh_token: jest.fn(),
    getByEmail: jest.fn(),
    createUser: jest.fn(),
    requestResetPassword: jest.fn(),
    resetPassword: jest.fn(),
  },
  prisma: {
    organizations: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
  sendEmailToAdmin: jest.fn(),
  verifyAccount: jest.fn(),
}));

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(appService.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('login', () => {
    it('should return access token and refresh token', async () => {
      const loginDto: LoginDto = { username: 'test', password: 'test123' };
      const user = { id: 'test_id', username: 'test' };
      const tokens = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };

      (User.login as jest.Mock).mockResolvedValue(user);
      (User.create_token as jest.Mock).mockResolvedValue(tokens.access_token);
      (User.create_refresh_token as jest.Mock).mockResolvedValue(
        tokens.refresh_token
      );

      expect(await appService.login(loginDto)).toEqual(tokens);
    });

    it('should throw an exception if login fails', async () => {
      const loginDto: LoginDto = { username: 'test', password: 'test123' };

      (User.login as jest.Mock).mockRejectedValue(new Error());

      await expect(appService.login(loginDto)).rejects.toThrow(
        new HttpException(
          'Usuario y contraseña no válidos',
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe('emailVerification', () => {
    it('should return true if email exists', async () => {
      (User.getByEmail as jest.Mock).mockResolvedValue({
        email: 'test@test.com',
      });

      expect(await appService.emailVerification('test@test.com')).toBe(true);
    });

    it('should return false if email does not exist', async () => {
      (User.getByEmail as jest.Mock).mockResolvedValue(null);

      expect(await appService.emailVerification('test@test.com')).toBe(false);
    });
  });

  describe('register', () => {
    it('should register a user and return tokens', async () => {
      const registerDto: RegisterDto = {
        email: 'test@test.com',
        password: 'test123',
        name: 'Test',
        surnames: 'User',
        phone: '1234567890',
        birth_date: new Date().toISOString(),
        nationality: 'Test',
        organization_id: 'test_org_id',
      };
      const user = { id: 'test_id', email: 'test@test.com' };
      const tokens = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };

      const consoleLogSpy = jest
        .spyOn(console, 'log')
        .mockImplementation((message) => {
          return message;
        });

      (User.getByEmail as jest.Mock).mockResolvedValue(null);
      (User.createUser as jest.Mock).mockResolvedValue(user);
      (User.create_token as jest.Mock).mockResolvedValue(tokens.access_token);
      (User.create_refresh_token as jest.Mock).mockResolvedValue(
        tokens.refresh_token
      );
      (verifyAccount as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error('Error sending email'))
      );
      (sendEmailToAdmin as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error('Error sending admin email'))
      );

      expect(await appService.register(registerDto)).toEqual(tokens);

      expect(consoleLogSpy).toHaveBeenCalledWith('Error sending email');
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(consoleLogSpy).toHaveBeenCalledWith('Error sending admin email');
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));

      consoleLogSpy.mockRestore();
    });

    it('should throw an exception if email already exists', async () => {
      const registerDto: RegisterDto = {
        email: 'test@test.com',
        password: 'test123',
        name: 'Test',
        surnames: 'User',
        phone: '1234567890',
        birth_date: new Date().toISOString(),
        nationality: 'Test',
        organization_id: 'test_org_id',
      };

      (User.getByEmail as jest.Mock).mockResolvedValue({
        email: 'test@test.com',
      });

      await expect(appService.register(registerDto)).rejects.toThrow(
        new HttpException('ya existe', HttpStatus.CONFLICT)
      );
    });

    it('should throw an exception if user creation fails', async () => {
      const registerDto: RegisterDto = {
        email: 'test@test.com',
        password: 'test123',
        name: 'Test',
        surnames: 'User',
        phone: '1234567890',
        birth_date: new Date().toISOString(),
        nationality: 'Test',
        organization_id: 'test_org_id',
      };

      (User.getByEmail as jest.Mock).mockResolvedValue(null);
      (User.createUser as jest.Mock).mockRejectedValue(new Error());

      await expect(appService.register(registerDto)).rejects.toThrow(
        new HttpException('Algo inesperado ocurrió', HttpStatus.BAD_REQUEST)
      );
    });
  });

  describe('requestResetPassword', () => {
    it('should request a password reset and return success', async () => {
      const requestResetPasswordDto: RequestResetPasswordDto = {
        username: 'test',
      };
      const response = { success: true };

      (User.requestResetPassword as jest.Mock).mockResolvedValue(response);

      expect(
        await appService.requestResetPassword(requestResetPasswordDto)
      ).toEqual(response);
    });
  });

  describe('resetPassword', () => {
    it('should reset password and return success', async () => {
      const resetPasswordDto: ResetPasswordDto = {
        id: 'test_id',
        r: 'token',
        new_password: 'newpass',
        confirm_new_password: 'newpass',
      };
      const response = true;

      (User.resetPassword as jest.Mock).mockResolvedValue(response);

      expect(await appService.resetPassword(resetPasswordDto)).toEqual({
        success: response,
      });
    });

    it('should throw an exception if reset password fails', async () => {
      const resetPasswordDto: ResetPasswordDto = {
        id: 'test_id',
        r: 'token',
        new_password: 'newpass',
        confirm_new_password: 'newpass',
      };

      (User.resetPassword as jest.Mock).mockResolvedValue(false);

      await expect(appService.resetPassword(resetPasswordDto)).rejects.toThrow(
        new HttpException(
          'No se pudo cambiar la contraseña',
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe('getOrganizationNameByCode', () => {
    it('should return organization name by code', async () => {
      const organization = { o_id: 'test_org_id', name: 'Test Organization' };

      (prisma.organizations.findFirst as jest.Mock).mockResolvedValue(
        organization
      );

      expect(await appService.getOrganizationNameByCode('test_org_id')).toEqual(
        { name: 'Test Organization' }
      );
    });

    it('should throw an exception if organization not found', async () => {
      (prisma.organizations.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        appService.getOrganizationNameByCode('test_org_id')
      ).rejects.toThrow(
        new HttpException('Organization not found', HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('getOrganizations', () => {
    it('should return a list of organizations', async () => {
      const organizations = [{ o_id: 'test_o_id', name: 'Test Organization' }];

      (prisma.organizations.findMany as jest.Mock).mockResolvedValue(
        organizations
      );

      expect(await appService.getOrganizations()).toEqual(organizations);
    });
  });
});
