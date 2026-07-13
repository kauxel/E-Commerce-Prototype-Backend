import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { OrderStatus } from "../../../../prisma/generated/enums";
import { ProductDto } from "../../products/dto/product.dto";


export class OrderDto {
    @ApiProperty({
        description: 'The ID of history order',
        example: 'id-order-123'
    })
    @IsString()
    @IsNotEmpty()
    id!: string

    @ApiProperty({
        description: 'Grand total order items',
        example: 20000
    })
    @IsNotEmpty()
    @IsInt()
    grandTotal!: number

}

export class updateStatuOrderDto extends OrderDto {
    @ApiProperty({
        description: 'Option of status order',
        example: 'PENDING'
    })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status!: OrderStatus 
}