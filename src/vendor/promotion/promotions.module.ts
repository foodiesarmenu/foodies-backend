import { Module } from '@nestjs/common';
import { Promotion, PromotionRepository, PromotionSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { PromotionsService } from './promotions.service';
import { PromotionFactoryService } from './factory/promotion.factory';
import { PromotionsController } from './promotions.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Promotion.name,
      schema: PromotionSchema,
    }

  ]),
  MulterModule.register({
    storage: diskStorage({}), 

  })],
  controllers: [PromotionsController],
  providers: [PromotionsService, PromotionFactoryService, PromotionRepository],
  exports: [PromotionsService, PromotionRepository],
})
export class PromotionsModule { } 