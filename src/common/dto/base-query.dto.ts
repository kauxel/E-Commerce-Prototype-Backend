import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';


export enum SortOrderDto {
  ASC = 'asc',
  DESC = 'desc',
}

export class BaseQueryDto {
  @ApiProperty({
    description: 'The page number for pagination',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'The number of items to display per page',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    description: 'The search query for filtering items',
    example: 'laptop',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Sorting order for filtering items',
    example: SortOrderDto.ASC,
    required: false,
  })
  @IsOptional()
  @IsEnum(SortOrderDto)
  order: SortOrderDto = SortOrderDto.DESC;
}
