import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({
    description: 'Optional model of the device.',
    example: 'Model X Pro',
    required: false,
  })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({
    description: 'Optional serial number of the device.',
    example: 'SN123456789',
    required: false,
  })
  @IsString()
  serial: string;

  @ApiProperty({
    description:
      'Optional version of the device structure, indicating the device`s hardware or software configuration.',
    example: 'v1.0.0',
    required: false,
  })
  @IsString()
  @IsOptional()
  structure_version?: string;

  @ApiProperty({
    description:
      'Optional password for device access or configuration, if applicable.',
    example: 'P@ssw0rd!',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description:
      'Optional identifier of the organization that owns the device.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  o_id?: string;
}
export class DeviceTable {
  @ApiProperty({
    description: 'Unique identifier of the device.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  d_id: string;

  @ApiProperty({
    description: 'Indicates whether the device is currently active.',
    example: true,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'Serial number of the device.',
    example: 'SN123456789',
  })
  @IsString()
  serial: string;

  @ApiProperty({
    description:
      'Version of the device structure, indicating hardware or software configurations.',
    example: 'v1.0.0',
  })
  @IsString()
  structure_version: string;

  @ApiProperty({
    description:
      'Model of the device, indicating the device`s hardware or software configuration.',
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Password for the device, used for configurations or access.',
    example: 'P@ssw0rd!',
  })
  @IsString()
  password: string;
}

export class Organization {
  @ApiProperty({
    description: 'Name of the organization.',
    example: 'Acme Corp',
  })
  @IsString()
  name: string;
}

export class OneDevice {
  @ApiProperty({
    description: 'Unique identifier of the device.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Identifier of the organization to which the device belongs.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  o_id: string;

  @ApiProperty({
    description: 'Serial number of the device.',
    example: 'SN123456789',
  })
  @IsString()
  serial: string;

  @ApiProperty({
    description: 'Organization details associated with the device.',
    type: Organization,
  })
  organizations: Organization;

  @ApiProperty({
    description: 'Indicates whether the device is active.',
    example: true,
  })
  @IsBoolean()
  active: boolean;
}
