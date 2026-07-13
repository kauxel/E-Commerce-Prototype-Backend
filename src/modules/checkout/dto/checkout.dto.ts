import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CheckoutItemDto {
  @ApiProperty({
    description: 'The ID of the product to be checked out',
    example: 'product-123',
  })
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @ApiProperty({
    description: 'The quantity of the product to be checked out',
    example: 2,
  })
  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class CheckStockDto {  
  @ApiProperty({
    description: 'List of items to check stock for',
    type: [CheckoutItemDto],
  })
  @IsArray()
  @IsNotEmpty()
  items!: CheckoutItemDto[];
}

export class CheckoutDto extends CheckStockDto {
  @ApiProperty({
    description: 'The ID of the shipping address',
    example: 'address-123',
  })
  @IsString()
  @IsNotEmpty()
  shippingAddressId!: string;

  @ApiProperty({
    description: 'The ID of the payment method',
    example: 'payment-123',
  })
  @IsString()
  @IsNotEmpty()
  paymentMethodId!: string;

  @ApiProperty({
    description: 'The ID of the coupon applied to the order (if any)',
    example: 'coupon-123',
  })
  @IsString()
  @IsOptional()
  couponId?: string;
  
}