import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { message } from 'src/common/constants/message.constant';
import { Meal, MealRepository } from 'src/models';

@Injectable()
export class MealService {
  constructor(private mealRepository: MealRepository) {}

  private readonly logger = new Logger(MealService.name);

  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  public async create(meal: Meal) {
    try {
      const mealCreated = await this.mealRepository.create(meal);

      if (!mealCreated) {
        throw new BadRequestException(message.user.FailedToCreate);
      }

      return mealCreated;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getAllMeals(): Promise<Meal[]> {
    return this.mealRepository.find();
  }

  async getMealById(id: string): Promise<Meal> {
    return this.mealRepository.findById(id);
  }

  async updateMeal(id: string, meal: Partial<Meal>): Promise<Meal> {
    return this.mealRepository.findByIdAndUpdate(id, meal);
  }

  async deleteMeal(id: string): Promise<void> {
    return this.mealRepository.findByIdAndDelete(id);
  }
}
