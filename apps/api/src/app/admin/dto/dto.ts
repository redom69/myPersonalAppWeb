import { COUNTRIES_CODE } from '@mypaw/commons';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class DevicesOfOrganization {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Identificador único del dispositivo',
  })
  @IsString()
  id: string;

  @ApiProperty({ example: 'sensor', description: 'Tipo de dispositivo' })
  @IsString()
  type: string;

  @ApiProperty({
    example: 'SN-001',
    description: 'Número de serie del dispositivo',
  })
  @IsString()
  serial: string;
}

export class UpdateUser {
  @ApiProperty({
    example: 'Jane',
    description: 'First name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  surnames: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birth date of the user',
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsDateString()
  birth_date: string | Date;

  @ApiProperty({
    example: 'Canadian',
    description: 'Nationality of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  nationality: string;
}

export class CreateUser {
  @ApiProperty({ example: 'Jane', description: 'First name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  surnames: string;

  @ApiProperty({
    example: 'jane.doe@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Password of the user',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birth date of the user',
    type: 'string',
  })
  @IsDateString()
  birth_date: string | Date;

  @ApiProperty({ example: 'Canadian', description: 'Nationality of the user' })
  @IsString()
  nationality: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Organization ID to which the user belongs',
  })
  @IsUUID()
  organization_id: string;
}

export class UserTable {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the user',
  })
  u_id: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  surnames: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: '456e8977-e89b-12d3-a456-426614174000',
    description: 'Organization ID to which the user belongs',
  })
  o_id: string;

  @ApiProperty({
    example: 'admin',
    description: 'Role or type of the user within the organization',
  })
  type: string;

  @ApiProperty({ example: true, description: 'Whether the user is active' })
  active: boolean;

  @ApiProperty({
    example: 'Doe Enterprises',
    description: 'Name of the organization the user belongs to',
  })
  organization: string;
}

export class UsersView {
  @ApiProperty({
    example: true,
    description: 'Flag indicating if the user can create organizations',
  })
  can_create_organization: boolean;

  @ApiProperty({
    type: [UserTable],
    description: 'List of user details',
  })
  users: UserTable[];
}

export class Organization {
  @ApiProperty({
    example: '456e8977-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the organization',
  })
  @IsUUID()
  o_id: string;

  @ApiProperty({
    example: 'Doe Enterprises',
    description: 'Name of the organization',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Main Street',
    description: 'Street name of the organization address',
  })
  @IsString()
  street_name: string;

  @ApiProperty({
    example: '100A',
    description: 'Street number of the organization address',
  })
  @IsString()
  street_number: string;

  @ApiProperty({
    example: 'A1A 1A1',
    description: 'Postal code of the organization address',
  })
  @IsString()
  postal_code: string;

  @ApiProperty({
    example: 'Canada',
    description: 'Country where the organization is located',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Ottawa',
    description: 'City where the organization is located',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'admin',
    description: 'Role of the organization in the context of the service',
  })
  @IsString()
  role: string;

  @ApiProperty({
    example: true,
    description: 'Whether the organization is subscribed to a premium plan',
  })
  @IsBoolean()
  premium: boolean;
}

export class UpdateOrganizationDto {
  @ApiPropertyOptional({
    example: 'Doe Enterprises',
    description: 'The name of the organization',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'New York',
    description: 'The city where the organization is located',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    example: 'USA',
    description: 'The country where the organization is located',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    example: '10001',
    description: "The postal code of the organization's address",
  })
  @IsString()
  @IsOptional()
  postal_code?: string;

  @ApiPropertyOptional({
    example: '5th Avenue',
    description: "The street name of the organization's address",
  })
  @IsString()
  @IsOptional()
  street_name?: string;

  @ApiPropertyOptional({
    example: '789',
    description: "The street number of the organization's address",
  })
  @IsString()
  @IsOptional()
  street_number?: string;

  @ApiPropertyOptional({
    example: 'NY',
    description: 'The state or region where the organization is located',
  })
  @IsString()
  @IsOptional()
  state?: string;
}

export class CreateOrganization {
  @ApiProperty({
    example: 'Doe Enterprises',
    description: 'The name of the new organization',
  })
  @IsString()
  name_organization: string;

  @ApiProperty({
    example: 'New York',
    description: 'The city where the new organization will be located',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'USA',
    description: 'The country code where the new organization will be located',
    enum: COUNTRIES_CODE,
  })
  @IsEnum(COUNTRIES_CODE)
  country: string;

  @ApiProperty({
    example: 'admin',
    description: 'The initial role of the admin user in the organization',
  })
  @IsString()
  role: string;

  @ApiProperty({
    example: '10001',
    description: "The postal code for the new organization's address",
  })
  @IsString()
  postal_code: string;

  @ApiProperty({
    example: '5th Avenue',
    description: "The street name for the new organization's address",
  })
  @IsString()
  street_name: string;

  @ApiProperty({
    example: '789',
    description: "The street number for the new organization's address",
  })
  @IsString()
  street_number: string;
}
