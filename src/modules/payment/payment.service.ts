import { Injectable } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';
import { OrderDto } from '../order/dto/order.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentService {

  ///// Belum direview
  private snap: midtransClient.Snap
  
  constructor(
    private readonly prisma: PrismaService,
  ) {
    this.snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    });
  }

  async createPayment(order: OrderDto) {
    const parameter = {
      transaction_details: {
        order_id: order.id,
        gross_amount: order.grandTotal,
      },
      customer_details: {
        first_name: 'John',
        email: 'john@gmail.com',
      },
    };

    return this.snap.createTransaction(parameter);
  }

  ////// event driven, coba gunakan EventEmitter NestJS
  async handleNotification(payload: any) {
    const status = payload.transaction_status;
    const orderId = payload.order_id;

    if (status === 'settlement' || status === 'capture') {
      await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: 'PROCESSING',
        },
      });
    }

    if (status === 'cancel' || status === 'expire') {
      await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: 'CANCELED',
        },
      });
    }
  }
}
