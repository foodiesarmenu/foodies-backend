import { MealFactoryService } from './factory/meal.factory';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateResponse, Public, swagger } from 'src/common';
import { createMealDto } from './dtos';
import { Meal } from 'src/models';

@Controller('meal')
@ApiTags(swagger.VendorMeal)
export class MealController {
  constructor(
    private readonly MealService: MealService,
    private readonly MealFactoryService: MealFactoryService,
  ) {}

  @ApiOperation({ summary: 'Register a new meal' })
  @Public()
  @Post('AddMeal')
  async AddMeal(@Body() createMealDto: createMealDto) {
    const createMealResponse = new CreateResponse<Meal>();
    try {
      const meal = await this.MealFactoryService.createNewMeal(createMealDto);
      const createdMeal = await this.MealService.create(meal);
      createMealResponse.success = true;
      createMealResponse.data = createdMeal;
    } catch (error) {
      createMealResponse.success = false;
      throw error;
    }
    return createMealResponse;
  }

  @ApiOperation({ summary: 'Get all meals' })
  @Public()
  @Get('GetMeals')
  async GetMeal() {
    const getMealsResponse = new CreateResponse<Meal[]>();
    try {
      const meals = await this.MealService.getAllMeals();
      getMealsResponse.success = true;
      getMealsResponse.data = meals;
    } catch (error) {
      getMealsResponse.success = false;
      throw error;
    }
    return getMealsResponse;
  }

  @ApiOperation({ summary: 'Get meal by id' })
  @Public()
  @Get('GetMealById/:id')
  async GetMealById(@Param('id') id: string) {
    const getMealByIdResponse = new CreateResponse<Meal>();
    try {
      const meal = await this.MealService.getMealById(id);
      getMealByIdResponse.success = true;
      getMealByIdResponse.data = meal;
    } catch (error) {
      getMealByIdResponse.success = false;
      throw error;
    }
    return getMealByIdResponse;
  }

  @ApiOperation({ summary: 'Update meal by id' })
  @Public()
  @Put('UpdateMeal/:id')
  async UpdateMeal(@Param('id') id: string, @Body() meal: Partial<Meal>) {
    const updateMealResponse = new CreateResponse<Meal>();
    try {
      const updatedMeal = await this.MealService.updateMeal(id, meal);
      updateMealResponse.success = true;
      updateMealResponse.data = updatedMeal;
    } catch (error) {
      updateMealResponse.success = false;
      throw error;
    }
    return updateMealResponse;
  }

  @ApiOperation({ summary: 'Delete meal by id' })
  @Public()
  @Delete('DeleteMeal/:id')
  async DeleteMeal(@Param('id') id: string) {
    const deleteMealResponse = new CreateResponse<Meal>();
    try {
      const deletedMeal = await this.MealService.deleteMeal(id);
      deleteMealResponse.success = true;
      deleteMealResponse.data = deletedMeal;
    } catch (error) {
      deleteMealResponse.success = false;
      throw error;
    }
    return deleteMealResponse;
  }
}
