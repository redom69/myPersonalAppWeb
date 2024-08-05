import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthenticatedGuard, GetUser } from '../authenticated.guard';
import { verify_token } from '@marsinet/server';

jest.mock('@marsinet/server', () => ({
  verify_token: jest.fn(),
}));

interface CustomExecutionContext extends ExecutionContext {
  switchToHttp: jest.MockedFunction<
    () => {
      getRequest: jest.MockedFunction<() => any>;
      getResponse: jest.MockedFunction<() => any>;
      getNext: jest.MockedFunction<() => any>;
    }
  >;
}

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let mockExecutionContext: CustomExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticatedGuard],
    }).compile();

    guard = module.get<AuthenticatedGuard>(AuthenticatedGuard);

    mockExecutionContext = {
      switchToHttp: jest.fn(),
      getRequest: jest.fn(),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    } as unknown as CustomExecutionContext;
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw ForbiddenException if Authorization header is missing', async () => {
    mockExecutionContext.switchToHttp.mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {},
      }),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    });

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
      new ForbiddenException('No se proporcionó token de autenticación')
    );
  });

  it('should throw ForbiddenException if Authorization header is not a Bearer token', async () => {
    mockExecutionContext.switchToHttp.mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'InvalidToken',
        },
      }),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    });

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
      new ForbiddenException('No se proporcionó token de autenticación')
    );
  });

  it('should throw ForbiddenException if Authorization header does not include Bearer', async () => {
    mockExecutionContext.switchToHttp.mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Token tokenvalue',
        },
      }),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    });

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
      new ForbiddenException('No se proporcionó token de autenticación')
    );
  });

  it('should throw ForbiddenException if token is invalid', async () => {
    mockExecutionContext.switchToHttp.mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Bearer invalidtoken',
        },
      }),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    });

    (verify_token as jest.Mock).mockResolvedValue(null);

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
      new ForbiddenException('Token inválido o expirado')
    );
  });

  it('should return true if token is valid', async () => {
    const user = { id: 1, name: 'test' };
    mockExecutionContext.switchToHttp.mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Bearer validtoken',
        },
      }),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    });

    (verify_token as jest.Mock).mockResolvedValue(user);

    await expect(guard.canActivate(mockExecutionContext)).resolves.toBe(true);
  });

  it('should set the user in the request if token is valid', async () => {
    const user = { id: 1, name: 'test' };
    const mockRequest = {
      headers: {
        authorization: 'Bearer validtoken',
      },
      user: null,
    };
    mockExecutionContext.switchToHttp.mockReturnValue({
      getRequest: jest.fn().mockReturnValue(mockRequest),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    });

    (verify_token as jest.Mock).mockResolvedValue(user);

    await guard.canActivate(mockExecutionContext);

    expect(mockRequest.user).toBe(user);
  });
});
