import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address, AddressRepository, AddressSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressFactoryService } from './factory/address.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Address.name,
        schema: AddressSchema,
      },
     ]) 
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository, AddressFactoryService],
  exports: [AddressService, AddressRepository]
})
export class AddressModule {}
 