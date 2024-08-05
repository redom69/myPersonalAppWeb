import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsDateString,
  IsUUID,
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';

export class OrganizationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  o_id: string;
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  surnames: string;
  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsDateString()
  birth_date: string | Date;
  @ApiProperty()
  @IsString()
  nationality: string;
  @ApiProperty()
  @IsUUID()
  organization_id: string;
}

export class RegisterParticularDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  surnames: string;
  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsDateString()
  birth_date: string | Date;
  @ApiProperty()
  @IsString()
  nationality: string;

  // Datos particular
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsUUID('all', { each: true })
  devices_ids: string[];

  // Datos direccion
  @ApiProperty()
  @IsString()
  street_name: string;
  @ApiProperty()
  @IsString()
  street_number: string;
  @ApiProperty()
  @IsString()
  city: string;
  @ApiProperty()
  @IsString()
  state: string;
  @ApiProperty()
  @IsString()
  postal_code: string;
  @ApiProperty()
  @IsString()
  country: string;
}

export class RegisterProfesionalDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  surnames: string;
  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsDateString()
  birth_date: string | Date;
  @ApiProperty()
  @IsString()
  nationality: string;

  // Datos particular
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsUUID('all', { each: true })
  devices_ids: string[];
  @ApiProperty()
  @IsString()
  charge: string;
}

export class RegisterResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}

// Request reset password
export class RequestResetPasswordDto {
  @ApiProperty()
  @IsString()
  username: string;
}

export class RequestResetPasswordResponseDto {
  @ApiProperty()
  success: boolean;
}

// Reset password
export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  new_password: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  confirm_new_password: string;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  r: string;
}

export class ResetPasswordResponseDto {
  @ApiProperty()
  success: boolean;
}
