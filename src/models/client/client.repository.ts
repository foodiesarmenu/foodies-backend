import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Client, ClientDocument } from './client.schema';

export class ClientRepository extends AbstractRepository<Client> {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {
    super(clientModel);
  }
}
