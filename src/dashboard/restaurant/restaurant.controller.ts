import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import {
  CreateResponse,
  FindAllResponse,
  FindOneResponse,
  RemoveResponse,
  UpdateResponse
} from '../../common/dto/response.dto';
import { RestaurantFactoryService } from './factory/restaurant.factory';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from 'src/models/restaurant/restaurant.schema';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto';
import { FindAllQuery, Role, Roles } from 'src/common';

@Roles(Role.ADMIN)
@ApiTags(swagger.AdminAdminRestaurant)
@Controller('dashboard/admin/restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly restaurantFactoryService: RestaurantFactoryService,
  ) { }

  @ApiOperation({ summary: 'Register a new restaurant' })
  @Post()
  async create(@Body() createNewRestaurant: CreateRestaurantDto) {
    const createRestaurantResponse = new CreateResponse<Restaurant>();

    try {
      const restaurant = await this.restaurantFactoryService.createNewRestaurant(
        createNewRestaurant,
      );

      const createdRestaurant = await this.restaurantService.create(restaurant);
      createRestaurantResponse.success = true;
      createRestaurantResponse.data = createdRestaurant;
    } catch (error) {
      createRestaurantResponse.success = false;
      throw error;
    }

    return createRestaurantResponse;
  }

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

  @ApiOperation({ summary: 'Get specific restaurant' })
  @Get(':restaurantId')
  async getOne(@Param('restaurantId') restaurantId: string) {
    const getOneRestaurantResponse = new FindOneResponse<Restaurant>();

    try {
      const restaurant = await this.restaurantService.getOne(restaurantId);
      getOneRestaurantResponse.success = true;
      getOneRestaurantResponse.data = restaurant;

    } catch (error) {
      getOneRestaurantResponse.success = false;
      throw error;
    }

    return getOneRestaurantResponse;
  }

  @ApiOperation({ summary: 'Update restaurant' })
  @Patch(':restaurantId')
  async update(
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @Param('restaurantId') restaurantId: string,
  ) {
    const updateRestaurantIdResponse = new UpdateResponse<Restaurant>();
    try {
      const restaurant =
        this.restaurantFactoryService.updateRestaurant(updateRestaurantDto);

      const restaurantUpdated = await this.restaurantService.update(
        restaurantId,
        restaurant,
      );
      updateRestaurantIdResponse.success = true;
      updateRestaurantIdResponse.data = restaurantUpdated;
    } catch (error) {
      updateRestaurantIdResponse.success = false;
      throw error;
    }
    return updateRestaurantIdResponse;
  }

  @ApiOperation({ summary: 'Delete restaurant' })
  @Delete(':restaurantId')
  async delete(@Param('restaurantId') restaurantId: string) {
    const deleteRestaurantResponse = new RemoveResponse();
    try {
      await this.restaurantService.delete(restaurantId);
      deleteRestaurantResponse.success = true;
    } catch (error) {
      deleteRestaurantResponse.success = false;
      throw error;
    }
    return deleteRestaurantResponse;
  }
}



