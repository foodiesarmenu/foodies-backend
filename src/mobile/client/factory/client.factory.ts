import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateClientDto, UpdateClientDto } from '../dtos';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientFactoryService {
  async createNewClient(createClientDto: CreateClientDto) {
    const newClient = new Client();
    const hashedPassword = await bcrypt.hash(createClientDto.password, 12);

    newClient.name = createClientDto.name;
    newClient.email = createClientDto.email;
    newClient.countryCode = createClientDto.countryCode;
    newClient.phoneNumber = createClientDto.phoneNumber;
    newClient.gender = createClientDto.gender;
    newClient.dateOfBirth = createClientDto.dateOfBirth;
    newClient.password = hashedPassword;

    return newClient;
  }

  updateClient(updateClientDto: UpdateClientDto) {
    const newClient = new Client();

    newClient.name = updateClientDto.name && updateClientDto.name;
    newClient.email = updateClientDto.email && updateClientDto.email;
    newClient.countryCode =
      updateClientDto.countryCode && updateClientDto.countryCode;
    newClient.phoneNumber =
      updateClientDto.phoneNumber && updateClientDto.phoneNumber;
    newClient.gender = updateClientDto.gender && updateClientDto.gender;
    newClient.dateOfBirth =
      updateClientDto.dateOfBirth && updateClientDto.dateOfBirth;
    newClient.addresses = updateClientDto.addresses && updateClientDto.addresses;

    return newClient;
  }
}