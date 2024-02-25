import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Meal, MealDocument } from './meal.schema';

export class MealRepository extends AbstractRepository<Meal> {
  constructor(
    @InjectModel(Meal.name)
    private readonly mealModel: Model<MealDocument>,
  ) {
    super(mealModel);
  }
}
