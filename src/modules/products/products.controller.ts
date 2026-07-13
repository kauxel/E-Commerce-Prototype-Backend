import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';
import { PermissionGuard } from '../../common/guards/permission.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth('JWT-auth')
  @RequirePermissions(Permission.CREATE_PRODUCT)
  create(@Body() dto: ProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth('JWT-auth')
  @RequirePermissions(Permission.MANAGE_PRODUCT)
  update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth('JWT-auth')
  @RequirePermissions(Permission.MANAGE_PRODUCT)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
