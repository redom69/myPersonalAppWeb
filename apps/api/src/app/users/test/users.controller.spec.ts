import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { UserTokenDto } from '../../my-account/dto/dto';
import { ToggleUserActiveDto, UserTable } from '../dto/user.dto';
import { Organization } from '../../admin/dto/dto';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findAll: jest.fn(),
      toggleActiveUser: jest.fn(),
      getOrganization: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(AuthenticatedGuard)
      .useValue({ canActivate: () => true })
      .compile();

    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const user: UserTokenDto = {
        u_id: '123',
        email: 'test@example.com',
        o_id: '1',
        role: 'marsi',
        created_at: '',
        updated_at: '',
        iat: 0,
        exp: 0,
      };
      const result: UserTable[] = [
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
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll(user)).toBe(result);
    });
  });

  describe('toggleActiveUser', () => {
    it('should return a boolean indicating the result of the status change', async () => {
      const data: ToggleUserActiveDto = { u_id: '1', o_id: '1', active: true };
      jest.spyOn(service, 'toggleActiveUser').mockResolvedValue(true);

      expect(await controller.toggleActiveUser(data)).toBe(true);
    });
  });

  describe('getOrganization', () => {
    it('should return an organization', async () => {
      const result: Organization = {
        o_id: '1',
        name: 'Test Org',
        street_name: 'Main St',
        street_number: '123',
        postal_code: '12345',
        country: 'Country',
        city: 'City',
        role: 'admin',
        premium: false,
      };
      jest.spyOn(service, 'getOrganization').mockResolvedValue(result);

      expect(await controller.getOrganization('1')).toBe(result);
    });
  });
});
