import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { omit } from 'lodash';
import { message } from 'src/common/constants/message.constant';
import { Client, ClientRepository } from 'src/models';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) { }

  private readonly logger = new Logger(ClientService.name);


  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  
  public async create(client: Client) {
    try {
      const clientExists = await this.clientRepository.exists({
        $or: [
          { email: client.email },
          { phoneNumber: client.phoneNumber }],
      });

      if (clientExists) {
        throw new ConflictException(message.user.AlreadyExists);
      }

      await this.clientRepository.create(client);

      const userCreated = await this.findOne(client.email);

      if (!userCreated) {
        throw new BadRequestException(message.user.FailedToCreate);
      }

      return omit(userCreated, ['password']) as unknown as Client;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findOne(email: string) {
    try {
      return await this.clientRepository.getOne({ email });
    } catch (error) {
      this.handleError(error);
    }
  }
}
