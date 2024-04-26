import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { createPromotionDto, UpdatePromotionDto } from '../dto';
import { Promotion } from '../entities/promotion.entity';

@Injectable()
export class PromotionFactoryService {

    async createNewPromotion(createPromotionDto: createPromotionDto, restaurantId: Types.ObjectId) {
        const newPromotion = new Promotion();
        newPromotion.restaurant = restaurantId;
        newPromotion.image = createPromotionDto.image;
        newPromotion.title = createPromotionDto.title;
        newPromotion.description = createPromotionDto.description;

        return newPromotion;
    }

    updatePromotion(updatePromotionDto: UpdatePromotionDto) {
        const newPromotion = new Promotion();
        newPromotion.title = updatePromotionDto.title && updatePromotionDto.title;
        newPromotion.description = updatePromotionDto.description && updatePromotionDto.description;
        newPromotion.isActive = updatePromotionDto.isActive && updatePromotionDto.isActive;

        return newPromotion;
    }
}
