import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { log } from 'console';
import { Types } from 'mongoose';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { Address, AddressRepository } from 'src/models';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}
  private readonly logger = new Logger(AddressService.name);

  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  public async create(address: Address) {
    try {
      const currentPrimaryAddress = await this.addressRepository.getOne({
        user: address.user,
        isPrimary: true,
      });

      if (currentPrimaryAddress) {
        currentPrimaryAddress.isPrimary = false;
        await this.addressRepository.update(
          { _id: currentPrimaryAddress._id },
          currentPrimaryAddress,
          { new: true },
        );
      }

      const addressCreated = await this.addressRepository.create(address);
      if (!addressCreated) {
        throw new BadRequestException(message.address.FailedToCreate);
      }
      return addressCreated;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getAll(query: FindAllQuery) {
    try {
      const address = await this.addressRepository.getAll(
        { isDeleted: false },
        { ...query },
      );
      return address;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getById(adderssId: string) {
    try {
      const address = await this.addressRepository.getOne({
        _id: adderssId,
        isDeleted: false,
      });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
      return address;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getPrimary(userId: string) {
    try {
      const address = await this.addressRepository.getOne({
        user: userId,
        isPrimary: true,
        isDeleted: false,
      });
      if (!address) {
        throw new NotFoundException('Primary address not found');
      }
      return address;
    } catch (error) {
      this.handleError(error); 
    }
  }

  public async update(addressId: string, address: Address) {
    try {
      const isExist = await this.addressRepository.getOne({
        _id: addressId,
        isDeleted: false,
      });
      if (!isExist) throw new NotFoundException('Address not found');

      const currentPrimaryAddress = await this.addressRepository.getOne({
        user: address.user,
        isPrimary: true,
        isDeleted: false,
      });

      if (currentPrimaryAddress && currentPrimaryAddress._id != addressId) {
        currentPrimaryAddress.isPrimary = false;
        await this.addressRepository.update(
          { _id: currentPrimaryAddress._id },
          currentPrimaryAddress,
          { new: true },
        );
      }
      const updatedAddress = await this.addressRepository.update(
        { _id: addressId },
        address,
        { new: true },
      );
      return updatedAddress;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(addressId: string) {
    try {
      const isExist = await this.addressRepository.getOne({
        _id: addressId,
        isDeleted: false,
      });

      if (!isExist) throw new NotFoundException('Address not found');

      const deletedAddress = await this.addressRepository.update(
        { _id: addressId },
        { isDeleted: true },
        { new: true },
      );

      return deletedAddress;
    } catch (error) {
      this.handleError(error);
    }
  }
}
