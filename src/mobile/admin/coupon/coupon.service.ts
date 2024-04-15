import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { Coupon } from 'src/models';
import { CouponRepository } from 'src/models/coupon/coupon.repository';


@Injectable()
export class CouponService {
  constructor(private couponeRepository: CouponRepository) { }

  private readonly logger = new Logger(CouponService.name);


  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  public async getAll(query: FindAllQuery) {
    try {
      const Coupone = await this.couponeRepository.getAll(
        { isDeleted: false },
        query
      );
      return Coupone;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getOne(couponId: string) {
    try {
      const category = await this.couponeRepository.getOne(
        {
          _id: couponId,
          isDeleted: false
        }
      );
      if (!category) {
        throw new BadRequestException(message.category.NotFound);
      }
      return category;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async create(CouponeData: Coupon): Promise<Coupon> {
    try {
      const newCategory = await this.couponeRepository.create(CouponeData);
      return newCategory;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(
    categoryId: string,
    updatedCouponeData: Coupon
  ): Promise<Coupon> {
    try {
      const updatedCategory = await this.couponeRepository.update(
        {_id: categoryId},
        updatedCouponeData,
        { new: true }
      );
      if (!updatedCategory) {
        throw new BadRequestException(message.category.NotFound);
      }
      return updatedCategory;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete(couponeId: string) {
    try {
      const couponExists = await this.couponeRepository.exists({
        _id: couponeId,
      });

      if (!couponExists) {
        throw new NotFoundException(message.user.NotFound);
      }

      const couponDeleted = await this.couponeRepository.update(
        { _id: couponeId, isDeleted: false },
        { isDeleted: true },
        { new: true, lean: true },
      );

      if (!couponDeleted) {
        throw new NotFoundException(message.user.FailedToDelete);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

}
