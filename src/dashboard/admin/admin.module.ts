import { Module } from '@nestjs/common';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminFactoryService } from './factory/admin.factory';
import { CategoryModule } from './category/category.module'

@Module({
  imports: [UserMongoModule, CategoryModule],
  controllers: [AdminController],
  providers: [AdminService, AdminFactoryService],
  exports: [AdminService],
})
export class AdminModule { }
