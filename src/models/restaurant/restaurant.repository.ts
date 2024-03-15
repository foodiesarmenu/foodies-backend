import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Restaurant, RestaurantDocument } from './restaurant.schema';

export class RestaurantRepository extends AbstractRepository<Restaurant> {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {
    super(restaurantModel);
  }
}
