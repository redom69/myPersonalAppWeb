import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class UserTable {
  @ApiProperty({
    description: 'The UUID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  u_id: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The surname or last name of the user',
    example: 'Doe',
  })
  @IsString()
  surnames: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The UUID of the organization associated with the user',
    example: '456e4577-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  o_id: string;

  @ApiProperty({
    description: 'Indicates if the user is an administrator',
    example: true,
  })
  @IsBoolean()
  is_admin: boolean;

  @ApiProperty({
    description: 'The role of the user within the system',
    example: 'manager',
  })
  @IsString()
  role: string;

  @ApiProperty({
    description: 'Indicates if the user account is active',
    example: true,
  })
  @IsBoolean()
  active: boolean;
}

export class UsersView {
  @ApiProperty({
    description: 'Indicates if the current user can create organizations',
    example: true,
  })
  can_create_organization: boolean;

  @ApiProperty({
    description: 'List of users',
    type: [UserTable],
    example: [
      {
        u_id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John',
        surnames: 'Doe',
        email: 'john.doe@example.com',
        o_id: '456e4577-e89b-12d3-a456-426655440000',
        is_admin: true,
        role: 'manager',
        active: true,
      },
      // ...more users
    ],
  })
  users: UserTable[];
}

export class ToggleUserActiveDto {
  @ApiProperty({
    description: 'The unique identifier for the user',
    type: 'string',
    format: 'uuid',
  })
  @IsUUID()
  u_id: string;

  @ApiProperty({
    description: 'Flag indicating whether the user is active or not',
    type: 'boolean',
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'The unique identifier for the organization',
    type: 'string',
    format: 'uuid',
  })
  @IsUUID()
  o_id: string;
}
