import { UpdateMealDto, CreateMealDto } from '../dtos/index';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Meal } from '../entites/meal.entity';

@Injectable()
export class MealFactoryService {
  async createNewMeal(createMealDto: CreateMealDto, restaurantId: Types.ObjectId) {
    const newMeal = new Meal();
    newMeal.restaurant = restaurantId;
    newMeal.image = createMealDto.image;
    newMeal.name = createMealDto.name;
    newMeal.description = createMealDto.description;
    newMeal.price = createMealDto.sizes[0].price;
    newMeal.currency = createMealDto.currency;
    newMeal.rate = createMealDto.rate;
    newMeal.calories = createMealDto.calories;
    newMeal.protein = createMealDto.protein;
    newMeal.fat = createMealDto.fat;
    newMeal.carbohydrates = createMealDto.carbohydrates;
    newMeal.tags = createMealDto.tags;
    newMeal.sizes = createMealDto.sizes;
    return newMeal;
  }

  updateMeal(updateMealDto: UpdateMealDto) {
    const newMeal = new Meal();
    newMeal.image = updateMealDto.image && updateMealDto.image;
    newMeal.name = updateMealDto.name && updateMealDto.name;
    newMeal.currency = updateMealDto.currency && updateMealDto.currency;
    newMeal.price = updateMealDto.sizes[0].price && updateMealDto.sizes[0].price;
    newMeal.description = updateMealDto.description && updateMealDto.description;
    newMeal.rate = updateMealDto.rate && updateMealDto.rate;
    newMeal.calories = updateMealDto.calories && updateMealDto.calories;
    newMeal.protein = updateMealDto.protein && updateMealDto.protein;
    newMeal.fat = updateMealDto.fat && updateMealDto.fat;
    newMeal.carbohydrates = updateMealDto.carbohydrates && updateMealDto.carbohydrates;
    newMeal.tags = updateMealDto.tags && updateMealDto.tags;
    newMeal.sizes = updateMealDto.sizes && updateMealDto.sizes;
    return newMeal;
  }
}
