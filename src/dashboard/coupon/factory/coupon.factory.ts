import { Injectable } from '@nestjs/common';
import { CreateCouponDto, UpdateCouponDto } from '../dtos';
import { Coupon } from '../entities/coupon';

@Injectable()
export class CouponFactoryService {
  async createNewCoupon(createCouponDto: CreateCouponDto) {
    const newCoupon = new Coupon();

    newCoupon.code = createCouponDto.code;
    newCoupon.expires = createCouponDto.expires;
    newCoupon.discount = createCouponDto.discount;

    return newCoupon;
  }

  updateCoupon(updateCouponDto: UpdateCouponDto) {
    const newCoupon = new Coupon();

    newCoupon.code = updateCouponDto.code && updateCouponDto.code;
    newCoupon.discount = updateCouponDto.discount && updateCouponDto.discount;
    newCoupon.expires =
      updateCouponDto.expires && updateCouponDto.expires;

    return newCoupon;
  }
}
