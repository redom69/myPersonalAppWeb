import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Session {
  @ApiProperty({
    description: 'Unique identifier of the session.',
    example: 'a3f5ad56-2c0b-4efb-b8e9-68c2a4a96b4d',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Number of automatic forward steps recorded in the session.',
    example: 100,
  })
  @IsNumber()
  steps_automatic_forward: number;

  @ApiProperty({
    description: 'Number of automatic backward steps recorded in the session.',
    example: 50,
  })
  @IsNumber()
  steps_automatic_backward: number;

  @ApiProperty({
    description: 'Number of intentional forward steps recorded in the session.',
    example: 75,
  })
  @IsNumber()
  steps_intention_forward: number;

  @ApiProperty({
    description:
      'Number of intentional backward steps recorded in the session.',
    example: 25,
  })
  @IsNumber()
  steps_intention_backward: number;

  @ApiProperty({
    description: 'Degrees of hip flexion achieved during the session.',
    example: 30,
  })
  @IsNumber()
  flexos_hip: number;

  @ApiProperty({
    description: 'Degrees of knee flexion achieved during the session.',
    example: 45,
  })
  @IsNumber()
  flexos_knee: number;

  @ApiProperty({
    description: 'Degrees of ankle flexion achieved during the session.',
    example: 15,
  })
  @IsNumber()
  flexos_ankle: number;

  @ApiProperty({
    description: 'Left hip threshold achieved during the session.',
    example: 20,
  })
  @IsNumber()
  threshold_hipL: number;

  @ApiProperty({
    description: 'Left knee threshold achieved during the session.',
    example: 25,
  })
  @IsNumber()
  threshold_kneeL: number;

  @ApiProperty({
    description: 'Right hip threshold achieved during the session.',
    example: 20,
  })
  @IsNumber()
  threshold_hipR: number;

  @ApiProperty({
    description: 'Right knee threshold achieved during the session.',
    example: 25,
  })
  @IsNumber()
  threshold_kneeR: number;

  @ApiProperty({
    description:
      'Score given by the therapist for the use of dungarees during the session.',
    example: 8,
  })
  @IsNumber()
  therapist_dungarees: number;

  @ApiProperty({
    description: 'Effort level perceived by the therapist during the session.',
    example: 5,
  })
  @IsNumber()
  therapist_effort: number;

  @ApiProperty({
    description: 'Device identifier associated with the session.',
    example: '8e5ac92a-db8f-4c28-aac1-5e4d2b3c5c18',
    required: false,
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  d_id: string | null;

  @ApiProperty({ description: 'Date of the session.', example: '2024-04-26' })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Start time of the session.',
    example: '2024-04-26T08:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  start: string | null;

  @ApiProperty({
    description: 'End time of the session.',
    example: '2024-04-26T09:00:00Z',
  })
  @IsDateString()
  end: string;

  @ApiProperty({
    description:
      'Total time in minutes of automatic forward steps during the session.',
    example: 10,
  })
  @IsNumber()
  time_automatic_forward: number;

  @ApiProperty({
    description:
      'Total time in minutes of automatic backward steps during the session.',
    example: 5,
  })
  @IsNumber()
  time_automatic_backward: number;

  @ApiProperty({
    description:
      'Total time in minutes of intentional forward steps during the session.',
    example: 15,
  })
  @IsNumber()
  time_intentiton_forward: number;

  @ApiProperty({
    description:
      'Total time in minutes of intentional backward steps during the session.',
    example: 10,
  })
  @IsNumber()
  time_intention_backward: number;

  @ApiProperty({
    description:
      'Total number of steps taken by the patient during the session.',
    example: 200,
  })
  @IsNumber()
  steps_total: number;

  @ApiProperty({ description: 'Total session time in minutes.', example: 60 })
  @IsNumber()
  time_total: number;

  @ApiProperty({
    description:
      'Step cadence of automatic forward steps per minute during the session.',
    example: 2,
  })
  @IsNumber()
  cadence_automatic_forward: number;

  @ApiProperty({
    description:
      'Step cadence of automatic backward steps per minute during the session.',
    example: 1,
  })
  @IsNumber()
  cadence_automatic_backward: number;

  @ApiProperty({
    description:
      'Step cadence of intentional forward steps per minute during the session.',
    example: 1.5,
  })
  @IsNumber()
  cadence_intention_forward: number;

  @ApiProperty({
    description:
      'Step cadence of intentional backward steps per minute during the session.',
    example: 0.5,
  })
  @IsNumber()
  cadence_intention_backward: number;

  @ApiProperty({
    description:
      'Chest level achieved during the session. Can be used to assess the posture or equipment used.',
    example: 1,
  })
  @IsNumber()
  chest: number;

  @ApiProperty({
    description:
      "Overall session evaluation score, possibly based on a set of metrics or therapist's judgement.",
    example: 7,
  })
  @IsNumber()
  evaluation: number;

  @ApiProperty({
    description: 'Identifier of the ingestion associated with the session.',
    example: 'fe338788-8b9a-4666-92b6-dd3b44c5a91d',
  })
  @IsString()
  ingestion_id: string;
}
