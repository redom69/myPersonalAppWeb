import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import {
  LoginDto,
  RegisterDto,
  RequestResetPasswordDto,
  ResetPasswordDto,
  OrganizationDto,
} from '../app.dtos';

import { refreshAccessToken } from '@marsinet/server';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

jest.mock('@marsinet/server', () => ({
  refreshAccessToken: jest.fn(),
}));

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getData: jest.fn().mockReturnValue({ message: 'Hello API' }),
            login: jest.fn(),
            register: jest.fn(),
            requestResetPassword: jest.fn(),
            resetPassword: jest.fn(),
            getOrganizationNameByCode: jest.fn(),
            getOrganizations: jest.fn(),
            emailVerification: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('refreshToken', () => {
    it('should refresh token and return new access token', async () => {
      const refreshTokenDto = { refresh_token: 'valid_refresh_token' };
      const result = { access_token: 'new_access_token' };
      (refreshAccessToken as jest.Mock).mockResolvedValue(result);

      expect(await appController.refreshToken(refreshTokenDto)).toEqual(result);
    });

    it('should throw an exception if refresh token fails', async () => {
      const refreshTokenDto = { refresh_token: 'invalid_refresh_token' };
      (refreshAccessToken as jest.Mock).mockRejectedValue(
        new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
      );

      await expect(appController.refreshToken(refreshTokenDto)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('login', () => {
    it('should login and return access token and refresh token', async () => {
      const loginDto: LoginDto = { username: 'test', password: 'test123' };
      const result = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };
      jest.spyOn(appService, 'login').mockResolvedValue(result);

      expect(await appController.login(loginDto)).toEqual(result);
    });

    it('should throw an exception if login fails', async () => {
      const loginDto: LoginDto = { username: 'test', password: 'test123' };
      jest
        .spyOn(appService, 'login')
        .mockRejectedValue(
          new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        );

      await expect(appController.login(loginDto)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('register', () => {
    it('should register a user and return access token and refresh token', async () => {
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
      const result = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };
      jest.spyOn(appService, 'register').mockResolvedValue(result);

      expect(await appController.register(registerDto)).toEqual(result);
    });

    it('should throw an exception if registration fails', async () => {
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
      jest
        .spyOn(appService, 'register')
        .mockRejectedValue(new HttpException('Conflict', HttpStatus.CONFLICT));

      await expect(appController.register(registerDto)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('requestResetPassword', () => {
    it('should request a password reset and return success', async () => {
      const requestResetPasswordDto: RequestResetPasswordDto = {
        username: 'test',
      };
      const result = { success: true };
      jest.spyOn(appService, 'requestResetPassword').mockResolvedValue(result);

      expect(
        await appController.requestResetPassword(requestResetPasswordDto)
      ).toEqual(result);
    });

    it('should throw an exception if request reset password fails', async () => {
      const requestResetPasswordDto: RequestResetPasswordDto = {
        username: 'test',
      };
      jest
        .spyOn(appService, 'requestResetPassword')
        .mockRejectedValue(
          new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        );

      await expect(
        appController.requestResetPassword(requestResetPasswordDto)
      ).rejects.toThrow(HttpException);
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
      const result = { success: true };
      jest.spyOn(appService, 'resetPassword').mockResolvedValue(result);

      expect(await appController.resetPassword(resetPasswordDto)).toEqual(
        result
      );
    });

    it('should throw an exception if reset password fails', async () => {
      const resetPasswordDto: ResetPasswordDto = {
        id: 'test_id',
        r: 'token',
        new_password: 'newpass',
        confirm_new_password: 'newpass',
      };
      jest
        .spyOn(appService, 'resetPassword')
        .mockRejectedValue(
          new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        );

      await expect(
        appController.resetPassword(resetPasswordDto)
      ).rejects.toThrow(HttpException);
    });
  });

  describe('getOrganizationNameByCode', () => {
    it('should return organization name by code', async () => {
      const organizationCode = 'test_org_code';
      const result = { name: 'Test Organization' };
      jest
        .spyOn(appService, 'getOrganizationNameByCode')
        .mockResolvedValue(result);

      expect(
        await appController.getOrganizationNameByCode(organizationCode)
      ).toEqual(result);
    });

    it('should throw an exception if getting organization name by code fails', async () => {
      const organizationCode = 'test_org_code';
      jest
        .spyOn(appService, 'getOrganizationNameByCode')
        .mockRejectedValue(
          new HttpException('Not Found', HttpStatus.NOT_FOUND)
        );

      await expect(
        appController.getOrganizationNameByCode(organizationCode)
      ).rejects.toThrow(HttpException);
    });
  });

  describe('getOrganizations', () => {
    it('should return a list of organizations', async () => {
      const result: OrganizationDto[] = [
        { o_id: 'test_o_id', name: 'Test Organization' },
      ];
      jest.spyOn(appService, 'getOrganizations').mockResolvedValue(result);

      expect(await appController.getOrganizations()).toEqual(result);
    });

    it('should throw an exception if getting organizations fails', async () => {
      jest
        .spyOn(appService, 'getOrganizations')
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR
          )
        );

      await expect(appController.getOrganizations()).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('emailVerification', () => {
    it('should verify email and return success', async () => {
      const token = 'verification_token';
      const result = true;
      jest.spyOn(appService, 'emailVerification').mockResolvedValue(result);

      expect(await appController.emailVerification(token)).toEqual(result);
    });
    it('should throw an exception if email verification fails', async () => {
      const token = 'verification_token';
      jest
        .spyOn(appService, 'emailVerification')
        .mockRejectedValue(
          new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        );

      await expect(appController.emailVerification(token)).rejects.toThrow(
        HttpException
      );
    });
  });
});
