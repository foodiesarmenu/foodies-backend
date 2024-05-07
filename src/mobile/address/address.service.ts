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
  constructor(private readonly addressRepository: AddressRepository) { }
  private readonly logger = new Logger(AddressService.name);

  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  public async create(address: Address) {
    try {
      await this.addressRepository.update({ user: address.user, isPrimary: true }, { isPrimary: false }, {});
     
      address.isPrimary = true;

      const addressCreated = await this.addressRepository.create(address);

      if (!addressCreated) {
        throw new BadRequestException(message.address.FailedToCreate);
      }

      return addressCreated;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getAll(query: FindAllQuery, userId: string) {
    try {
      const address = await this.addressRepository.getAll(
        {
          user: userId,
          isDeleted: false
        },
        query,
      );
      return address;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getOne(addressId: string, userId: string) {
    try {
      const address = await this.addressRepository.getOne({
        _id: addressId,
        user: userId,
        isDeleted: false,
      });

      if (!address) {
        throw new NotFoundException(message.address.NotFound);
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
        throw new NotFoundException(message.address.NotFound);
      }

      return address;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(addressId: string, address: Address, userId: string) {
    try {
      const isExist = await this.addressRepository.getOne({
        _id: addressId,
        isDeleted: false,
      });

      if (!isExist) throw new NotFoundException(message.address.NotFound);

      if (address.isPrimary) {
        console.log(address.isPrimary, addressId);

        const u = await this.addressRepository.update(
          {
            user: userId,
            isPrimary: true
          },
          { isPrimary: false },
          { new: true },
        );
        console.log(u);

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

      if (!isExist) throw new NotFoundException(message.address.NotFound);

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
