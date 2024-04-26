import {
  Controller,
  Get,
  Param,
  Query
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import {
  FindAllQuery,
  FindAllResponse,
  Role,
  Roles,
  swagger
} from 'src/common';
import { Restaurant } from 'src/models';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Roles(Role.Client)
@ApiTags(swagger.MobileRestaurant)
@Controller('mobile/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @ApiOperation({ summary: 'Get all restaurants' })
  @Get()
  async getAll(@Query() query: FindAllQuery) {
    const getAllRestaurantsResponse = new FindAllResponse<Restaurant>();

    try {
      const restaurants = await this.restaurantService.getAll(query);
      getAllRestaurantsResponse.success = true;
      getAllRestaurantsResponse.data = restaurants.data;
      getAllRestaurantsResponse.currentPage = restaurants.currentPage;
      getAllRestaurantsResponse.numberOfPages = restaurants.numberOfPages;
      getAllRestaurantsResponse.numberOfRecords = restaurants.numberOfRecords;
    } catch (error) {
      getAllRestaurantsResponse.success = false;
      throw error;
    }

    return getAllRestaurantsResponse;
  }

  @ApiOperation({ summary: 'Get all restaurants' })
  @Get('searchByName')
  async searchByName(@Query('name') name: string) {
    const getAllRestaurantsResponse = new FindAllResponse<Restaurant>();

    try {
      const restaurants = await this.restaurantService.searchByName(name);
      getAllRestaurantsResponse.success = true;
      getAllRestaurantsResponse.data = restaurants.data;
      getAllRestaurantsResponse.currentPage = restaurants.currentPage;
      getAllRestaurantsResponse.numberOfPages = restaurants.numberOfPages;
      getAllRestaurantsResponse.numberOfRecords = restaurants.numberOfRecords;
    } catch (error) {
      getAllRestaurantsResponse.success = false;
      throw error;
    }

    return getAllRestaurantsResponse;
  }

  @ApiOperation({ summary: 'Get all restaurants' })
  @Get(':categoryId')
  async search(
    @Param('categoryId') categoryId: string,
  ) {
    const getAllRestaurantsResponse = new FindAllResponse<Restaurant>();

    try {
      const restaurants = await this.restaurantService.getAllByCategory(categoryId);
      getAllRestaurantsResponse.success = true;
      getAllRestaurantsResponse.data = restaurants.data;
      getAllRestaurantsResponse.currentPage = restaurants.currentPage;
      getAllRestaurantsResponse.numberOfPages = restaurants.numberOfPages;
      getAllRestaurantsResponse.numberOfRecords = restaurants.numberOfRecords;
    } catch (error) {
      getAllRestaurantsResponse.success = false;
      throw error;
    }

    return getAllRestaurantsResponse;
  }

}
