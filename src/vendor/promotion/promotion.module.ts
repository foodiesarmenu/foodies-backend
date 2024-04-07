import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotion, PromotionRepository, PromotionSchema } from 'src/models';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PromotionFactoryService } from './factory/promotion.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Promotion.name,
        schema: PromotionSchema,
      },
    ])
    ,
    MulterModule.register({
      storage: diskStorage({}),
    })
  ],
  controllers: [PromotionController],
  providers: [PromotionService, PromotionRepository, PromotionFactoryService],
  exports: [PromotionService],
})
export class PromotionModule { }
