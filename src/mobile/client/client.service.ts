import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { omit } from 'lodash';
import { NotFoundError } from 'rxjs';
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

      const userCreated = await this.clientRepository.create(client);


      if (!userCreated) {
        throw new BadRequestException(message.user.FailedToCreate);
      }

      return omit(userCreated, ['password']) as unknown as Client;
    } catch (error) {
      this.handleError(error);
    }
  }




  // ********************************* update user data *********************************  
  public async updateOne(id: string, updatedClientData: Partial<Client>) {
    try {
      console.log(id);

      const existingClient = await this.clientRepository.getOne({ _id: id });
      console.log(existingClient);

      if (!existingClient) {
        throw new BadRequestException(message.user.NotFound);
      }
      const updatedClient = await this.clientRepository.update({ _id: id }, updatedClientData, {new: true});
      if (!updatedClient) {
        throw new BadRequestException(message.user.FailedToUpdate);
      }
      return updatedClient;
    } catch (error) {
      this.handleError(error);
    }
  }
  // ********************************* update user data *********************************  


  // *****************************  get one user *******************************
  public async getOneUser(id: string) {
    try {
      const user = await this.clientRepository.getOne({ _id: id });
      if (!user) {
        throw new BadRequestException(message.user.NotFound);
      }
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  // *****************************  get one user *******************************


  public async deleteUser(id: string) {
    try {
      const existUser = await this.clientRepository.getOne({ _id: id });
      if (!existUser) {
        throw new BadRequestException(message.user.NotFound);
      }
      const deletedUser = await this.clientRepository.delete({ _id: id });
      return deletedUser

    } catch (error) {
      this.handleError(error);
    }
  }



}



