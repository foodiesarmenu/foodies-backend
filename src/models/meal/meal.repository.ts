import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Meal, MealDocument } from './meal.schema';

export class MealRepository extends AbstractRepository<Meal> {
  constructor(
    @InjectModel(Meal.name)
    private readonly MealModel: Model<MealDocument>,
  ) {
    super(MealModel);
  }
  async find(): Promise<Meal[]> {
    return this.MealModel.find().exec();
  }

  async findById(id: string): Promise<Meal> {
    return this.MealModel.findById(id).exec();
  }

  async findByIdAndUpdate(id: string, meal: Partial<Meal>): Promise<Meal> {
    return this.MealModel.findByIdAndUpdate(id, meal, { new: true }).exec();
  }

  async findByIdAndDelete(id: string): Promise<void> {
    await this.MealModel.findByIdAndDelete(id).exec();
  }
}
