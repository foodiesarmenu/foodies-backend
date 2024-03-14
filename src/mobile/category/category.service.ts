import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { CategoryRepository } from 'src/models/category/category.repository';


@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) { }
  private readonly logger = new Logger(CategoryService.name);
  handleError(error: any) {
    this.logger.error(error);
    throw error;
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
          isDeleted:false
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




}
