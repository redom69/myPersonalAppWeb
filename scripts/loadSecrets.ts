import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { KeyVaultService } from '../apps/api/src/app/key/key-vault.service';

dotenv.config();

async function loadSecrets() {
  const keyVaultService = new KeyVaultService();

  // Array de los nombres de los secretos que necesitas
  const secretNames = [
    'jwtSecretKey',
    'sendgridApiKey',
    'databaseUrlLocal',
    'databaseUrlProd',
    'databaseUrlDev',
    'grafana',
    'postgresPassword',
    'hasuraGraphqlDatabaseUrl',
    'hasuraGraphqlAdminSecret',
    'hasuraGraphqlDatabaseUrlProd',
    'hasuraGraphqlAdminSecretProd',
    'azureStorageConnectionString',
    'nxCloudAccessToken',
  ];

  // Abrir archivo .env para añadir los nuevos valores al final
  const envFilePath = path.resolve(__dirname, '../.env');
  const envStream = fs.createWriteStream(envFilePath, { flags: 'a' }); // 'a' flag para añadir al final del archivo

  // Cargar todos los secretos y asignarlos a las variables de entorno
  for (const secretName of secretNames) {
    try {
      const secretValue = await keyVaultService.getSecret(secretName);
      console.log(
        `Loaded secret ${secretName}: ${secretValue ? 'success' : 'failure'}`
      );
      process.env[secretName] = secretValue;
      envStream.write(`\n${secretName}=${secretValue}\n`); // Añadir un salto de línea antes de escribir
    } catch (error) {
      console.error(`Failed to load secret ${secretName}:`, error);
    }
  }

  envStream.end();
  console.log('.env file updated successfully');
}

loadSecrets()
  .then(() => {
    console.log('Secrets loaded successfully');
  })
  .catch((err) => {
    console.error('Failed to load secrets', err);
    process.exit(1);
  });
