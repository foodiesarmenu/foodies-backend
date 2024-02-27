import { Module } from '@nestjs/common';

import { Category, CategoryRepository, CategorySchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryFactoryService } from './factory/category.factory';
import { CategoryController } from './category.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Category.name,
      schema: CategorySchema,
    },
  ]),],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
})
export class RestaurantModule { }