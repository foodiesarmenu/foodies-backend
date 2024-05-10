import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { Coupon } from 'src/models';
import { CouponRepository } from 'src/models/coupon/coupon.repository';


@Injectable()
export class CouponService {
  constructor(private couponRepository: CouponRepository) { }

  private readonly logger = new Logger(CouponService.name);


  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }


  public async create(coupon: Coupon , restaurant?: Types.ObjectId) {
    try {
      if (restaurant) {
        coupon.restaurant = restaurant;
      }  
      const createdCoupon = await this.couponRepository.create(coupon);

      if (!createdCoupon) {
        throw new BadRequestException(message.coupon.FailedToCreate);
      }
      return createdCoupon;

    } catch (error) {
      this.handleError(error);
    }
  }

  public async getAll(query: FindAllQuery) {
    try {
      const Coupon = await this.couponRepository.getAll(
        { isDeleted: false },
        query
      );
      return Coupon;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getOne(couponId: string) {
    try {
      const coupon = await this.couponRepository.getOne(
        {
          _id: couponId,
          isDeleted: false
        }
      );
      if (!coupon) {
        throw new BadRequestException(message.coupon.NotFound);
      }
      return coupon;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(couponId: string, updatedCouponData: Coupon) {
    try {
      const isExist = await this.couponRepository.exists({
        _id: couponId
      });

      if (!isExist) throw new NotFoundException(message.coupon.NotFound);

      const updatedCoupon = await this.couponRepository.update(
        { _id: couponId },
        updatedCouponData,
        { new: true }
      );
      if (!updatedCoupon) {
        throw new BadRequestException(message.coupon.FailedToUpdate);
      }

      return updatedCoupon;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete(couponId: string) {
    try {
      const couponExists = await this.couponRepository.exists({
        _id: couponId,
      });

      if (!couponExists) {
        throw new NotFoundException(message.coupon.NotFound);
      }

      const couponDeleted = await this.couponRepository.update(
        {
          _id: couponId
        },
        { isDeleted: true },
        { new: true, lean: true },
      );

      if (!couponDeleted) {
        throw new NotFoundException(message.coupon.FailedToDelete);
      }

    } catch (error) {
      this.handleError(error);
    }
  }

}
