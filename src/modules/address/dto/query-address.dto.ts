import { ApiPropertyOptional, IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { BaseQueryDto } from '../../../common/dto/base-query.dto';
import { AddressLocationDto } from './address-location.dto';
import { BaseAddressDto } from './base-address.dto';

export enum AddressSortBy {
  RECIPIENT = 'recipient',
  POSTAL_CODE = 'postal-code',
  USER = 'user',
  CREATED_AT = 'createdAt',
}

class AddressQueryFilterDto extends IntersectionType(
  PickType(BaseAddressDto, [
    'userId',
    'recipientName',
    'isDefault',
  ] as const),
  AddressLocationDto,
) {}

export class QueryAddressDto extends IntersectionType(
  BaseQueryDto,
  PartialType(AddressQueryFilterDto),
) {
  @ApiPropertyOptional({
    description: 'The field to sort user by',
    example: AddressSortBy.RECIPIENT,
  })
  @IsEnum(AddressSortBy)
  sortBy: AddressSortBy = AddressSortBy.POSTAL_CODE;
}

// export class QueryAddressDto extends BaseQueryDto {
//   @ApiPropertyOptional({
//     description: 'The name of recipient',
//     example: 'Ahmad',
//   })
//   @IsString()
//   recipient?: string;

//   @ApiPropertyOptional({
//     description: 'Is address default location for user',
//     example: true,
//   })
//   @IsBoolean()
//   isDefault?: boolean;

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

//   @ApiPropertyOptional({
//     description: 'The field to sort user by',
//     example: AddressSortBy.RECIPIENT,
//   })
//   @IsEnum(AddressSortBy)
//   sortBy: AddressSortBy = AddressSortBy.POSTAL_CODE;
// }
