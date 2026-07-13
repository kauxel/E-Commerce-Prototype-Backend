import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../../../prisma/generated/enums';

export class BaseUserDto {
  
  @ApiProperty({
    description: 'The role to be assigned',
    example: 'USER',
  })
  @IsEnum(UserRole)
  role?: UserRole;
  
  @ApiProperty({
    description: 'The url avatar to be assigned',
    example: 'https://cdn.avatar',
  })
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    description: 'The handphone number to be assigned',
    example: '085************',
  })
  @IsString()
  handphone?: string;
}

export class CreateUserDto extends BaseUserDto{
  @ApiProperty({
    description: 'the email address to be used to create a new account',
    example: 'example@gmail.com'
  })
  @IsString()
  @IsNotEmpty()
  email!: string

  @ApiProperty({
    description: 'the password to be used to create a new account',
    example: 'password123'
  })
  @IsString()
  @IsNotEmpty()
  password!: string

  @ApiProperty({
    description: 'The name to be assigned',
    example: 'Kautsar',
  })
  @IsString()
  name!: string;
}

export class UpdateUserDto extends BaseUserDto{
  @ApiProperty({
    description: 'The email address to be changed',
    example: 'example@gmail.com'
  })
  @IsString()
  email?: string

  @ApiProperty({
    description: 'the password to be used to changed',
    example: 'password123'
  })
  @IsString()
  password?: string

  @ApiProperty({
    description: 'The name to be assigned',
    example: 'Kautsar',
  })
  @IsString()
  name?: string;
}
