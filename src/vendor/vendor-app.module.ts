import { Module } from '@nestjs/common';
import { MealModule } from './meal/meal.module';

@Module({
  imports: [MealModule],
})
export class VendorModule { }
