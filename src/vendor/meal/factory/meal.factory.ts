import { Meal } from 'src/models';
import { UpdateMealDto, CreateMealDto } from '../dtos/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MealFactoryService {
  async createNewMeal(createMealDto: CreateMealDto) {
    const newMeal = new Meal();
    newMeal.image = createMealDto.image;
    newMeal.name = createMealDto.name;
    newMeal.description = createMealDto.description;
    newMeal.price = createMealDto.price;
    newMeal.currency = createMealDto.currency;
    newMeal.rate = createMealDto.rate;
    newMeal.tags = createMealDto.tags;

    return newMeal;
  }

  updateMeal(updateMealDto: UpdateMealDto) {
    const newMeal = new Meal();
    newMeal.image = updateMealDto.image && updateMealDto.image;
    newMeal.name = updateMealDto.name && updateMealDto.name;
    newMeal.price = updateMealDto.price && updateMealDto.price;
    newMeal.currency = updateMealDto.currency && updateMealDto.currency;
    newMeal.description = updateMealDto.description && updateMealDto.description;
    newMeal.rate = updateMealDto.rate && updateMealDto.rate;
    newMeal.tags = updateMealDto.tags && updateMealDto.tags;

    return newMeal;
  }
}
