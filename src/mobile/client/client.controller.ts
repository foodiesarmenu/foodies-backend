import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import { CreateResponse } from '../../common/dto/response.dto';
import { ClientFactoryService } from './factory/client.factory';
import { ClientService } from './client.service';
import { CreateClientDto } from './dtos';
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
  @Post('register')
  async register(@Body() createClientDto: CreateClientDto) {
    const createClientResponse = new CreateResponse<Client>();
    try {
      const client = await this.clientFactoryService.createNewClient(
        createClientDto,
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
}
