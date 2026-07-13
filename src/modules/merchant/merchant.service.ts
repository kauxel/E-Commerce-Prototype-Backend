import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MerchantService {
    constructor(
        readonly prisma: PrismaService,
        readonly userService: UsersService
    ) {}

    async getMerchant(userId: string) {
        // isinya info detail toko
        return await this.prisma.merchant.findUnique({
            where: {
                userId: userId
            },
            omit: {
                createdAt: true,
            },
            include: {
                products: true
            }
            
        })
    }

    async update() {
        // isinya update data merchant
    }

    async dashboard() {
        // isinya total penjualan, total pendapatan, total produk dan total pemesanan, total produk yg aktif, total produk yang kehabisan stock, dan draft produk
    }

    async statistic() {
        // isinya pendapatan perbulan, produk terlaku (top produk), pengujung 
    }

    // /// belum tahu bedannya service berikut dengan statik dan dashboard
    // async sales() {
    //     // isinya data 
    // }

    // async analytic() {
    //     // isinya
    // }

    async orderSummary() {
        // isinya berapa saja produk yang masuk kedalam setiap status seperti pending, processing, packed, shipped, completed
    }



    async merchantVerificationApplication(){
        // isinya :  user memasukan data yang akan di verifikasi oleh admin
    }
}
