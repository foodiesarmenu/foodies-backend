import { RestaurantRepository } from './../../models/restaurant/restaurant.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class RestaurantService {
  constructor(private RestaurantRepository: RestaurantRepository) {}

  private readonly logger = new Logger(RestaurantService.name);

  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  public async update(restaurantId: string, restaurant: any) {
    try {
      const restaurantExists = await this.RestaurantRepository.exists({
        _id: restaurantId,
      });
      if (!restaurantExists) {
        throw new NotFoundException('Restaurant not found');
      }
      return await this.RestaurantRepository.update(
        { _id: restaurantId },
        restaurant,
        { new: true },
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
