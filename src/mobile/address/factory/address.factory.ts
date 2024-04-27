import { Injectable } from '@nestjs/common';
import { CreateAddressDto, UpdateAddressDto } from '../dtos';
import { Address } from '../entities/address.entity';
import { Types } from 'mongoose';

@Injectable()
export class AddressFactoryService {
    async createNewAddress(createAddressDto: CreateAddressDto, userId: Types.ObjectId) {
        const newAddress = new Address();
        newAddress.user = userId;
        newAddress.firstAddress = createAddressDto.firstAddress;
        newAddress.secondAddress = createAddressDto.secondAddress;
        newAddress.buildingNumber = createAddressDto.buildingNumber;
        newAddress.streetName = createAddressDto.streetName;
        newAddress.floorNumber = createAddressDto.floorNumber;
        newAddress.apartmentNumber = createAddressDto.apartmentNumber;
        newAddress.note = createAddressDto.note;
        newAddress.isPrimary = createAddressDto.isPrimary;
    
        return newAddress;
    }
    
    updateAddress(updateAddressDto: UpdateAddressDto) {
        const newAddress = new Address();
    
        newAddress.firstAddress = updateAddressDto.firstAddress && updateAddressDto.firstAddress;
        newAddress.secondAddress = updateAddressDto.secondAddress && updateAddressDto.secondAddress;
        newAddress.buildingNumber = updateAddressDto.buildingNumber && updateAddressDto.buildingNumber;
        newAddress.streetName = updateAddressDto.streetName && updateAddressDto.streetName;
        newAddress.floorNumber = updateAddressDto.floorNumber && updateAddressDto.floorNumber;
        newAddress.apartmentNumber = updateAddressDto.apartmentNumber && updateAddressDto.apartmentNumber;
        newAddress.note = updateAddressDto.note && updateAddressDto.note;
        newAddress.isPrimary = updateAddressDto.isPrimary && updateAddressDto.isPrimary;
    
        return newAddress;
    }
    }