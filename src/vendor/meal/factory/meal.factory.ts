import { Meal } from 'src/models';
import { UpdateMealDto, CreateMealDto } from '../dtos/index';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MealFactoryService {
  async createNewMeal(createMealDto: CreateMealDto, restaurantId: Types.ObjectId) {
    const newMeal = new Meal();
    newMeal.restaurant = restaurantId;
    newMeal.image = createMealDto.image;
    newMeal.name = createMealDto.name;
    newMeal.description = createMealDto.description;
    newMeal.price = createMealDto.price;
    newMeal.currency = createMealDto.currency;
    newMeal.rate = createMealDto.rate;
    newMeal.calories = createMealDto.calories;
    newMeal.protein = createMealDto.protein;
    newMeal.fat = createMealDto.fat;
    newMeal.carbohydrates = createMealDto.carbohydrates;
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
    newMeal.calories = updateMealDto.calories && updateMealDto.calories;
    newMeal.protein = updateMealDto.protein && updateMealDto.protein;
    newMeal.fat = updateMealDto.fat && updateMealDto.fat;
    newMeal.carbohydrates = updateMealDto.carbohydrates && updateMealDto.carbohydrates;
    newMeal.tags = updateMealDto.tags && updateMealDto.tags;

    return newMeal;
  }
}
