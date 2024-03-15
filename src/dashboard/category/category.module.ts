import { Module } from '@nestjs/common';

import { Category, CategoryRepository, CategorySchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryFactoryService } from './factory/category.factory';
import { CategoryController } from './category.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Category.name,
      schema: CategorySchema,
    },
  ]),
  MulterModule.register({
    storage: diskStorage({}),

  })],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule { }