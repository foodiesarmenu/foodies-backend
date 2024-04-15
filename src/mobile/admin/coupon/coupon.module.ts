import { Module } from '@nestjs/common';

import { Coupon, CouponRepository, CouponSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Coupon.name,
      schema: CouponSchema,
    },
  ]),],
  controllers: [CouponController],
  providers: [CouponService, CouponRepository],
  exports: [CouponService, CouponRepository],
})
export class CouponModule { }