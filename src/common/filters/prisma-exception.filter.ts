import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '../../../prisma/generated/client';


@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        throw new ConflictException('Data already exists');

      case 'P2025':
        throw new NotFoundException(`${exception.meta?.modelName ?? 'Resource'} not found`);

      case 'P2003':
        throw new BadRequestException('Invalid relation, Foreign key constraint failed');

      default:
        response.status(500).json({
          success: false,
          message: 'Database error',
        });
    }
  }
}