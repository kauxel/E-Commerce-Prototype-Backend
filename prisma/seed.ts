import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

const provinces = JSON.parse(
  fs.readFileSync('./prisma/location-json/provinces.json', 'utf8'),
);
const districts = JSON.parse(
  fs.readFileSync('./prisma/location-json/districts.json', 'utf8'),
);
const regencies = JSON.parse(
  fs.readFileSync('./prisma/location-json/regencies.json', 'utf8'),
);
const villages = JSON.parse(
  fs.readFileSync('./prisma/location-json/villages.json', 'utf8'),
);

const adapter = new PrismaPg(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Jika ingin menghapus semua data didalam db sebelum seed ulang
  await prisma.shippingStatusLog.deleteMany();
  await prisma.shippingDetail.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.merchant.deleteMany();
  await prisma.postalCode.deleteMany();
  await prisma.district.deleteMany();
  await prisma.city.deleteMany();
  await prisma.province.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('masukaja', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
        handphone: '08111111111',
      },
      {
        email: 'andi@example.com',
        password: hashedPassword,
        name: 'Andi Saputra',
        role: 'USER',
        handphone: '08222222222',
      },
      {
        email: 'budi@example.com',
        password: hashedPassword,
        name: 'Budi Santoso',
        role: 'USER',
        handphone: '628333333333',
      },
    ],
  });

  const user = await prisma.user.findMany();
  const userMap = Object.fromEntries(user.map((u) => [u.name, u.id]));

  await prisma.province.createMany({
    data: provinces.map((p) => ({
      id: p.bps_code,
      name: p.name,
    })),
    skipDuplicates: true,
  });
  await prisma.city.createMany({
    data: regencies.map((r) => ({
      id: r.bps_code,
      name: r.name,
      provinceId: r.bps_province_code,
    })),
    skipDuplicates: true,
  });
  await prisma.district.createMany({
    data: districts.map((d) => ({
      id: d.bps_code,
      name: d.name,
      cityId: d.bps_regency_code,
    })),
    skipDuplicates: true,
  });
  await prisma.postalCode.createMany({
    data: villages.map((v) => ({
      id: v.bps_code,
      code: v.postal_code,
      name: v.name,
      districtId: v.bps_district_code,
    })),
    skipDuplicates: true,
  });

  async function getLocationIds(
    province: string,
    city: string,
    district: string,
    village: string,
  ) {
    const villageData = await prisma.postalCode.findFirst({
      where: {
        name: village,

        district: {
          name: district,

          city: {
            name: city,

            province: {
              name: province,
            },
          },
        },
      },

      include: {
        district: {
          include: {
            city: {
              include: {
                province: true,
              },
            },
          },
        },
      },
    });

    if (!villageData) throw new Error('Location not found');

    return {
      provinceId: villageData.district.city.province.id,

      cityId: villageData.district.city.id,

      districtId: villageData.district.id,

      postalCodeId: villageData.id,
    };
  }

  const loc1 = await getLocationIds(
    'DKI JAKARTA',
    'KOTA ADM. JAKARTA SELATAN',
    'KEBAYORAN LAMA',
    'KEBAYORAN LAMA SELATAN',
  );

  const loc2 = await getLocationIds(
    'JAWA BARAT',
    'KOTA BANDUNG',
    'COBLONG',
    'DAGO',
  );

  const loc3 = await getLocationIds(
    'DKI JAKARTA',
    'KOTA ADM. JAKARTA PUSAT',
    'TANAH ABANG',
    'GELORA',
  );

  await prisma.address.createMany({
    data: [
      {
        recipientName: 'Andi Saputra',
        phone: '081222222222',
        addressLine1: 'Jl. Merdeka No. 10',
        ...loc1,
        isDefault: true,
        label: 'Rumah',
        userId: userMap['Andi Saputra'],
      },
      {
        recipientName: 'Budi Santoso',
        phone: '081333333333',
        addressLine1: 'Jl. Sudirman No. 20',
        ...loc3,
        isDefault: true,
        label: 'Rumah',
        userId: userMap['Budi Santoso'],
      },
      {
        recipientName: 'Admin User',
        phone: '081111111111',
        addressLine1: 'Jl. Gatot Subroto No. 1',
        ...loc2,
        isDefault: true,
        label: 'Kantor',
        userId: userMap['Admin User'],
      },
    ],
  });

  await prisma.merchant.createMany({
    data: [
      {
        storeName: 'Tech Store',
        storeSlug: 'tech-store',
        description: 'Toko elektronik modern',
        isVerified: true,
        userId: userMap['Andi Saputra'],
      },
      {
        storeName: 'Fashion Hub',
        storeSlug: 'fashion-hub',
        description: 'Toko fashion pria dan wanita',
        isVerified: true,
        userId: userMap['Budi Santoso'],
      },
    ],
  });

  const merchant = await prisma.merchant.findMany();
  const merchantMap = Object.fromEntries(
    merchant.map((m) => [m.storeSlug, m.id]),
  );

  await prisma.category.createMany({
    data: [
      {
        name: 'Electronics',
        slug: 'electronics',
      },
      {
        name: 'Body & Beauty',
        slug: 'body-beauty',
      },
      {
        name: 'Clothing',
        slug: 'clothing',
      },
      {
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
      },
    ],
    skipDuplicates: true,
  });

  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  await prisma.product.createMany({
    data: [
      {
        name: 'Iphone 14 Pro Max',
        slug: 'iphone-14-pro-max',
        description:
          'The iPhone 14 Pro Max is the latest flagship smartphone from Apple, featuring a stunning design, powerful performance, and advanced camera capabilities. With its large display, long battery life, and cutting-edge technology, the iPhone 14 Pro Max offers an exceptional user experience for those seeking the best in mobile technology.',
        price: 17000000.99,
        stock: 50,
        imageUrl: 'https://example.com/iphone-14-pro-max.jpg',
        weight: 500,
        width: 12,
        length: 10,
        height: 1,
        categoryId: categoryMap['electronics'],
        merchantId: merchantMap['tech-store'],
      },
      {
        name: 'Anker Soundcore R50i',
        slug: 'anker-soundcore-r50i',
        description:
          'The Anker Soundcore R50i is a highly popular entry-level True Wireless Stereo (TWS) earbud, highly praised for delivering powerful audio quality at a very budget-friendly price point',
        price: 250000.0,
        stock: 50,
        imageUrl: 'https://example.com/anker-soundcore-r50i.jpg',
        weight: 500,
        width: 12,
        length: 10,
        height: 1,
        categoryId: categoryMap['electronics'],
        merchantId: merchantMap['tech-store'],
      },
      {
        name: 'The Great Gatsby',
        slug: 'the-great-gatsby',
        description:
          'The Great Gatsby is a classic novel written by F. Scott Fitzgerald, set in the Roaring Twenties. It tells the story of Jay Gatsby, a wealthy and mysterious',
        price: 10.99,
        stock: 100,
        imageUrl: 'https://example.com/the-great-gatsby.jpg',
        weight: 500,
        width: 12,
        length: 10,
        height: 1,
        categoryId: categoryMap['body-beauty'],
        merchantId: merchantMap['fashion-hub'],
      },
      {
        name: 'Kaos Distro Premium',
        slug: 'kaos-distro-premium',
        description:
          'Upgrade your wardrobe with the ultimate blend of comfort and street-style edge. Designed for the modern trendsetter, the t-shirt is crafted to be your new go-to essential',
        price: 50000.0,
        stock: 100,
        imageUrl: 'https://example.com/kaos-distro-premium.jpg',
        weight: 500,
        width: 12,
        length: 10,
        height: 1,
        categoryId: categoryMap['body-beauty'],
        merchantId: merchantMap['fashion-hub'],
      },
      {
        name: 'Aerostreet Hoops Low 2.0',
        slug: 'aerostreet-hoops-low-2',
        description:
          'Aerostreet Hoops Low Series 2.0 features a modern, sporty, and versatile casual design perfect for various daily activities. With a clean look and low-cut silhouette, these sneakers are suitable for daily wear, school, college, and streetwear outfits. The 2.0 version is updated to be lighter and more comfortable for all-day wear',
        price: 150000.0,
        stock: 100,
        imageUrl: 'https://example.com/kaos-distro-premium.jpg',
        weight: 500,
        width: 12,
        length: 10,
        height: 1,
        categoryId: categoryMap['body-beauty'],
        merchantId: merchantMap['fashion-hub'],
      },
      {
        name: 'Hermes Silk Scarf',
        slug: 'hermes-silk-scarf',
        description:
          'A luxurious silk scarf from the renowned French brand Hermes, perfect for adding a touch of elegance to any outfit.',
        price: 299.99,
        stock: 25,
        imageUrl: 'https://example.com/hermes-silk-scarf.jpg',
        weight: 500,
        width: 12,
        length: 10,
        height: 1,
        categoryId: categoryMap['clothing'],
        merchantId: merchantMap['fashion-hub'],
      },
      {
        name: 'Dyson V11 Vacuum Cleaner',
        slug: 'dyson-v11-vacuum-cleaner',
        description:
          'The Dyson V11 is a powerful cordless vacuum cleaner that offers advanced cleaning performance and intelligent features for a thorough clean.',
        price: 599.99,
        stock: 20,
        imageUrl: 'https://example.com/dyson-v11-vacuum-cleaner.jpg',
        weight: 500,
        width: 12,
        length: 10,
        height: 1,
        categoryId: categoryMap['home-kitchen'],
        merchantId: merchantMap['fashion-hub'],
      },
    ],
  });

  const product = await prisma.product.findMany();
  const productMap = Object.fromEntries(product.map((p) => [p.slug, p.id]));

  const cart1 = await prisma.cart.create({
    data: {
      userId: userMap['Andi Saputra'],
    },
  });

  const cart2 = await prisma.cart.create({
    data: {
      userId: userMap['Budi Santoso'],
    },
  });

  await prisma.cartItem.createMany({
    data: [
      {
        cartId: cart1.id,
        productId: productMap['iphone-14-pro-max'],
        quantity: 1,
      },
      {
        cartId: cart2.id,
        productId: productMap['iphone-14-pro-max'],
        quantity: 1,
      },
      {
        cartId: cart2.id,
        productId: productMap['hermes-silk-scarf'],
        quantity: 2,
      },
      {
        cartId: cart1.id,
        productId: productMap['dyson-v11-vacuum-cleaner'],
        quantity: 1,
      },
    ],
  });

  await prisma.order.createMany({
    data: [
      {
        total: 150000,
        status: 'PENDING_PAYMENT',
        userId: userMap['Andi Saputra'],
      },
      {
        total: 250000,
        status: 'PROCESSING',
        userId: userMap['Budi Santoso'],
      },
      {
        total: 500000,
        status: 'DELIVERED',
        userId: userMap['Andi Saputra'],
      },
    ],
  });

  const orders = await prisma.order.findMany();
  const orderMap = Object.fromEntries(orders.map((o) => [o.status, o.id]));

  await prisma.orderItem.createMany({
    data: [
      {
        productName: 'Kaos Distro',
        price: 50000,
        orderId: orderMap['PENDING_PAYMENT'],
        productId: productMap['kaos-distro-premium'],
        quantity: 3,
        subtotal: 150000,
      },
      {
        productName: 'Anker Soundcore R50i',
        price: 250000,
        orderId: orderMap['PROCESSING'],
        productId: productMap['anker-soundcore-r50i'],
        quantity: 1,
        subtotal: 250000,
      },
      {
        productName: 'Anker Soundcore R50i',
        price: 250000,
        orderId: orderMap['DELIVERED'],
        productId: productMap['anker-soundcore-r50i'],
        quantity: 1,
        subtotal: 250000,
      },
      {
        productName: 'Aerostreet Hoops Low 2.0',
        price: 150000,
        orderId: orderMap['DELIVERED'],
        productId: productMap['aerostreet-hoops-low-2'],
        quantity: 2,
        subtotal: 150000,
      },
      {
        productName: 'Kaos Distro',
        price: 50000,
        orderId: orderMap['DELIVERED'],
        productId: productMap['kaos-distro-premium'],
        quantity: 2,
        subtotal: 100000,
      },
    ],
  });

  await prisma.orderAddress.createMany({
    data: [
      {
        recipientName: 'Andi Saputra',
        phone: '081222222222',
        addressLine1: 'Jl. Merdeka No.10',
        province: 'DKI Jakarta',
        city: 'Jakarta Selatan',
        district: 'Kebayoran Baru',
        postalCode: '12110',
        orderId: orderMap['PENDING_PAYMENT'],
      },
      {
        recipientName: 'Budi Santoso',
        phone: '081333333333',
        addressLine1: 'Jl. Sudirman No.20',
        province: 'Jawa Barat',
        city: 'Bandung',
        district: 'Coblong',
        postalCode: '40135',
        orderId: orderMap['PROCESSING'],
      },
      {
        recipientName: 'Admin User',
        phone: '081111111111',
        addressLine1: 'Jl. Gatot Subroto No.1',
        province: 'DKI Jakarta',
        city: 'Jakarta Pusat',
        district: 'Tanah Abang',
        postalCode: '10270',
        orderId: orderMap['DELIVERED'],
      },
    ],
  });

  await prisma.payment.createMany({
    data: [
      {
        amount: 150000,
        status: 'PENDING',
        method: 'QRIS',
        orderCode: 'ORD-001',
        orderId: orderMap['PENDING_PAYMENT'],
      },
      {
        amount: 250000,
        status: 'SETTLEMENT',
        method: 'BANK_TRANSFER',
        transactionId: 'MID-001',
        orderCode: 'ORD-002',
        paidAt: new Date(),
        orderId: orderMap['PROCESSING'],
      },
      {
        amount: 500000,
        status: 'SETTLEMENT',
        method: 'GOPAY',
        transactionId: 'MID-002',
        orderCode: 'ORD-003',
        paidAt: new Date(),
        orderId: orderMap['DELIVERED'],
      },
    ],
  });

  await prisma.shippingDetail.createMany({
    data: [
      {
        courierName: 'JNE',
        courierService: 'REG',
        airwayBill: '',
        shippingCost: 20000,
        weightInGrams: 1000,
        estimatedDays: '2-3',
        originAddress: {
          city: 'Jakarta',
        },
        destinationAddress: {
          city: 'Bandung',
        },
        orderId: orderMap['PENDING_PAYMENT'],
      },
      {
        courierName: 'SiCepat',
        courierService: 'BEST',
        airwayBill: 'SC123456789',
        shippingCost: 25000,
        weightInGrams: 2000,
        estimatedDays: '1-2',
        originAddress: {
          city: 'Jakarta',
        },
        destinationAddress: {
          city: 'Surabaya',
        },
        orderId: orderMap['PROCESSING'],
      },
      {
        courierName: 'J&T',
        courierService: 'EZ',
        airwayBill: 'JT987654321',
        shippingCost: 18000,
        weightInGrams: 1500,
        estimatedDays: '2-4',
        originAddress: {
          city: 'Bandung',
        },
        destinationAddress: {
          city: 'Semarang',
        },
        orderId: orderMap['DELIVERED'],
      },
    ],
  });

  const shippingdetail = await prisma.shippingDetail.findMany();
  const shippingDetailMap = Object.fromEntries(
    shippingdetail.map((sd) => [sd.airwayBill, sd.id]),
  );

  await prisma.shippingStatusLog.createMany({
    data: [
      {
        status: 'READY_TO_SHIP',
        description: 'Paket siap dikirim',
        shippingDetailId: shippingDetailMap[''],
      },
      {
        status: 'IN_TRANSIT',
        description: 'Paket sedang dalam perjalanan',
        shippingDetailId: shippingDetailMap['SC123456789'],
      },
      {
        status: 'DELIVERED',
        description: 'Paket berhasil diterima',
        shippingDetailId: shippingDetailMap['JT987654321'],
      },
    ],
  });

  console.log('Seeding completed');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
