import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateCatDTO, UpdateCategoryDTO } from '../dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryFactoryService {
  async createNewCategory(createCatDTO: CreateCatDTO) {

    const category = new Category();
    category.name = createCatDTO.name;
    return category;
  }


  updateCategory(updatedCategory: UpdateCategoryDTO) {
    const updatedCat = new Category();
    updatedCat.name = updatedCategory.name;
    return updatedCat;
  }

}
