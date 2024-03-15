import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { Category } from 'src/models/category/category.schema';
import { CategoryRepository } from 'src/models/category/category.repository';


@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) { }

  private readonly logger = new Logger(CategoryService.name);


  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }


  public async create(category: Category) {
    try {
      const exist = await this.categoryRepository.exists({
        name: category.name
      });

      if (exist) {
        throw new ConflictException(message.category.AlreadyExists);
      }

      const createdCategory = await this.categoryRepository.create(category);


      if (!createdCategory) {
        throw new BadRequestException(message.category.FailedToCreate);
      }

      return createdCategory;
    } catch (error) {
      this.handleError(error);
    }
  }


  public async getAll(query: FindAllQuery) {
    try {
      const categories = await this.categoryRepository.getAll(
        { isDeleted: false },
        query
      );
      return categories;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getOne(categoryId: string) {
    try {
      const category = await this.categoryRepository.getOne(
        {
          _id: categoryId,
          isDeleted: false
        }
      );

      if (!category) {
        throw new BadRequestException(message.category.NotFound);
      }

      return category;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(categoryId: string, category: Category) {
    try {

      const isExist = await this.categoryRepository.exists({
        _id: categoryId
      });

      if (!isExist) throw new NotFoundException(message.category.NotFound);

      const categoryUpdated = await this.categoryRepository.update(
        { _id: categoryId },
        category,
        { new: true },
      );

      return categoryUpdated;
    }
    catch (error) {
      this.handleError(error);
    }
  }

  public async delete(categoryId: string) {
    try {
      const isExist = await this.categoryRepository.exists({
        _id: categoryId
      });

      if (!isExist) throw new NotFoundException(message.category.NotFound);

      const categoryDeleted = await this.categoryRepository.update(
        { _id: categoryId },
        { isDeleted: true },
        { new: true },
      );

      return categoryDeleted;
    }
    catch (error) {
      this.handleError(error);
    }
  }

}
