import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MerchantService } from '../merchant/merchant.service';
import { OrderService } from '../order/order.service';
import { PaymentService } from '../payment/payment.service';
import { QueryUserDto, UserSortBy } from '../users/dto/query-user.dto';

@Injectable()
export class AdminService {
    constructor(readonly userService: UsersService,
        readonly merchantService: MerchantService,
        readonly orderService: OrderService,
        readonly paymentService: PaymentService,
    ){}

    // untuk dashboard merupakan data terkini sedangkan statistik data history
    async dashboard() {
        // isinya total user, total merchant, total order, total revenue, todayorders (total pemesanan hari ini)
        // biasanya dalam satuan waktu bulanan, mingguan atau harian
        // ubah tabel agar ada last login
        const userData =  (await this.userService.findAll({role: 'USER' } as QueryUserDto)).meta.total;
        
    }

    async statistic() {
        // isinya total verified merchant, merchant, dan customer baru dalam satuan waktu
    }

    async report() {
        // isinya laporan dari pengguna baik bug ataupun permasalahan lain pengguna
    }

    async overview() {
        //gunakan websocket, isinya data order, produk dan payment terbaru maks 10 per page
    }
}
