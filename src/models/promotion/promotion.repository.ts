import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Promotion, PromotionDocument } from './Promotion.schema'; 

export class PromotionRepository extends AbstractRepository<Promotion> {
    constructor(
        @InjectModel(Promotion.name)
        private readonly promotionModel: Model<PromotionDocument>,
    ) {
        super(promotionModel);
    }
}
