import { Module } from '@nestjs/common';

import { AlarmService } from './alarms.service';
import { AlarmController } from './alarms.controller';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService],
})
export class AlarmModule {}
