import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreatePromotionDto, UpdatePromotionDto } from '../dto';
import { Promotion } from '../entities/promotion.entity';

@Injectable()
export class PromotionFactoryService {
  async createNewPromotion(createPromotionDto: CreatePromotionDto) {

    const promotion = new Promotion();
    promotion.description = createPromotionDto.description;
    promotion.image = createPromotionDto.iamge;
    promotion.isDeleted = createPromotionDto.IsDeleted;
    promotion.restaurantId = createPromotionDto.restaurantId;
    return promotion;
  }


  updatePromotion(updatePromotion: UpdatePromotionDto) {
    const updatedPromotion = new Promotion();
    updatedPromotion.description = updatePromotion.description;
    updatedPromotion.image = updatePromotion.iamge;
    updatedPromotion.restaurantId = updatePromotion.restaurantId;
    updatedPromotion.isDeleted = updatePromotion.IsDeleted;
  
    return updatedPromotion;
  }

}
