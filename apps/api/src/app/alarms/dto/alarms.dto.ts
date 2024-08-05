import { ApiProperty, PartialType } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import {
  IsDateString,
  IsNumber,
  IsString,
  IsObject,
  IsOptional,
} from 'class-validator';

export class Alarm {
  @ApiProperty({
    description: 'Unique identifier of the alarm ingestion.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  i_id?: string;

  @ApiProperty({
    description: 'Unique identifier of the alarm.',
    example: '456e7891-b12c-34d5-e678-426614174001',
    required: false,
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'Timestamp of when the alarm was last updated.',
    example: '2023-01-15T08:30:00Z',
    required: false,
  })
  @IsString()
  @IsOptional()
  updated_at?: string | Date;

  @ApiProperty({
    description: 'Type of the event that triggered the alarm.',
    example: 'ERROR',
  })
  @IsString()
  event_type: string;

  @ApiProperty({
    description: 'Unique identifier of the event.',
    example: 'e1',
  })
  @IsString()
  event_id: string;

  @ApiProperty({
    description: 'Value associated with the alarm event.',
    example: 100,
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'Timestamp of when the event occurred.',
    example: '2023-01-15T08:30:00Z',
  })
  @IsDateString()
  timestamp: Date | string;

  @ApiProperty({
    description: 'Additional parameters associated with the alarm.',
    example: { key: 'value' },
  })
  @IsObject()
  params: JsonValue;

  @ApiProperty({
    description: 'Version of the alarm.',
    example: 'v1',
  })
  @IsString()
  version: string;
}

export class UpdateAlarm extends PartialType(Alarm) {}
