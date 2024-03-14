import { Module } from '@nestjs/common';

import { Category, CategoryRepository, CategorySchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Category.name,
      schema: CategorySchema,
    },
  ]
  )
    ,],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule { }