import { Module } from '@nestjs/common';
import { Restaurant, RestaurantRepository, RestaurantSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantService } from './restaurant.service';
import { RestaurantFactoryService } from './factory/restaurant.factory';
import { RestaurantController } from './restaurant.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Restaurant.name,
      schema: RestaurantSchema,
    },
  ]),],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantFactoryService, RestaurantRepository],
  exports: [RestaurantService, RestaurantRepository],
})
export class RestaurantModule { }