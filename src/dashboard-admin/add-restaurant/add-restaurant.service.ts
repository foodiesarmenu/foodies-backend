import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { omit } from 'lodash';
import { message } from 'src/common/constants/message.constant';
import { Restaurant, RestaurantRepository } from 'src/models';

@Injectable()
export class AddRestaurantService {
  constructor(private restaurantRepository: RestaurantRepository) { }

  private readonly logger = new Logger(AddRestaurantService.name);


  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  
  public async create(client: Restaurant) {
    try {
      const clientExists = await this.restaurantRepository.exists({
        $or: [
          { email: client.email },
          { phoneNumber: client.phoneNumber }],
      });

      if (clientExists) {
        throw new ConflictException(message.user.AlreadyExists);
      }

      await this.restaurantRepository.create(client);

      const userCreated = await this.findOne(client.email);

      if (!userCreated) {
        throw new BadRequestException(message.user.FailedToCreate);
      }

      return omit(userCreated, ['password']) as unknown as Restaurant;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findOne(email: string) {
    try {
      return await this.restaurantRepository.getOne({ email });
    } catch (error) {
      this.handleError(error);
    }
  }
}
