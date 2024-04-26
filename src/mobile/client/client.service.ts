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
import { Client, ClientRepository } from 'src/models';
import { UpdateClientDto } from './dtos';

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

  public async findAll(query: FindAllQuery) {
    try {
      const clients = await this.clientRepository.getAll(
        { isDeleted: false },
        query,
      );
      return clients;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findClient(clientId: string) {
    try {
      const client = await this.clientRepository.getOne({
        _id: clientId,
        isDeleted: false,
      });

      if (!client) {
        throw new NotFoundException(message.user.NotFound);
      }

      return omit(client, ['password']) as unknown as Client;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(clientId: string, client: UpdateClientDto) {
    try {
      const clientExists = await this.clientRepository.exists({
        _id: clientId,
      });

      if (!clientExists) {
        throw new NotFoundException(message.user.NotFound);
      }

      const updatedClient = await this.clientRepository.update(
        { _id: clientId },
        client,
        { new: true },
      );

      if (!updatedClient) {
        throw new BadRequestException(message.user.FailedToUpdate);
      }

      return omit(updatedClient, ['password']) as unknown as Client;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete(clientId: string) {
    try {
      const clientExists = await this.clientRepository.exists({
        _id: clientId,
      });

      if (!clientExists) {
        throw new NotFoundException(message.user.NotFound);
      }

      const clientDeleted = await this.clientRepository.update(
        { _id: clientId, isDeleted: false },
        { isDeleted: true },
        { new: true, lean: true },
      );

      if (!clientDeleted) {
        throw new NotFoundException(message.user.FailedToDelete);
      }
    } catch (error) {
      this.handleError(error);
    }
  }



}



