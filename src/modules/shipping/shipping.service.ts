import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { RateDto } from './dto/shipping.dto';
import axios from 'axios';
import { OrderDto } from '../order/dto/order.dto';

@Injectable()
export class ShippingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly product: ProductsService,
  ) {}

  //// belum direview
  async getRates(payload: RateDto) {
    const items = await Promise.all(payload.items.map(async (item) => {
      const product = await this.product.findOne(item.idProduct)
      return {
          name: product.name,
          value: product.price,
          weight: product.weight,
          quantity: item,
        }
      })
    )
    const response = await axios.post(
      `${process.env.BITESHIP_BASE_URL}/rates/couriers`,
      {
        origin_postal_code: payload.orignPostalCode,
        destination_postal_code: payload.destinationPostalCode,
        couriers: 'jne,sicepat,jnt',
        items: items,
      },
      {
        headers: {
          Authorization: process.env.BITESHIP_API_KEY,
        },
      },
    );

    return response.data;
  }

  ///// bayar ke biteship
  async createShipment(order: OrderDto) {
    const response = await axios.post(
      `${process.env.BITESHIP_BASE_URL}/orders`,
      {
        reference_id: order.id,
        courier_company: 'jne',
        courier_type: 'reg',
        delivery_type: 'now',
      },
      {
        headers: {
          Authorization: process.env.BITESHIP_API_KEY,
        },
      },
    );

    return response.data;
  }

  async track(waybill: string) {
    const response = await axios.get(
      `${process.env.BITESHIP_BASE_URL}/trackings/${waybill}`,
      {
        headers: {
          Authorization: process.env.BITESHIP_API_KEY,
        },
      },
    );

    return response.data;
  }
}
