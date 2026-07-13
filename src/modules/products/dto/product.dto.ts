import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class ProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop'
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'The slug of the product',
    example: 'laptop'
  })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'A high-performance laptop for gaming and productivity'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99
  })
  @IsNumber()
  @IsPositive()
  @IsDefined()
  price!: number;

  @ApiProperty({
    description: 'The stock quantity of the product',
    example: 100
  })
  @IsInt()
  @Min(0)
  @IsDefined()
  stock!: number;

  @ApiProperty({
    description: 'The image URL of the product',
    example: 'https://example.com/laptop.jpg'
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The weight of product in gram',
    example: 1000
  })
  @IsInt()
  @Min(1)
  @IsDefined()
  weight!: number

  @ApiProperty({
    description: 'The width of product in cm',
    example: 1000
  })
  @IsInt()
  @Min(0)
  @IsDefined()
  width!: number

  @ApiProperty({
    description: 'The height of product in cm',
    example: 1000
  })
  @IsInt()
  @Min(0)
  @IsDefined()
  height!: number

  @ApiProperty({
    description: 'The length of product in cm',
    example: 1000
  })
  @IsInt()
  @Min(0)
  @IsDefined()
  length!: number

  @ApiProperty({
    description: 'The ID of the category to which the product belongs',
    example: 'category-123'
  })
  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @ApiProperty({
    description: 'The ID of the merchant to which the product belongs',
    example: 'merchant-123'
  })
  @IsString()
  @IsNotEmpty()
  merchantId!: string;
}
