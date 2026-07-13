import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryUserDto } from './dto/query-user.dto';
import { Prisma } from '../../../prisma/generated/client';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByID(userID: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userID },
      omit: {
        password: true,
      },
      include: {
        orders: true,
        carts: true,
        address: true,
        merchant: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      omit: {
        password: true,
      },
    });
  }

  async findByEmailWithPassword(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  private buildUserWhere(query: QueryUserDto): Prisma.UserWhereInput {
    const { search, role, isActive } = query;
    return {
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },

          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),

      ...(role && {
        role,
      }),

      // ...(isActive !== undefined && {
      //   isActive,
      // }),
    };
  }

  async countUser(query: QueryUserDto) {
    return this.prisma.user.count({
      where: this.buildUserWhere(query),
    });
  }

  async findAll(query: QueryUserDto) {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      isActive,
      sortBy,
      order,
    } = query;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: this.buildUserWhere(query),
        skip,
        take: limit,
        omit: {
          password: true,
        },

        // include: {
        //   orders: true,
        // },

        orderBy: {
          [sortBy]: order,
        },
      }),

      this.countUser(query),
    ]);

    return {
      data: users,

      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateUserDto) {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    return this.prisma.user.create({
      data: dto,
    });
  }

  async update(userId: string, dto: UpdateUserDto) {
    await this.findByID(userId);

    if (dto.email) {
      const existing = await this.findByEmail(dto.email);
      if (existing && existing.id !== userId) {
        throw new ConflictException('Email already in use');
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });
  }

  async remove(userId: string) {
    await this.findByID(userId);

    await this.prisma.user.delete({
      where: { id: userId },
    });

    return {
      message: 'User deleted successfully',
    };
  }
}
