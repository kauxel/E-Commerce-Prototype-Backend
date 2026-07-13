import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsUUID, Min } from "class-validator";

export class AddToCartDTO {
    @ApiProperty({
        description: 'The ID of the product to add to the cart',
        example: '550exxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    })
    @IsUUID()
    productId!: string;

    @ApiProperty({
        description: 'The quantity of the product to add to the cart',
        example: 1
    })
    @IsInt()
    @Min(1)
    quantity!: number;
}