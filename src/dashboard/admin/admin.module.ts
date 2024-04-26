import { Module } from '@nestjs/common';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminFactoryService } from './factory/admin.factory';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    UserMongoModule,
    MulterModule.register({
      storage: diskStorage({}),
    })
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminFactoryService],
  exports: [AdminService],
})
export class AdminModule { }
