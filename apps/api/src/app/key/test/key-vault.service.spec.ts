import { Test, TestingModule } from '@nestjs/testing';
import { SecretClient } from '@azure/keyvault-secrets';

import { KeyVaultService } from '../key-vault.service';

// Mock the Azure Key Vault dependencies
jest.mock('@azure/keyvault-secrets', () => ({
  SecretClient: jest.fn().mockImplementation(() => ({
    getSecret: jest.fn(),
  })),
}));

jest.mock('@azure/identity', () => ({
  DefaultAzureCredential: jest.fn(),
}));

describe('KeyVaultService', () => {
  let service: KeyVaultService;
  let secretClientMock: jest.Mocked<SecretClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyVaultService],
    }).compile();

    service = module.get<KeyVaultService>(KeyVaultService);
    secretClientMock = (service as any).client as jest.Mocked<SecretClient>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return secret value when getSecret is called with a valid secret name', async () => {
    const secretName = 'mySecret';
    const secretValue = 'secretValue';
    secretClientMock.getSecret.mockResolvedValue({ value: secretValue } as any);

    const result = await service.getSecret(secretName);
    expect(result).toBe(secretValue);
    expect(secretClientMock.getSecret).toHaveBeenCalledWith(secretName);
  });

  it('should throw an error if the secret is not found or has no value', async () => {
    const secretName = 'mySecret';
    secretClientMock.getSecret.mockResolvedValue({ value: undefined } as any);

    await expect(service.getSecret(secretName)).rejects.toThrow(
      `Secret ${secretName} not found or has no value`
    );
    expect(secretClientMock.getSecret).toHaveBeenCalledWith(secretName);
  });
});
