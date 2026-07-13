import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { BaseQueryDto } from '../../../common/dto/base-query.dto';

export class QueryProductDto extends BaseQueryDto {
  @ApiProperty({
    description: 'The ID of category to filter',
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({
    description: 'The maximal price of products to display',
    example: 10000,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxPrice?: number = 10000;

  @ApiProperty({
    description: 'The minimal price of products to display',
    example: 1000,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  minPrice?: number = 1000;

  @ApiProperty({
    description: 'The field to sort product by',
    example: 'price',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy?: 'price' | 'rating' | 'createdAt';
}
