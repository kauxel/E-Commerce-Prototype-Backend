import { ApiProperty, ApiPropertyOptional, IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { BaseAddressDto } from './base-address.dto';
import { BaseAddressLocationDto } from './address-location.dto';

export class CreateAddressDto extends IntersectionType(
  BaseAddressDto,
  BaseAddressLocationDto,
) {}

class UpdateAddressBaseDto extends OmitType(CreateAddressDto, [
    'userId'
]as const) {}

export class UpdateAddresDto extends PartialType(UpdateAddressBaseDto) {}

// export class UpdateAddresDto {
//   @ApiPropertyOptional({
//     description: 'The name of recipient',
//     example: 'Ahmad',
//   })
//   @IsString()
//   recipient?: string;

//   @ApiPropertyOptional({
//     description: 'The handphone number of recipient',
//     example: '085********',
//   })
//   @IsString()
//   phone?: string;

//   @ApiPropertyOptional({
//     description: 'The referance place to located',
//     example: 'Go to dam ranto street no 79',
//   })
//   @IsString()
//   addressLine1?: string;

//   @ApiPropertyOptional({
//     description: 'The detail of buildings located',
//     example: 'Between the trees',
//   })
//   @IsString()
//   addressLine2?: string;

//   @ApiPropertyOptional({
//     description: 'Is address default location for user',
//     example: true,
//   })
//   @IsBoolean()
//   isDefault?: boolean;

//   @ApiPropertyOptional({
//     description: 'The label of location',
//     example: 'workshop',
//   })
//   @IsString()
//   label?: string;

//   @ApiPropertyOptional({
//     description: 'The Id of user own this address',
//     example: 'US-123',
//   })
//   @IsString()
//   userId?: string;

//   @ApiPropertyOptional({
//     description: 'The Id of province this address located',
//     example: 'PV-123',
//   })
//   @IsString()
//   provinceId?: string;

//   @ApiPropertyOptional({
//     description: 'The Id of city this address located',
//     example: 'CT-123',
//   })
//   @IsString()
//   cityId?: string;

//   @ApiPropertyOptional({
//     description: 'The Id of district this address located',
//     example: 'DS-123',
//   })
//   @IsString()
//   districtId?: string;

//   @ApiPropertyOptional({
//     description: 'The Id of postal code this address located',
//     example: 'PC-123',
//   })
//   @IsString()
//   postalCodeId?: string;
// }

// export class CreateAddressDto {
//   @ApiProperty({
//     description: 'The name of recipient',
//     example: 'Ahmad',
//   })
//   @IsString()
//   recipient!: string;

//   @ApiProperty({
//     description: 'The handphone number of recipient',
//     example: '085********',
//   })
//   @IsString()
//   phone!: string;

//   @ApiProperty({
//     description: 'The referance place to located',
//     example: 'Go to dam ranto street no 79',
//   })
//   @IsString()
//   addressLine1!: string;

//   @ApiPropertyOptional({
//     description: 'The detail of buildings located',
//     example: 'Between the trees',
//   })
//   @IsString()
//   addressLine2?: string;

//   @ApiProperty({
//     description: 'Is address default location for user',
//     example: true,
//   })
//   @IsBoolean()
//   isDefault!: boolean;

//   @ApiPropertyOptional({
//     description: 'The label of location',
//     example: 'workshop',
//   })
//   @IsString()
//   label?: string;

//   @ApiProperty({
//     description: 'The Id of user own this address',
//     example: 'US-123',
//   })
//   @IsString()
//   @IsNotEmpty()
//   userId!: string;

//   @ApiProperty({
//     description: 'The Id of province this address located',
//     example: 'PV-123',
//   })
//   @IsString()
//   @IsNotEmpty()
//   provinceId!: string;

//   @ApiProperty({
//     description: 'The Id of city this address located',
//     example: 'CT-123',
//   })
//   @IsString()
//   @IsNotEmpty()
//   cityId!: string;

//   @ApiProperty({
//     description: 'The Id of district this address located',
//     example: 'DS-123',
//   })
//   @IsString()
//   @IsNotEmpty()
//   districtId!: string;

//   @ApiProperty({
//     description: 'The Id of postal code this address located',
//     example: 'PC-123',
//   })
//   @IsString()
//   @IsNotEmpty()
//   postalCodeId!: string;
// }
