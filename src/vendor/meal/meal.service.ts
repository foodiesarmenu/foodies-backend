import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { Meal, MealRepository } from 'src/models';

@Injectable()
export class MealService {
  constructor(private mealRepository: MealRepository) { }

  private readonly logger = new Logger(MealService.name);

  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  public async create(meal: Meal) {
    try {
      const mealCreated = await this.mealRepository.create(meal);

      if (!mealCreated) {
        throw new BadRequestException(message.meal.FailedToCreate);
      }

      return mealCreated;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getAllMeals(query: FindAllQuery) {

    try {
      const meals = await this.mealRepository.getAll(
        { isDeleted: false },
        query
      );
      return meals;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findMeal(mealId: string) {
    return this.mealRepository.getOne({
      _id: mealId,
      isDeleted: false
    });
  }

  async updateMeal(mealId: string, meal: Meal) {

    try {
      const isExist = await this.mealRepository.getOne({
        _id: mealId,
        isDeleted: false
      });

      if (!isExist) throw new NotFoundException(message.meal.NotFound);

      const updatedMeal = await this.mealRepository.update(
        { _id: mealId },
        meal,
        { new: true }
      );

      return updatedMeal;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteMeal(mealId: string) {
    try {
      const isExist = await this.mealRepository.getOne({
        _id: mealId,
        isDeleted: false
      });

      if (!isExist) throw new NotFoundException(message.meal.NotFound);

      const deletedMeal = await this.mealRepository.update(
        { _id: mealId },
        { isDeleted: true },
        { new: true }
      );
      return deletedMeal;
    } catch (error) {
      this.handleError(error);
    }
  }
}
