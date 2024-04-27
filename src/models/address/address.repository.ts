import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Address, AddressDocument } from './address.schema';

export class AddressRepository extends AbstractRepository<Address> {
    constructor(
        @InjectModel(Address.name)
        private readonly addressModel: Model<AddressDocument>,
    ) {
        super(addressModel);
    }
}