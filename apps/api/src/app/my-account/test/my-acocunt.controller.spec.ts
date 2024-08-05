import { Test, TestingModule } from '@nestjs/testing';

import { MyAccountController } from '../my-account.controller';
import { MyAccountService } from '../my-account.service';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { UserTokenDto, UserUpdateDto, OrganizationUpdateDto } from '../dto/dto';

jest.mock('../my-account.service');

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

describe('MyAccountController', () => {
  let controller: MyAccountController;
  let service: MyAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyAccountController],
      providers: [MyAccountService],
    })
      .overrideGuard(AuthenticatedGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    controller = module.get<MyAccountController>(MyAccountController);
    service = module.get<MyAccountService>(MyAccountService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getData', () => {
    it('should return user account data', async () => {
      const userToken: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      const result = { id: 'user123', name: 'John Doe' } as any;
      jest.spyOn(service, 'getData').mockResolvedValue(result);

      expect(await controller.getData(userToken)).toBe(result);
      expect(service.getData).toHaveBeenCalledWith(userToken.u_id);
    });
  });

  describe('update', () => {
    it('should update user account data', async () => {
      const userToken: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      const userData: UserUpdateDto = {
        name: 'Jane Doe',
        surnames: '',
        birth_date: '',
        nationality: '',
        phone: '',
      };
      const result = { id: 'user123', name: 'Jane Doe' } as any;
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(userData, userToken)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(userToken.u_id, userData);
    });
  });

  describe('getMenu', () => {
    it('should return menu of user', async () => {
      const userToken: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      const result = { menu: 'some menu data' } as any;
      jest.spyOn(service, 'getMenu').mockResolvedValue(result);

      expect(await controller.getMenu(userToken)).toBe(result);
      expect(service.getMenu).toHaveBeenCalledWith(userToken);
    });
  });

  describe('getMyDevices', () => {
    it('should return devices access of user', async () => {
      const userToken: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      const result = { devices: ['device1', 'device2'] } as any;
      jest.spyOn(service, 'getMyDevices').mockResolvedValue(result);

      expect(await controller.getMyDevices(userToken)).toBe(result);
      expect(service.getMyDevices).toHaveBeenCalledWith(userToken.u_id);
    });
  });

  describe('addDeviceToMyAccount', () => {
    it('should add device to user account', async () => {
      const userToken: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      const device_id = 'device456';
      const result = { devices: ['device1', 'device2', 'device456'] } as any;
      jest.spyOn(service, 'addDeviceToMyAccount').mockResolvedValue(result);

      expect(await controller.addDeviceToMyAccount(userToken, device_id)).toBe(
        result
      );
      expect(service.addDeviceToMyAccount).toHaveBeenCalledWith(
        userToken.u_id,
        device_id
      );
    });
  });

  describe('updateOrganization', () => {
    it('should update user organization', async () => {
      const userToken: UserTokenDto = {
        u_id: 'user123',
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
        role: '',
        iat: 0,
        exp: 0,
      };
      const organization_id = 'org789';
      const organizationUpdate: OrganizationUpdateDto = {
        name: 'New Org Name',
        street_name: '',
        street_number: '',
        postal_code: '',
        country: '',
        state: '',
        city: '',
      };
      const result = { id: 'org789', name: 'New Org Name' } as any;
      jest.spyOn(service, 'updateMyOrganization').mockResolvedValue(result);

      expect(
        await controller.updateOrganization(
          userToken,
          organization_id,
          organizationUpdate
        )
      ).toBe(result);
      expect(service.updateMyOrganization).toHaveBeenCalledWith(
        userToken.u_id,
        organization_id,
        organizationUpdate
      );
    });
  });
});
