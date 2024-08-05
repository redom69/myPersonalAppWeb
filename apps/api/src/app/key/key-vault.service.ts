import { Injectable } from '@nestjs/common';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class KeyVaultService {
  private client: SecretClient;

  constructor() {
    const credential = new DefaultAzureCredential();
    const vaultName = process.env.AZURE_KEY_VAULT_NAME;
    const url = `https://${vaultName}.vault.azure.net`;
    this.client = new SecretClient(url, credential);
  }

  async getSecret(secretName: string): Promise<string> {
    const secret = await this.client.getSecret(secretName);
    if (!secret.value) {
      throw new Error(`Secret ${secretName} not found or has no value`);
    }
    return secret.value;
  }
}
