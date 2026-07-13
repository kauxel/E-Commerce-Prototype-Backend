import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { updateStatuOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    /// Untuk sementara, fungsi create kosong karena belum mau kompleks (belum mengizinkan order dibuat selain dari user langsung)
    async create() {        
    }

    async findAll() {
        return this.prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }

    async updateStatus(dto: updateStatuOrderDto) {
        const { id, status } = dto
        return this.prisma.order.update({
            where: { id },
            data: { status },
        });
    }
}
