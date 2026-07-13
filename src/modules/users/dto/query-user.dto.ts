import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from '../../../common/dto/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../../prisma/generated/enums';

export enum UserSortBy {
  NAME = 'name',
  EMAIL = 'email',
  CREATED_AT = 'createdAt',
}

export class QueryUserDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Filter by user role',
    example: 'user',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: 'Filter by status user',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'The field to sort user by',
    example: UserSortBy.CREATED_AT,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserSortBy)
  sortBy: UserSortBy = UserSortBy.NAME;
}
