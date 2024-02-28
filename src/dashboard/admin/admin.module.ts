import { Module } from '@nestjs/common';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminFactoryService } from './factory/admin.factory';

@Module({
  imports: [UserMongoModule],
  controllers: [AdminController],
  providers: [AdminService, AdminFactoryService],
  exports: [AdminService],
})
export class AdminModule { }
