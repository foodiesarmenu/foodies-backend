import { MealFactoryService } from './factory/meal.factory';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateResponse,
  FindAllQuery, FindAllResponse,
  FindOneResponse,
  RemoveResponse,
  Role,
  Roles,
  UpdateResponse,
  swagger
} from 'src/common';
import { CreateMealDto, UpdateMealDto } from './dtos';
import { Meal } from 'src/models';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadInterceptor } from 'src/blocks/interceptors/image-upload.interceptor';

@Roles(Role.RESTAURANT)
@Controller('dashboard/restaurant/meal')
@ApiTags(swagger.RestaurantMeal)
export class MealController {
  constructor(
    private readonly mealService: MealService,
    private readonly mealFactoryService: MealFactoryService,
  ) { }

  @ApiOperation({ summary: 'Create new meal' })
  @Post()
  @UseInterceptors(FileInterceptor('image'), new ImageUploadInterceptor('meal'))
  async Create(
    @Body() createMealDto: CreateMealDto,
    @Request() req: Express.Request,
  ) {
    const createMealResponse = new CreateResponse<Meal>();
    try {
      const meal =
        await this.mealFactoryService.createNewMeal(
          createMealDto,
          req.user['_id']
        );

      const createdMeal = await this.mealService.create(meal);
      createMealResponse.success = true;
      createMealResponse.data = createdMeal;
    } catch (error) {
      createMealResponse.success = false;
      throw error;
    }

    return createMealResponse;
  }

  @ApiOperation({ summary: 'Get all meals' })
  @Get()
  async getMeals(@Query() query: FindAllQuery) {
    const getMealsResponse = new FindAllResponse<Meal>();
    try {
      const meals = await this.mealService.getAllMeals(query);
      getMealsResponse.success = true;
      getMealsResponse.data = meals.data;
      getMealsResponse.currentPage = meals.currentPage;
      getMealsResponse.numberOfPages = meals.numberOfPages;
      getMealsResponse.numberOfRecords = meals.numberOfRecords;
    } catch (error) {
      getMealsResponse.success = false;
      throw error;
    }

    return getMealsResponse;
  }

  @ApiOperation({ summary: 'Get meal' })

  @Get(':mealId')
  async getMeal(@Param('mealId') mealId: string) {
    const getMealResponse = new FindOneResponse<Meal>();
    try {
      const meal = await this.mealService.findMeal(mealId);
      getMealResponse.success = true;
      getMealResponse.data = meal;
    } catch (error) {
      getMealResponse.success = false;
      throw error;
    }
    return getMealResponse;
  }

  @ApiOperation({ summary: 'Update meal' })
  @Patch(':mealId')
  async update(
    @Body() updateMealDto: UpdateMealDto,
    @Param('mealId') mealId: string,
  ) {
    const updateMealResponse = new UpdateResponse<Meal>();
    try {

      const meal = this.mealFactoryService.updateMeal(updateMealDto);

      const updatedMeal = await this.mealService.updateMeal(mealId, meal);
      updateMealResponse.success = true;
      updateMealResponse.data = updatedMeal;
    } catch (error) {
      updateMealResponse.success = false;
      throw error;
    }
    return updateMealResponse;
  }

  @ApiOperation({ summary: 'Delete meal' })
  @Delete(':mealId')
  async deleteMeal(@Param('mealId') mealId: string) {
    const deleteMealResponse = new RemoveResponse();
    try {
      await this.mealService.deleteMeal(mealId);
      deleteMealResponse.success = true;
    } catch (error) {
      deleteMealResponse.success = false;
      throw error;
    }
    return deleteMealResponse;
  }
}
