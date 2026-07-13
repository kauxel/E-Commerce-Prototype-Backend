import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class BaseAddressLocationDto {
  @ApiProperty({
    description: 'The Id of province this address located',
    example: 'PV-123',
  })
  @IsString()
  @IsNotEmpty()
  provinceId!: string;

  @ApiProperty({
    description: 'The Id of city this address located',
    example: 'CT-123',
  })
  @IsString()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty({
    description: 'The Id of district this address located',
    example: 'DS-123',
  })
  @IsString()
  @IsNotEmpty()
  districtId!: string;

  @ApiProperty({
    description: 'The Id of postal code this address located',
    example: 'PC-123',
  })
  @IsString()
  @IsNotEmpty()
  postalCodeId!: string;
}

export class AddressLocationDto extends PartialType(BaseAddressLocationDto) {}
