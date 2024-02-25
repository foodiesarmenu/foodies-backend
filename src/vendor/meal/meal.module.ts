import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meal, MealRepository, MealSchema } from 'src/models';
import { MealFactoryService } from './factory/meal.factory';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Meal.name,
        schema: MealSchema,
      },
    ]),
  ],
  controllers: [MealController],
  providers: [MealService, MealRepository, MealFactoryService],
  exports: [MealService],
})
export class MealModule {}
