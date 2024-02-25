import { Module } from '@nestjs/common';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';
import { AddRestaurantService } from './add-restaurant.service';
import { AddRestaurantFactoryService } from './factory/restaurant.factory';
import { AddRestaurantController } from './add-restaurant.controller';

@Module({
  imports: [UserMongoModule],
  controllers: [AddRestaurantController],
  providers: [AddRestaurantService, AddRestaurantFactoryService],
  exports: [AddRestaurantService],
})
export class AddRestaurantModule { }