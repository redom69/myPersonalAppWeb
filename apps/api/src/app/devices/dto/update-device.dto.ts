import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateActiveDeviceDto {
  @ApiProperty({
    description: 'Indicates the new active status of the device',
    example: true,
  })
  @IsBoolean()
  active: boolean;
}

export class UpdateDeviceDto {
  @ApiProperty({
    description: 'Indicates whether the device is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({
    description: 'Serial number of the device',
    example: 'SN123456789',
    default: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  serial?: string;

  @ApiProperty({
    description: 'Version of the device structure',
    example: 'v1.0.0',
    default: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  structure_version?: string;

  @ApiProperty({
    description: 'Password for the device, if applicable',
    example: 'p@ssw0rd',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Model of the device',
    example: 'ModelXPro',
    required: false,
  })
  @IsString()
  @IsOptional()
  model?: string;
}
