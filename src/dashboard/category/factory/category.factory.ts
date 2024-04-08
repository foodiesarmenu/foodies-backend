import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryFactoryService {

 
  async createNewCategory(createCategoryDto: CreateCategoryDto) {

    const createCategory = new Category();
    createCategory.image = createCategoryDto.image;
    createCategory.name = createCategoryDto.name;
    createCategory.description = createCategoryDto.description;

    return createCategory;
  }


  updateCategory(updatedCategoryDto: UpdateCategoryDto) {
    const updatedCategory = new Category();
    updatedCategory.image = updatedCategoryDto.image;
    updatedCategory.name = updatedCategoryDto.name;
    updatedCategory.description = updatedCategoryDto.description;

    return updatedCategory;

  }
}
