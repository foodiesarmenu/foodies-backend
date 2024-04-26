import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Coupon, CouponDocument } from './coupon.schema';

export class CouponRepository extends AbstractRepository<Coupon> {
    constructor(
        @InjectModel(Coupon.name)
        private readonly couponModel: Model<CouponDocument>,
    ) {
        super(couponModel);
    }
}
