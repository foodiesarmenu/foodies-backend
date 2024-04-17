import { Module } from '@nestjs/common';

import { Coupon, CouponRepository, CouponSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponFactoryService } from './factory/coupon.factory';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Coupon.name,
      schema: CouponSchema,
    },
  ]),],
  controllers: [CouponController],
  providers: [CouponService, CouponRepository, CouponFactoryService],
  exports: [CouponService, CouponRepository, CouponFactoryService],
})
export class CouponModule { }