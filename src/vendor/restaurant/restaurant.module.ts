import { Module, Res } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant, RestaurantRepository, RestaurantSchema, User } from 'src/models';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';
import { RestaurantFactoryService } from 'src/dashboard/restaurant/factory/restaurant.factory';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Restaurant.name,
      schema: RestaurantSchema,
    }
  ])],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantFactoryService, RestaurantRepository],
  exports: [RestaurantService],
})
export class RestaurantModule {}
