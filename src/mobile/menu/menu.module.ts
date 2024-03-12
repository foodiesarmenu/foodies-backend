import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meal, MealRepository, MealSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Meal.name,
        schema: MealSchema,
      },
    ])
  ],
  controllers: [MenuController],
  providers: [MenuService, MealRepository],
  exports: [MenuService, MealRepository]
})
export class MenuModule { }
