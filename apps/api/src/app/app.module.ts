import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';
import { PatientModule } from './patient/patient.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { MyAccountModule } from './my-account/my-account.module';
import { DevicesModule } from './devices/devices.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AlarmModule } from './alarms/alarms.module';

@Module({
  imports: [
    SessionModule,
    PatientModule,
    IngestionModule,
    MyAccountModule,
    DevicesModule,
    UsersModule,
    AdminModule,
    AlarmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
