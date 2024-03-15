import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../dto';
import { Restaurant } from '../entities/restaurant.entity';

@Injectable()
export class RestaurantFactoryService {
  async createNewRestaurant(createRestaurantDTO: CreateRestaurantDto) {
    const hashedPassword = await bcrypt.hash(createRestaurantDTO.password, 10);

    const restaurant = new Restaurant();
    restaurant.name = createRestaurantDTO.name;
    restaurant.email = createRestaurantDTO.email;
    restaurant.address = createRestaurantDTO.address;
    restaurant.description = createRestaurantDTO.description;
    restaurant.image = createRestaurantDTO.image;
    restaurant.phoneNumber = createRestaurantDTO.phoneNumber;
    restaurant.password = hashedPassword;
    restaurant.canDeliver = createRestaurantDTO.canDeliver;
    restaurant.city = createRestaurantDTO.city;
    restaurant.category = createRestaurantDTO.category;
    restaurant.status = createRestaurantDTO.status;

    return restaurant;
  }


  updateRestaurant(updateRestaurant: UpdateRestaurantDto) {
    const updateArticle = new Restaurant();
    updateArticle.name = updateRestaurant.name;
    updateArticle.email = updateRestaurant.email;
    updateArticle.address = updateRestaurant.address;
    updateArticle.description = updateRestaurant.description;
    updateArticle.image = updateRestaurant.image;
    updateArticle.phoneNumber = updateRestaurant.phoneNumber;
    updateArticle.canDeliver = updateRestaurant.canDeliver;
    updateArticle.city = updateRestaurant.city;
    updateArticle.category = updateRestaurant.category;
    updateArticle.status = updateRestaurant.status;
    return updateArticle;
  }

}
