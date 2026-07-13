import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ShippingDto {
  @ApiProperty({
    description: 'The ID of shipping',
    example: 'pdssadsa',
  })
  @IsNotEmpty()
  @IsString()
  id!: string;
}

export class ShippingItemDto {
    @ApiProperty({
        description: 'The ID of product',
        example: 'id-eed'
    })
    @IsString()
    @IsNotEmpty()
    idProduct!: string
    
    @ApiProperty({
        description: 'The quantity each product',
        example: 3
    })
    @IsInt()
    @Min(1)
    quantity!: number
}

export class RateDto {
  @ApiProperty({
    description: 'The orign postal code of shipping',
    example: '84113',
  })
  @IsNotEmpty()
  @IsNumber()
  orignPostalCode!: number;

  @ApiProperty({
    description: 'The destination postal code of shipping',
    example: '84115',
  })
  @IsNotEmpty()
  @IsNumber()
  destinationPostalCode!: number;

  @ApiProperty({
    type: [ShippingItemDto],
    example: [
      {
        productId: 'prod-001',
        quantity: 2,
      },
      {
        productId: 'prod-002',
        quantity: 1,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShippingItemDto)
  items!: ShippingItemDto[];
}
