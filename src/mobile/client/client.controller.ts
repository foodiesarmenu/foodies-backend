import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Patch,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import {
  CreateResponse,
  FindAllResponse,
  FindOneResponse,
  RemoveResponse,
  UpdateResponse
} from '../../common/dto/response.dto';
import { ClientFactoryService } from './factory/client.factory';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dtos';
import { Client } from 'src/models';
import { FindAllQuery } from 'src/common';

@Controller('mobile/client')
@ApiTags(swagger.MobileUser)
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly clientFactoryService: ClientFactoryService,
  ) { }

  @ApiOperation({ summary: 'Register a new client' })
  @Public()
  @Post()
  async register(@Body() createClientDto: CreateClientDto) {
    const createClientResponse = new CreateResponse<Client>();
    try {
      const client = await this.clientFactoryService.createNewClient(
        createClientDto,//body
      );
      const createdClient = await this.clientService.create(client);
      createClientResponse.success = true;
      createClientResponse.data = createdClient;
    } catch (error) {
      createClientResponse.success = false;
      throw error;
    }
    return createClientResponse;
  }

  @ApiOperation({ summary: 'Get All Clients' })
  @Get()
  async getClients(@Query() query: FindAllQuery) {
    const getClientsResponse = new FindAllResponse<Client>();
    try {
      const Clients = await this.clientService.findAll(query);
      getClientsResponse.success = true;
      getClientsResponse.data = Clients.data;
      getClientsResponse.currentPage = Clients.currentPage;
      getClientsResponse.numberOfPages = Clients.numberOfPages;
      getClientsResponse.numberOfRecords = Clients.numberOfRecords;
    } catch (error) {
      getClientsResponse.success = false;
      throw error;
    }
    return getClientsResponse;
  }

  @ApiOperation({ summary: 'Get Specific client' })
  @Get(':clientId')
  async getClient(@Param('clientId') clientId: string) {
    const getClientResponse = new FindOneResponse<Client>();

    try {
      const client = await this.clientService.findClient(
        clientId,
      );
      getClientResponse.success = true;
      getClientResponse.data = client;
    } catch (error) {
      getClientResponse.success = false;
      throw error;
    }
    return getClientResponse;
  }

  @ApiOperation({ summary: 'Update client' })
  @Patch(':clientId')
  async updateClient(
    @Body() updateClientDto: UpdateClientDto,
    @Param('clientId') clientId: string,
  ) {
    const updateClientResponse = new UpdateResponse<Client>();
    try {
      const client =
        this.clientFactoryService.updateClient(updateClientDto);

      const updateClient = await this.clientService.update(
        clientId,
        client,
      );
      updateClientResponse.success = true;
      updateClientResponse.data = updateClient;
    } catch (error) {
      updateClientResponse.success = false;
      throw error;
    }
    return updateClientResponse;
  }

  @ApiOperation({ summary: 'Delete Client' })
  @Delete(':clientId')
  async deleteClient(@Param('clientId') clientId: string) {
    const deleteClientResponse = new RemoveResponse();
    try {
      await this.clientService.delete(clientId);
      deleteClientResponse.success = true;
    } catch (error) {
      deleteClientResponse.success = false;
      throw error;
    }
    return deleteClientResponse;
  }

}
