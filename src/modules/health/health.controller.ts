import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('health')
export class HealthController {
  @Get()
  @UseGuards(JwtAuthGuard)
  healthCheck() {
    return {
      success: true,
      message: 'API is healthy',
    };
  }
}