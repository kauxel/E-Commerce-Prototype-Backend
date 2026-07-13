# E-Commerce Prototype API

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-v11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
  <img src="https://img.shields.io/badge/Prisma-v7-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-v14+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-v5-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JWT-Authentication-black?style=flat-square">
  <img src="https://img.shields.io/badge/Swagger-API%20Docs-85EA2D?style=flat-square&logo=swagger">
  <img src="https://img.shields.io/badge/Biteship-Shipping-orange?style=flat-square">
  <img src="https://img.shields.io/badge/Midtrans-Payment-00AEEF?style=flat-square">
</p>

## Description

This repository contains the backend service for an **E-Commerce Prototype** built with **NestJS** and **Prisma ORM**. The project demonstrates a modern REST API architecture, including authentication, product management, order processing, payment gateway integration using **Midtrans**, shipping cost integration with **Biteship**, and PostgreSQL as the primary database.

This project is intended for learning and portfolio purposes.

---

# Getting Started

## Requirements

- Node.js >= **24.14.1**
- npm >= **11.17.0**
- PostgreSQL >= **14**

---

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Environment Variables

Create a `.env` file in the project root.

Example variables:

```env
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=

PORT=
CORS_ORIGIN=

BITESHIP_API_KEYS=
BITESHIP_BASE_URL=

MIDTRANS_PAYMENT_URL=
MIDTRANS_CLIENT_KEY=
```

---

## 3. Create Database

Create a PostgreSQL database and update the `DATABASE_URL` inside your `.env`.

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Run Database Migration

If this is your first time setting up the project:

```bash
npx prisma migrate dev
```

If you are creating a new migration after changing `schema.prisma`:

```bash
npx prisma migrate dev --name migration_name
```

---

## 6. Seed Database

```bash
npx prisma db seed
```

---

# Running the Application

Development

```bash
npm run start
```

Watch Mode

```bash
npm run start:dev
```

Production

```bash
npm run start:prod
```

---

# Testing

Unit Test

```bash
npm run test
```

E2E Test

```bash
npm run test:e2e
```

Coverage

```bash
npm run test:cov
```

---

# Useful Prisma Commands

Generate Prisma Client

```bash
npx prisma generate
```

Open Prisma Studio

```bash
npx prisma studio
```

Create Migration

```bash
npx prisma migrate dev --name migration_name
```

Deploy Migration

```bash
npx prisma migrate deploy
```

Seed Database

```bash
npx prisma db seed
```

Reset Database

```bash
npx prisma migrate reset
```