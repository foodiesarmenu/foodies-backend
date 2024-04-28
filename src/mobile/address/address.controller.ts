import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { AddressService } from './address.service';
import {
  CreateResponse,
  FindAllQuery,
  FindAllResponse,
  FindOneResponse,
  RemoveResponse,
  Role,
  Roles,
  swagger,
  UpdateResponse,
} from 'src/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressFactoryService } from './factory/address.factory';
import { CreateAddressDto, UpdateAddressDto } from './dtos';
import { Address } from 'src/models';

@Roles(Role.Client)
@ApiTags(swagger.MobileAddress)
@Controller('mobile/address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly addressFactoryService: AddressFactoryService,
  ) { }

  @ApiOperation({ summary: 'Create a new address' })
  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @Request() req: Express.Request
  ) {
    const createAddressResponse = new CreateResponse<Address>();

    try {
      const address = await this.addressFactoryService.createNewAddress(
        createAddressDto,
        req.user['_id'],
      );

      const createdAddress = await this.addressService.create(address);
      createAddressResponse.success = true;
      createAddressResponse.data = createdAddress;
    } catch (error) {
      createAddressResponse.success = false;
      throw error;
    }
    return createAddressResponse;
  }

  @ApiOperation({ summary: 'Get all addresses' })
  @Get()
  async getAll(
    @Query() query: FindAllQuery,
    @Request() req: Express.Request
  ) {
    const getAllAddressesResponse = new FindAllResponse<Address>();

    try {
      const addresses = await this.addressService.getAll(query, req.user['_id']);
      getAllAddressesResponse.success = true;
      getAllAddressesResponse.data = addresses.data;
      getAllAddressesResponse.currentPage = addresses.currentPage;
      getAllAddressesResponse.numberOfPages = addresses.numberOfPages;
      getAllAddressesResponse.numberOfRecords = addresses.numberOfRecords;
    } catch (error) {
      getAllAddressesResponse.success = false;
      throw error;
    }
    return getAllAddressesResponse;
  }

  @ApiOperation({ summary: 'Get primary address' })
  @Get('primary')
  async getPrimary(@Request() req: Express.Request) {
    const getPrimaryAddressResponse = new FindOneResponse<Address>();
    console.log(req.user['_id']);

    try {
      const address = await this.addressService.getPrimary(req.user['_id']);
      getPrimaryAddressResponse.success = true;
      getPrimaryAddressResponse.data = address;
    } catch (error) {
      getPrimaryAddressResponse.success = false;
      throw error;
    }
    return getPrimaryAddressResponse;
  }

  @ApiOperation({ summary: 'Get one address' })
  @Get('getById/:addressId')
  async getOne(
    @Param('addressId') addressId: string,
    @Request() req: Express.Request
  ) {
    const getOneAddressResponse = new FindOneResponse<Address>();

    try {
      const address = await this.addressService.getOne(addressId, req.user['_id']);
      getOneAddressResponse.success = true;
      getOneAddressResponse.data = address;
    } catch (error) {
      getOneAddressResponse.success = false;
      throw error;
    }
    return getOneAddressResponse;
  }

  @ApiOperation({ summary: 'Update address' })
  @Patch(':addressId')
  async update(
    @Param('addressId') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Request() req: Express.Request,
  ) {
    const updateAddressResponse = new UpdateResponse<Address>();

    try {
      const address = this.addressFactoryService.updateAddress(
        updateAddressDto,
      );

      const updatedAddress = await this.addressService.update(
        addressId,
        address,
        req.user['_id'],
      );
      updateAddressResponse.success = true;
      updateAddressResponse.data = updatedAddress;
    } catch (error) {
      updateAddressResponse.success = false;
      throw error;
    }
    return updateAddressResponse;
  }

  @ApiOperation({ summary: 'Delete address' })
  @Delete(':addressId')
  async delete(@Param('addressId') addressId: string) {
    const deleteAddressResponse = new RemoveResponse();

    try {
      await this.addressService.delete(addressId);
      deleteAddressResponse.success = true;
    } catch (error) {
      deleteAddressResponse.success = false;
      throw error;
    }
    return deleteAddressResponse;
  }
}
