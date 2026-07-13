import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { Prisma } from '../../../prisma/generated/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ProductDto) {
    const product = await this.prisma.product.create({
      data: dto,
    });
    if (!product) {
      throw new NotFoundException('Failed to create product');
    }

    return product;
  }

  async findAll(query: QueryProductDto) {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId,
      maxPrice,
      minPrice,
      sortBy,
      order,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),

      ...(categoryId && {
        categoryId,
      }),

      ...((minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && {
            gte: minPrice,
          }),

          ...(maxPrice !== undefined && {
            lte: maxPrice,
          }),
        },
      }),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,

        include: {
          category: true,
        },

        orderBy: {
          [sortBy ?? 'createdAt']: order,
        },
      }),

      this.prisma.product.count({ where }),
    ]);

    if (!products || products.length === 0) {
      throw new NotFoundException('Product not found');
    }

    return {
      data: products,

      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },

      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, dto: ProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      message: 'Product deleted successfully',
    };
  }
}
