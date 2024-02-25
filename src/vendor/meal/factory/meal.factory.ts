import { Meal } from 'src/models';
import { UpdateMealDto, createMealDto } from '../dtos/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MealFactoryService {
  async createNewMeal(createMealDto: createMealDto) {
    const newMeal = new Meal();
    newMeal.name = createMealDto.name;
    newMeal.price = createMealDto.price;
    newMeal.description = createMealDto.description;
    newMeal.image = createMealDto.image;
    newMeal.rate = createMealDto.rate;
    newMeal.tags = createMealDto.tags;

    return newMeal;
  }

  updateMeal(updateMealDto: UpdateMealDto) {
    const newMeal = new Meal();
    newMeal.name = updateMealDto.name && updateMealDto.name;
    newMeal.price = updateMealDto.price && updateMealDto.price;
    newMeal.description =
      updateMealDto.description && updateMealDto.description;
    newMeal.image = updateMealDto.image && updateMealDto.image;
    newMeal.rate = updateMealDto.rate && updateMealDto.rate;
    newMeal.tags = updateMealDto.tags && updateMealDto.tags;

    return newMeal;
  }
}
