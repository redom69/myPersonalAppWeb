import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';

@Module({
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class IngestionModule {}
