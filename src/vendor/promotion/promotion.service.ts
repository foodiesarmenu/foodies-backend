import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Promotion, PromotionRepository } from 'src/models';
import { message } from 'src/common/constants/message.constant';
import { FindAllQuery } from 'src/common';

@Injectable()
export class PromotionService {
    constructor(
        private promotionRepository: PromotionRepository
    ) { }

    private readonly logger = new Logger(PromotionService.name);


    handleError(error: any) {
        this.logger.error(error);
        throw error;
    }

    public async create(promotion: Promotion) {
        try {
            const promotionCreated = await this.promotionRepository.create(promotion);

            if (!promotionCreated) {
                throw new BadRequestException(message.promotion.FailedToCreate);
            }

            return promotionCreated;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async getAllPromotions(query: FindAllQuery, restaurantId: string) {

        try {
            const promotions = await this.promotionRepository.getAll(
                {
                    restaurant: restaurantId,
                    isDeleted: false
                },
                query
            );
            return promotions;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async update(promotionId: string, promotion: Promotion) {
        try {
            console.log(promotionId, promotion);
            
            const promotionUpdated = await this.promotionRepository.update(
                {
                    _id: promotionId
                },
                promotion,
                { new: true }
            );

            if (!promotionUpdated) {
                throw new BadRequestException(message.promotion.FailedToUpdate);
            }

            return promotionUpdated;
        }
        catch (error) {
            this.handleError(error);
        }
    }
}
