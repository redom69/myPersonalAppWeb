import { COUNTRIES_CODE } from '@marsinet/commons';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export enum Sex {
  Male = 'M',
  Female = 'F',
}

export enum Corset {
  smallFlat = 'Small Flat',
  smallCurve = 'Small Curve',
  bigFlat = 'Big Flat',
  bigCurve = 'Big Curve',
}

export class PatientDto {
  @ApiProperty({
    description: 'Unique identifier of the patient.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  p_id: string;

  @ApiProperty({
    description: 'List of organization IDs associated with the patient.',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  o_ids: string[];

  @ApiProperty({
    description: 'Date of birth of the patient.',
    example: '1980-01-01',
  })
  @IsDateString()
  birth_date: string | Date;

  @ApiProperty({
    description: 'Sex of the patient.',
    enum: ['M', 'F'],
    example: 'M',
  })
  @IsEnum(['M', 'F'])
  sex: string;

  @ApiProperty({
    description: 'List of diagnosed pathologies of the patient.',
    example: ['Diabetes', 'Hypertension'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  pathology: string[];

  @ApiProperty({
    description: 'List of diagnosed conditions of the patient.',
    example: ['Arthritis'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  affectation: string[];

  @ApiProperty({
    description: 'List of treatments assigned to the patient.',
    example: ['Insulin', 'Metformin'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  treatment: string[];

  @ApiProperty({
    description: 'City of residence of the patient.',
    example: 'New York',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Nationality of the patient.',
    enum: COUNTRIES_CODE,
    example: 'USA',
  })
  @IsEnum(COUNTRIES_CODE)
  nationality: string;

  @ApiProperty({ description: 'First name of the patient.', example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Surname of the patient.', example: 'Doe' })
  @IsString()
  surnames: string;

  @ApiProperty({
    description: 'Phone number of the patient.',
    example: '+11234567890',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Email of the first legal guardian of the patient.',
    example: 'guardian1@example.com',
  })
  @IsString()
  legal_guardian_email_1: string;

  @ApiProperty({
    description: 'Email of the second legal guardian of the patient.',
    example: 'guardian2@example.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  legal_guardian_email_2: string;

  @ApiProperty({
    description: 'First name of the first legal guardian of the patient.',
    example: 'Jane',
    required: false,
  })
  @IsString()
  @IsOptional()
  legal_guardian_name_1: string;

  @ApiProperty({
    description: 'First name of the second legal guardian of the patient.',
    example: 'Jack',
    required: false,
  })
  @IsString()
  @IsOptional()
  legal_guardian_name_2: string;

  @ApiProperty({
    description: 'Weight of the patient in kilograms.',
    example: 70,
  })
  @IsNumber()
  @IsPositive()
  weight: number;

  @ApiProperty({
    description: 'Height of the patient in centimeters.',
    example: 175,
  })
  @IsNumber()
  @IsPositive()
  height: number;

  @ApiProperty({ description: 'Shoe size of the patient.', example: 42 })
  @IsNumber()
  shoe_size: number;

  @ApiProperty({
    description: 'Length of the right femur in centimeters.',
    example: 25,
    minimum: 21,
    maximum: 36,
  })
  @IsNumber()
  @Min(21)
  @Max(36)
  femur_len_r: number;

  @ApiProperty({
    description: 'Length of the left femur in centimeters.',
    example: 25,
    minimum: 21,
    maximum: 36,
  })
  @IsNumber()
  @Min(21)
  @Max(36)
  femur_len_l: number;

  @ApiProperty({
    description: 'Length of the right tibia in centimeters.',
    example: 30,
    minimum: 20,
    maximum: 35,
  })
  @IsNumber()
  @Min(20)
  @Max(35)
  tibia_len_r: number;

  @ApiProperty({
    description: 'Length of the left tibia in centimeters.',
    example: 30,
    minimum: 20,
    maximum: 35,
  })
  @IsNumber()
  @Min(20)
  @Max(35)
  tibia_len_l: number;

  @ApiProperty({
    description: 'Length of the walker in meters, adjustable between 1 and 4.',
    example: 2,
    minimum: 1,
    maximum: 4,
  })
  @IsNumber()
  @Min(1)
  @Max(4)
  walker_len: number;

  @ApiProperty({
    description: 'Hip width in centimeters.',
    example: 30,
    minimum: 21,
    maximum: 41,
  })
  @IsNumber()
  @Min(21)
  @Max(41)
  hip_width: number;

  @ApiProperty({
    description: "Chest size of the patient, either 'M' or 'L'.",
    enum: ['M', 'L'],
    example: 'M',
  })
  @IsEnum(['M', 'L'])
  chest_size: string;

  @ApiProperty({
    description: 'Hip flexion in degrees.',
    example: 10,
    minimum: -5,
    maximum: 20,
  })
  @IsNumber()
  @Min(-5)
  @Max(20)
  flexos_hip: number;

  @ApiProperty({
    description: 'Knee flexion in degrees.',
    example: 15,
    minimum: 0,
    maximum: 40,
  })
  @IsNumber()
  @Min(0)
  @Max(40)
  flexos_knee: number;

  @ApiProperty({
    description: 'Indicates whether the patient has a pronounced abdomen.',
    example: true,
  })
  @IsNumber()
  @IsIn([-5, 0, 5], {
    message: 'The value must be -5, 0 or 5.',
  })
  abd: number;

  @ApiProperty({
    description: 'Indicates whether the patient has ankle lock.',
    example: true,
  })
  @IsBoolean()
  ankle_lock: boolean;

  @ApiProperty({
    description: 'Indicates whether the patient has a corset.',
    enum: ['Small Flat', 'Small Curve', 'Big Flat', 'Big Curve'],
    example: true,
  })
  @IsEnum(Corset)
  corset: string;

  @ApiProperty({
    description: 'Version of the record for optimistic concurrency control.',
    example: 1,
  })
  @IsNumber()
  version: number;
}

export class UpdatePatientDto extends PartialType(PatientDto) {}

export class PatientTable {
  @ApiProperty({
    description: 'Unique identifier of the patient.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  p_id: string;

  @ApiProperty({ description: 'First name of the patient.', example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Surname of the patient.', example: 'Doe' })
  @IsString()
  surnames: string;

  @ApiProperty({
    description: 'List of institutions associated with the patient.',
    example: ['Institution 1', 'Institution 2'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  institutions: string[];

  @ApiProperty({
    description: 'Total number of sessions the patient has attended.',
    example: 20,
  })
  @IsNumber()
  total_session: number;

  @ApiProperty({
    description: 'Date of the last session attended by the patient.',
    type: Date,
    example: '2023-01-15',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  last_session: Date;

  @ApiProperty({
    description: 'Total number of steps taken by the patient.',
    example: 5000,
  })
  @IsNumber()
  total_steps: number;
}

export class Session {
  @ApiProperty({
    description: 'Unique identifier of the session.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Automatic forward steps recorded in the session.',
  })
  @IsNumber()
  steps_automatic_forward: number;

  @ApiProperty({
    description: 'Automatic backward steps recorded in the session.',
  })
  @IsNumber()
  steps_automatic_backward: number;

  @ApiProperty({
    description: 'Intentional forward steps recorded in the session.',
  })
  @IsNumber()
  steps_intention_forward: number;

  @ApiProperty({
    description: 'Intentional backward steps recorded in the session.',
  })
  @IsNumber()
  steps_intention_backward: number;

  @ApiProperty({
    description: 'Hip flexion degrees achieved during the session.',
  })
  @IsNumber()
  flexos_hip: number;

  @ApiProperty({
    description: 'Knee flexion degrees achieved during the session.',
  })
  @IsNumber()
  flexos_knee: number;

  @ApiProperty({
    description: 'Ankle flexion degrees achieved during the session.',
  })
  @IsNumber()
  flexos_ankle: number;

  @ApiProperty({
    description: 'Chest usage score by the therapist during the session.',
  })
  @IsNumber()
  has_chest: number;

  @ApiProperty({
    description: 'Perceived effort by the therapist during the session.',
  })
  @IsNumber()
  effort: number;

  @ApiProperty({
    description: 'Identifier of the device used in the session.',
    required: false,
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  d_id: string | null;

  @ApiProperty({ description: 'Date of the session.', example: '2023-01-01' })
  @IsDateString()
  date: Date | string;

  @ApiProperty({ description: 'Start time of the session.', required: false })
  @IsDateString()
  @IsOptional()
  start_time: Date | null;

  @ApiProperty({
    description: 'End time of the session.',
    example: '2023-01-01T12:00:00Z',
  })
  @IsDateString()
  end_time: Date | string;

  @ApiProperty({
    description: 'Total time in minutes of automatic forward steps.',
  })
  @IsNumber()
  time_automatic_forward: number;

  @ApiProperty({
    description: 'Total time in minutes of automatic backward steps.',
  })
  @IsNumber()
  time_automatic_backward: number;

  @ApiProperty({
    description: 'Total time in minutes of intentional forward steps.',
  })
  @IsNumber()
  time_intentiton_forward: number;

  @ApiProperty({
    description: 'Total time in minutes of intentional backward steps.',
  })
  @IsNumber()
  time_intention_backward: number;

  @ApiProperty({ description: 'Total number of steps taken in the session.' })
  @IsNumber()
  steps_total: number;

  @ApiProperty({ description: 'Total session time in minutes.' })
  @IsNumber()
  time_total: number;

  @ApiProperty({
    description: 'Step cadence of automatic forward steps per minute.',
  })
  @IsNumber()
  cadence_automatic_forward: number;

  @ApiProperty({
    description: 'Step cadence of automatic backward steps per minute.',
  })
  @IsNumber()
  cadence_automatic_backward: number;

  @ApiProperty({
    description: 'Step cadence of intentional forward steps per minute.',
  })
  @IsNumber()
  cadence_intention_forward: number;

  @ApiProperty({
    description: 'Step cadence of intentional backward steps per minute.',
  })
  @IsNumber()
  cadence_intention_backward: number;

  @ApiProperty({
    description: 'Total walking time in minutes during the session.',
  })
  @IsNumber()
  timeWalking: number;

  @ApiProperty({ description: 'Total session duration in minutes.' })
  @IsNumber()
  timeSession: number;

  @ApiProperty({
    description: 'Total usage time in minutes during the session.',
  })
  @IsNumber()
  timeUse: number;
}

export class PatientView extends PartialType(PatientDto) {
  @ApiProperty({
    description:
      "Unit of measurement for the patient's weight, e.g., kg or lbs.",
  })
  @IsString()
  weight_unit: string;

  @ApiProperty({
    description:
      "Unit of measurement for the patient's height, e.g., cm or in.",
  })
  @IsString()
  height_unit: string;

  @ApiProperty({
    description: 'Sessions associated with the patient.',
    type: [Session],
  })
  @IsArray()
  sessions: Session[];
}

export class emailsDTO {
  @ApiProperty({
    description: 'First email of the legal guardian of the patient.',
    type: String,
    example: 'email@test.com',
    required: true,
  })
  @IsString()
  email1: string;

  @ApiProperty({
    description: 'Second email of the legal guardian of the patient.',
    type: String,
    example: 'email@test.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  email2: string;
}

export class AddPatientDTO extends PartialType(emailsDTO) {
  @ApiProperty({
    description: 'Id of the patient',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsString()
  p_id: string;
}

export class RemovePatientOrgDTO {
  @ApiProperty({
    description: 'Id of the patient',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsString()
  p_id: string;

  @ApiProperty({
    description: 'Id of the organization',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsString()
  o_id: string;
}
