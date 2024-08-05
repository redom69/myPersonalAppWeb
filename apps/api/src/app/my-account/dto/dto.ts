import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsString, IsUUID } from 'class-validator';

export class UserData {
  @ApiProperty({ description: "User's first name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "User's last name" })
  @IsString()
  surnames: string;

  @ApiProperty({ description: "User's date of birth", example: '1990-01-01' })
  @IsDateString()
  birth_date: string | Date;

  @ApiProperty({ description: "User's nationality" })
  @IsString()
  nationality: string;

  @ApiProperty({ description: "User's phone number", example: '+1234567890' })
  @IsString()
  phone: string;
}

export class User {
  @ApiProperty({
    description: "User's email address",
    example: 'user@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Detailed user data', type: UserData })
  user_data: UserData;
}

export class Menu {
  @ApiProperty({ description: 'CSS class name for the menu icon' })
  @IsString()
  i_class_name: string;

  @ApiProperty({ description: 'Router link path for navigation' })
  @IsString()
  to: string;

  @ApiProperty({ description: 'Translation key for the menu label' })
  @IsString()
  translation: string;
}

export class MyAccount {
  @ApiProperty({ description: "User's profile", type: User })
  user: User;

  @ApiProperty({ description: "User's organization details" })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  organization: any;

  @ApiProperty({
    description: 'Indicates if the user can edit their profile',
    example: true,
  })
  can_edit: boolean;
}

export class UserUpdateDto extends UserData {
  @ApiProperty({ description: "User's first name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "User's last name" })
  @IsString()
  surnames: string;

  @ApiProperty({ description: "User's date of birth", example: '1990-01-01' })
  @IsDateString()
  birth_date: string | Date;

  @ApiProperty({ description: "User's nationality" })
  @IsString()
  nationality: string;

  @ApiProperty({ description: "User's phone number", example: '+1234567890' })
  @IsString()
  phone: string;
}
export class GetMenuInfo {
  @ApiProperty({ description: 'List of menu items', type: [Menu] })
  menu: Menu[];

  @ApiProperty({
    description: 'Indicates whether the menu is active',
    example: true,
  })
  is_active: boolean;

  @ApiProperty({
    description: 'Indicates whether the user has premium status',
    example: false,
  })
  premium: boolean;
}

export class MyDevices {
  @ApiProperty({
    description: 'Device ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Device model', example: 'Model X' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'Device serial number', example: 'SN123456789' })
  @IsString()
  serial: string;

  @ApiProperty({
    description: 'Indicates if the device is active',
    example: true,
  })
  @IsBoolean()
  active: boolean;
}

export class OrganizationUpdateDto {
  @ApiProperty({ description: 'Name of the organization' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Street name of the organization address' })
  @IsString()
  street_name: string;

  @ApiProperty({ description: 'Street number of the organization address' })
  @IsString()
  street_number: string;

  @ApiProperty({ description: 'Postal code of the organization' })
  @IsString()
  postal_code: string;

  @ApiProperty({ description: 'Country where the organization is located' })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'State or region where the organization is located',
  })
  @IsString()
  state: string;

  @ApiProperty({ description: 'City where the organization is located' })
  @IsString()
  city: string;
}

export class UserTokenDto {
  @ApiProperty({ description: 'ID único del usuario' })
  u_id: string;

  @ApiProperty({ description: 'Fecha de creación', type: String })
  created_at: string; // o Date si prefieres trabajar con objetos de fecha

  @ApiProperty({ description: 'Fecha de última actualización', type: String })
  updated_at: string; // o Date si prefieres trabajar con objetos de fecha

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  email: string;

  @ApiProperty({ description: 'Rol del usuario' })
  o_id: string;

  @ApiProperty({ description: 'Rol del usuario' })
  role: string;

  @ApiProperty({ description: 'Tiempo de emisión del token' })
  iat: number;

  @ApiProperty({ description: 'Tiempo de expiración del token' })
  exp: number;
}
