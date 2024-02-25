import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import { CreateResponse } from '../../common/dto/response.dto';
import { AddRestaurantFactoryService } from './factory/restaurant.factory';
import { AddRestaurantService } from './add-restaurant.service';
import { AddRestaurantDTO } from './dto/add-restaurant.dto';
import { Restaurant } from 'src/models/restaurant/restaurant.schema';

@Controller('dashboard/admin')
@ApiTags(swagger.MobileUser)
export class AddRestaurantController {
  constructor(
    private readonly addRestaurantService: AddRestaurantService,
    private readonly addRestaurantFactoryService: AddRestaurantFactoryService,
  ) { }

  @ApiOperation({ summary: 'Register a new restaurant' })
  @Public()
  @Post('newrestaurant')
  async registerRestaurant(@Body() addRestaurantDTO: AddRestaurantDTO) {
    const createRestaurantResponse = new CreateResponse<Restaurant>();
    try {
      const restaurant = await this.addRestaurantFactoryService.createNewRestaurant(
        addRestaurantDTO,
      );
      const createdRestaurant = await this.addRestaurantService.create(restaurant);
      createRestaurantResponse.success = true;
      createRestaurantResponse.data = createdRestaurant;
    } catch (error) {
      createRestaurantResponse.success = false;
      throw error;
    }
    return createRestaurantResponse;
  }
}




