import { Module } from '@nestjs/common';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';
import { ClientService } from './client.service';
import { ClientFactoryService } from './factory/client.factory';
import { ClientController } from './client.controller';

@Module({
  imports: [UserMongoModule],
  controllers: [ClientController],
  providers: [ClientService, ClientFactoryService],
  exports: [ClientService],
})
export class ClientModule { }
