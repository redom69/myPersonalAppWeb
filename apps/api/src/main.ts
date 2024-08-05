import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import * as events from 'events'; // Import the events module
import { KeyVaultService } from './app/key/key-vault.service';

import './cron';

events.EventEmitter.defaultMaxListeners = 20;

async function bootstrap() {
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

  // Cargar todos los secretos y asignarlos a las variables de entorno
  for (const secretName of secretNames) {
    const secretValue = await keyVaultService.getSecret(secretName);
    process.env[secretName] = secretValue;
  }

  const app = await NestFactory.create(AppModule);

  // Cors
  app.enableCors();

  const globalPrefix = '';

  // Validators
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '700mb' }));
  app.use(bodyParser.urlencoded({ limit: '700mb', extended: true }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Marsinet')
    .setDescription('The marsinet API description')
    .setVersion('2.1.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.setGlobalPrefix(globalPrefix);
  let port = process.env.PORT || 3333;
  if (process.env.NODE_ENV === 'development') {
    port = 3334; // Por ejemplo, usar el puerto 3334 en desarrollo
  }
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
