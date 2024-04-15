import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CouponService } from './coupon.service';
import { Coupon } from 'src/models/coupon/coupon.schema';
import { FindAllQuery, FindAllResponse, FindOneResponse, Role, Roles } from 'src/common';

@Roles(Role.Client)
@Controller('mobile/coupon')
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
  ) {}

  @ApiOperation({ summary: 'Get all coupons' })
  @Get()
  async getAll(@Query() query: FindAllQuery): Promise<FindAllResponse<Coupon>> {
    const getAllCouponResponse = new FindAllResponse<Coupon>();
    try {
      const coupons = await this.couponService.getAll(query);
      getAllCouponResponse.success = true;
    } catch (error) {
      getAllCouponResponse.success = false;
      throw error;
    }
    return getAllCouponResponse;
  }

  @ApiOperation({ summary: 'Get coupon by ID' })
  @Get(':couponId')
  async getOne(@Param('couponId') couponId: string): Promise<FindOneResponse<Coupon>> {
    const getOneCouponResponse = new FindOneResponse<Coupon>();
    try {
      const coupon = await this.couponService.getOne(couponId);
      if (!coupon) {
        throw new NotFoundException('Coupon not found');
      }
      getOneCouponResponse.success = true;
    } catch (error) {
      getOneCouponResponse.success = false;
      throw error;
    }
    return getOneCouponResponse;
  }

  @ApiOperation({ summary: 'Create a new coupon' })
  @Post()
  async create(@Body() couponData: Coupon): Promise<Coupon> {
    try {
      return await this.couponService.create(couponData);
    } catch (error) {
      throw new BadRequestException('Failed to create coupon');
    }
  }

  @ApiOperation({ summary: 'Update an existing coupon' })
  @Put(':couponId')
  async update(@Param('couponId') couponId: string, @Body() updatedCouponData: Coupon): Promise<Coupon> {
    try {
      const updatedCoupon = await this.couponService.update(couponId, updatedCouponData);
      if (!updatedCoupon) {
        throw new NotFoundException('Coupon not found');
      }
      return updatedCoupon;
    } catch (error) {
      throw new BadRequestException('Failed to update coupon');
    }
  }

  @ApiOperation({ summary: 'Delete a coupon by ID' })
  @Delete(':couponId')
  async delete(@Param('couponId') couponId: string): Promise<{ message: string }> {
    try {
      const deletedCoupon = await this.couponService.delete(couponId);
      return { message: 'Coupon deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Failed to delete coupon');
    }
  }
}
