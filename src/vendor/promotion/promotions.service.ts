import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { Promotion, PromotionRepository } from 'src/models';

@Injectable()
export class PromotionsService {
  constructor(private promotionRepository: PromotionRepository) { }

  private readonly logger = new Logger(PromotionsService.name);


  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }


  public async create(promotion: Promotion) {
    try {
      const promotionExists = await this.promotionRepository.exists({
        $or: [
          { description: promotion.description },
          { phoneNimageumber: promotion.image }],
      });

      if (promotionExists) {
        throw new ConflictException(message.promotion.AlreadyExists);
      }

      const createdPromotion = await this.promotionRepository.create(promotion);


      if (!createdPromotion) {
        throw new BadRequestException(message.promotion.FailedToCreate);
      }

      return createdPromotion;
    } catch (error) {
      this.handleError(error);
    }
  }


  public async getAll(query: FindAllQuery) {
    try {
      const promotions = await this.promotionRepository.getAll(
        { isDeleted: false },
        query
      );
      return promotions;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getOne(promotionId: string) {
    try {
      const promotion = await this.promotionRepository.getOne(
        {
          _id: promotionId,
          isDeleted: false
        }
      );

      if (!promotion) {
        throw new BadRequestException(message.promotion.NotFound);
      }

      return promotion;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(promotionId: string, promotion: Promotion) {
    try {

      const isExist = await this.promotionRepository.exists({
        _id: promotionId,
        isDeleted: false
      });

      if (!isExist) throw new NotFoundException(message.promotion.NotFound);

      const promotionUpdated = await this.promotionRepository.update(
        { _id: promotionId },
        promotion,
        { new: true },
      );

      return promotionUpdated;
    }
    catch (error) {
      this.handleError(error);
    }
  }

  public async delete(promotionId: string) {
    try {
      const isExist = await this.promotionRepository.exists({
        _id: promotionId,
        isDeleted: false
      });

      if (!isExist) throw new NotFoundException(message.promotion.NotFound);

      const promotionDeleted = await this.promotionRepository.update(
        { _id: promotionId },
        { isDeleted: true },
        { new: true },
      );

      return promotionDeleted;
    }
    catch (error) {
      this.handleError(error);
    }
  }

}
