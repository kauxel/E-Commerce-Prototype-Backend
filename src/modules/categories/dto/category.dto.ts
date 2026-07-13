import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CategoryDto {
    @ApiProperty({
        description: 'The name of the category',
        example: 'Building and Constructions'
    })
    @IsString()
    name!: string

    @ApiProperty({
        description: 'The slug of the category',
        example: 'building-constructions'
    })
    @IsString()
    slug!: string

}