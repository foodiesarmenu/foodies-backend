import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { Restaurant, RestaurantRepository } from 'src/models';

@Injectable()
export class RestaurantService {
  constructor(private restaurantRepository: RestaurantRepository) { }

  private readonly logger = new Logger(RestaurantService.name);


  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }


  public async create(restaurant: Restaurant) {
    try {
      const restaurantExists = await this.restaurantRepository.exists({
        $or: [
          { email: restaurant.email },
          { phoneNumber: restaurant.phoneNumber }],
      });

      if (restaurantExists) {
        throw new ConflictException(message.restaurant.AlreadyExists);
      }

      const createdRestaurant = await this.restaurantRepository.create(restaurant);


      if (!createdRestaurant) {
        throw new BadRequestException(message.restaurant.FailedToCreate);
      }

      return omit(createdRestaurant, ['password']) as unknown as Restaurant;
    } catch (error) {
      this.handleError(error);
    }
  }


  public async getAll(query: FindAllQuery) {
    try {
      const restaurants = await this.restaurantRepository.getAll(
        { isDeleted: false },
        query
      );
      return omit(restaurants, ['password']);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getOne(restaurantId: string) {
    try {
      const restaurant = await this.restaurantRepository.getOne(
        {
          _id: restaurantId,
          isDeleted: false
        }
      );

      if (!restaurant) {
        throw new BadRequestException(message.restaurant.NotFound);
      }

      return restaurant;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(restaurantId: string, restaurant: Restaurant) {
    try {

      const isExist = await this.restaurantRepository.exists({
        _id: restaurantId,
        isDeleted: false
      });

      if (!isExist) throw new NotFoundException(message.restaurant.NotFound);

      const restaurantUpdated = await this.restaurantRepository.update(
        { _id: restaurantId },
        restaurant,
        { new: true },
      );

      return restaurantUpdated;
    }
    catch (error) {
      this.handleError(error);
    }
  }

  public async delete(restaurantId: string) {
    try {
      const isExist = await this.restaurantRepository.exists({
        _id: restaurantId,
        isDeleted: false
      });

      if (!isExist) throw new NotFoundException(message.restaurant.NotFound);

      const restaurantDeleted = await this.restaurantRepository.update(
        { _id: restaurantId },
        { isDeleted: true },
        { new: true },
      );

      return this.restaurantRepository.getAll({ isDeleted: false },
        {});
    }
    catch (error) {
      this.handleError(error);
    }
  }

}
