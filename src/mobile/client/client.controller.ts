import {
  Body,
  Controller,
  Post,
  Patch,
  Request,
  Get
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import {
  CreateResponse,
  FindOneResponse,
  UpdateResponse
} from '../../common/dto/response.dto';
import { ClientFactoryService } from './factory/client.factory';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dtos';
import { Client } from 'src/models';


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

  @ApiOperation({ summary: 'Get Client Information' })
  @Get()
  async getClient(
    @Request() req: Express.Request
  ) {
    const getClientResponse = new FindOneResponse<Client>();
    try {
      const client = await this.clientService.findClient(req.user['_id']);
      getClientResponse.success = true;
      getClientResponse.data = client;
    } catch (error) {
      getClientResponse.success = false;
      throw error;
    }

    return getClientResponse;
  }

  @ApiOperation({ summary: 'update Client' })
  @Patch()
  async updateClient(
    @Body() updateClientDto: UpdateClientDto,
    @Request() req: Express.Request
  ) {
    const updateClientResponse = new UpdateResponse<Client>();
    try {

      const client = this.clientFactoryService.updateClient(
        updateClientDto,
      );
      console.log('clientclientclientclientclientclientclientclient', client);

      const updatedClient = await this.clientService.update(
        req.user['_id'],
        client,
      );
      updateClientResponse.success = true;
      updateClientResponse.data = updatedClient;
    } catch (error) {
      updateClientResponse.success = false;
      throw error;
    }
    return updateClientResponse;
  }

}
