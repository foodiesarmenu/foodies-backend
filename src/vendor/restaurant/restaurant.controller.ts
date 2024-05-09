import { Body, Controller, Patch, Req } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantFactoryService } from 'src/dashboard/restaurant/factory/restaurant.factory';
import { Public, UpdateResponse } from 'src/common';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateRestaurantDto } from 'src/dashboard/restaurant/dto';
import { Restaurant } from 'src/models';

@Controller('dashboard/restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly restaurantFactoryService: RestaurantFactoryService,
  ) {}

  @Public()
  @ApiOperation({ summary: 'update restaurant' })
  @Patch()
  async update(
    @Body() updateRestaurantDto: UpdateRestaurantDto, 
    @Req() req: Express.Request,
  ) {
    const updateRestaurantResponse = new UpdateResponse<Restaurant>();
    try{
      const restaurant = await this.restaurantFactoryService.updateRestaurant(
        updateRestaurantDto,
      );
      const updatedRestaurant = await this.restaurantService.update(
        req.user['_id'],
        restaurant,
      );
      updateRestaurantResponse.success = true;
      updateRestaurantResponse.data = updatedRestaurant;
    } catch(error)
    {
      updateRestaurantResponse.success = false;
      throw error;
    }
    return updateRestaurantResponse;
  }
}
