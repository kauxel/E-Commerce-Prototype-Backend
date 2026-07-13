import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { QueryAddressDto } from './dto/query-address.dto';
import { Prisma } from '../../../prisma/generated/client';
import { AddressLocationDto } from './dto/address-location.dto';
import { CreateAddressDto, UpdateAddresDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    readonly prisma: PrismaService,
    readonly user: UsersService,
  ) {}

  async findById(id: string) {
    const address = await this.prisma.address.findUnique({
      where: { id },
      include: {
        user: {
          omit: {
            password: true,
          },
        },
        province: true,
        city: true,
        district: true,
        postalCode: true,
      },
    });

    if (!address) throw new NotFoundException('Address not found');

    return address;
  }

  async findByUserId(userId: string) {
    const existingUser = await this.user.findByID(userId);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.address.findMany({
      where: { userId },
    });
  }

  async findAll(dto: QueryAddressDto) {
    const {
      userId,
      provinceId,
      cityId,
      districtId,
      postalCodeId,
      search,
      recipientName,
      isDefault,
      sortBy,
      order,
      limit = 10,
      page = 1,
    } = dto;

    const skip = (page - 1) * limit;

    const where: Prisma.AddressWhereInput = {
      ...(search && {
        OR: [
          {
            addressLine1: {
              contains: search,
              mode: 'insensitive',
            },
          },

          {
            addressLine2: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),

      ...(userId && {
        userId,
      }),

      ...(provinceId && {
        provinceId,
      }),

      ...(cityId && {
        cityId,
      }),

      ...(districtId && {
        districtId,
      }),

      ...(postalCodeId && {
        postalCodeId,
      }),

      ...(recipientName && {
        recipientName: {
          contains: recipientName,
          mode: 'insensitive',
        },
      }),

      ...(isDefault !== undefined && {
        isDefault,
      }),
    };

    const [address, total] = await Promise.all([
      this.prisma.address.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: order,
        },
      }),
      this.prisma.address.count({ where }),
    ]);

    return {
      data: address,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private async validateExistingRelation(dto: AddressLocationDto) {
    const { provinceId, cityId, districtId, postalCodeId } = dto;
    if (provinceId) {
      const isProvinceExsiting = await this.prisma.province.findUnique({
        where: { id: provinceId },
      });

      if (!isProvinceExsiting)
        throw new NotFoundException('Province not found');
    }

    if (cityId) {
      const isCityExsiting = await this.prisma.city.findUnique({
        where: { id: cityId },
      });

      if (!isCityExsiting) throw new NotFoundException('City not found');
    }

    if (districtId) {
      const isDistrictExsiting = await this.prisma.district.findUnique({
        where: { id: districtId },
      });

      if (!isDistrictExsiting)
        throw new NotFoundException('District not found');
    }

    if (postalCodeId) {
      const isPostalCodeExsiting = await this.prisma.postalCode.findUnique({
        where: { id: postalCodeId },
      });

      if (!isPostalCodeExsiting)
        throw new NotFoundException('Postal code not found');
    }
  }

  async create(dto: CreateAddressDto) {
    await this.validateExistingRelation(dto);

    return this.prisma.address.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateAddresDto) {
    await this.validateExistingRelation(dto);

    return this.prisma.address.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findById(id);

    return this.prisma.address.delete({
      where: { id },
    });
  }
}
