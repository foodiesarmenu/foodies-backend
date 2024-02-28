import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryFactoryService {
  async createNewCategory(createCatDTO: CreateCategoryDto) {

    const category = new Category();
    category.image = createCatDTO.image;
    category.name = createCatDTO.name;
    category.description = createCatDTO.description;

    return category;
  }


  updateCategory(updatedCategory: UpdateCategoryDto) {
    const updatedCat = new Category();
    updatedCat.image = updatedCategory.image;
    updatedCat.name = updatedCategory.name;
    updatedCat.description = updatedCategory.description;

    return updatedCat;
  }
}
