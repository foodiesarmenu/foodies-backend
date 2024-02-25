import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AddRestaurantDTO } from '../dto/add-restaurant.dto';
import { Restaurant } from '../entities/restaurant.entity';

@Injectable()
export class AddRestaurantFactoryService {
  async createNewRestaurant(addRestaurantDTO: AddRestaurantDTO) {
    const newClient = new Restaurant();
    const hashedPassword = await bcrypt.hash(addRestaurantDTO.password, 12);
    newClient.name = addRestaurantDTO.name;
    newClient.email = addRestaurantDTO.email;
    newClient.phoneNumber = addRestaurantDTO.phoneNumber;
    newClient.password = hashedPassword;

    return newClient;
  }

  
}
