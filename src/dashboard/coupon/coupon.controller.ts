import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CouponService } from './coupon.service';
import { Coupon } from 'src/models/coupon/coupon.schema';
import {
  CreateResponse,
  FindAllQuery,
  FindAllResponse,
  FindOneResponse,
  RemoveResponse,
  Role,
  Roles,
  swagger,
  UpdateResponse,
} from 'src/common';
import { CreateCouponDto, UpdateCouponDto } from './dtos';
import { CouponFactoryService } from './factory/coupon.factory';

@Roles(Role.ADMIN)
@ApiTags(swagger.DashboardCoupon)
@Controller('dashboard/admin/coupon')
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
    private readonly couponFactoryService: CouponFactoryService,
  ) {}

  @ApiOperation({ summary: 'Create a new coupon' })
  @Post()
  async create(@Body() createCouponDto: CreateCouponDto) {
    const createCouponResponse = new CreateResponse<Coupon>();

    try {
      const coupon = await this.couponFactoryService.createNewCoupon(
        createCouponDto,
      );

      const createdCoupon = await this.couponService.create(coupon);
      createCouponResponse.success = true;
      createCouponResponse.data = createdCoupon;
    } catch (error) {
      createCouponResponse.success = false;
      throw error;
    }

    return createCouponResponse;
  }

  @ApiOperation({ summary: 'Get all coupons' })
  @Get()
  async getAll(@Query() query: FindAllQuery) {
    const getAllCouponResponse = new FindAllResponse<Coupon>();

    try {
      const coupons = await this.couponService.getAll(query);
      getAllCouponResponse.success = true;
      getAllCouponResponse.data = coupons.data;
      getAllCouponResponse.currentPage = coupons.currentPage;
      getAllCouponResponse.numberOfPages = coupons.numberOfPages;
      getAllCouponResponse.numberOfRecords = coupons.numberOfRecords;
    } catch (error) {
      getAllCouponResponse.success = false;
      throw error;
    }

    return getAllCouponResponse;
  }

  @ApiOperation({ summary: 'Get coupon by id' })
  @Get(':couponId')
  async getOne(@Param('couponId') couponId: string) {
    const getOneCouponResponse = new FindOneResponse<Coupon>();
    try {
      const coupon = await this.couponService.getOne(couponId);
      getOneCouponResponse.success = true;
      getOneCouponResponse.data = coupon;
    } catch (error) {
      getOneCouponResponse.success = false;
      throw error;
    }

    return getOneCouponResponse;
  }

  @ApiOperation({ summary: 'get all coupons by restaurant' })
  @Get('restaurant/:restaurantId')
  async getAllByRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Query() query: FindAllQuery,
  ) {
    const getAllByRestaurantResponse = new FindAllResponse<Coupon>();
    try {
      const coupons = await this.couponService.getAllByRestaurant(restaurantId, query);
      getAllByRestaurantResponse.success = true;
      getAllByRestaurantResponse.data = coupons.data;
      getAllByRestaurantResponse.currentPage = coupons.currentPage;
      getAllByRestaurantResponse.numberOfPages = coupons.numberOfPages;
      getAllByRestaurantResponse.numberOfRecords = coupons.numberOfRecords;
    } catch (error) {
      getAllByRestaurantResponse.success = false;
      throw error;
    }

    return getAllByRestaurantResponse;
  }

  @ApiOperation({ summary: 'Update an existing coupon' })
  @Patch(':couponId')
  async update(
    @Param('couponId') couponId: string,
    @Body() updatedCouponData: UpdateCouponDto,
  ) {
    const updateCouponResponse = new UpdateResponse<Coupon>();
    try {
      const Coupon = this.couponFactoryService.updateCoupon(updatedCouponData);

      const updatedCoupon = await this.couponService.update(couponId, Coupon);
      updateCouponResponse.success = true;
      updateCouponResponse.data = updatedCoupon;
    } catch (error) {
      updateCouponResponse.success = false;
      throw error;
    }

    return updateCouponResponse;
  }

  @ApiOperation({ summary: 'Delete a coupon by id' })
  @Delete(':couponId')
  async delete(@Param('couponId') couponId: string) {
    const deleteCouponResponse = new RemoveResponse();
    try {
      await this.couponService.delete(couponId);
      deleteCouponResponse.success = true;
    } catch (error) {
      deleteCouponResponse.success = false;
      throw error;
    }

    return deleteCouponResponse;
  }
}
