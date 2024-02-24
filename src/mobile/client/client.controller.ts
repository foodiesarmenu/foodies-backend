import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import { CreateResponse, UpdateResponse } from '../../common/dto/response.dto';
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


  @Put('updateUser/:id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    const updateClientResponse = new UpdateResponse<Client>();
    try {
      const updatedClient = await this.clientService.updateOne(id, updateClientDto);
      updateClientResponse.success = true;
      updateClientResponse.data = updatedClient;
    } catch (error) {
      updateClientResponse.success = false;
      throw error;
    }
    return updateClientResponse;
  }


  @Get('getUser/:id')
  async getOneUser(@Param('id') id: string) {
    try {
      const user = await this.clientService.getOneUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  }


  @Delete("DeleteUser/:id")
  async deleteUser(@Param('id') id: string) {
    try {
      const user = await this.clientService.deleteUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

}
