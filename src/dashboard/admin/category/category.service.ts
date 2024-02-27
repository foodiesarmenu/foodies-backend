import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { omit } from 'lodash';
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


  public async create(cat: Category) {
    try {
      const exist = await this.categoryRepository.exists({
        $or: [
          { _id: cat._id }
        ],
      });

      if (exist) {
        throw new ConflictException(message.category.AlreadyExists);
      }

      const createdCategory = await this.categoryRepository.create(cat);


      if (!createdCategory) {
        throw new BadRequestException(message.restaurant.FailedToCreate);
      }

      return omit(createdCategory, ['password']) as unknown as Category;
    } catch (error) {
      this.handleError(error);
    }
  }


  public async getAll(query: FindAllQuery) {
    try {
      const cats = await this.categoryRepository.getAll(
        query
      );
      return cats;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getOne(catId: string) {
    try {
      const cat = await this.categoryRepository.getOne(
        {
          _id: catId
        }
      );

      if (!cat) {
        throw new BadRequestException(message.category.NotFound);
      }

      return cat;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(catId: string, category: Category) {
    try {

      const isExist = await this.categoryRepository.exists({
        _id: catId
      });

      if (!isExist) throw new NotFoundException(message.category.NotFound);

      const categoryUpdated = await this.categoryRepository.update(
        { _id: catId },
        category,
        { new: true },
      );

      return categoryUpdated;
    }
    catch (error) {
      this.handleError(error);
    }
  }

  public async delete(catId: string) {
    try {
      const isExist = await this.categoryRepository.exists({
        _id: catId
      });

      if (!isExist) throw new NotFoundException(message.category.NotFound);

      const catDeleted = await this.categoryRepository.update(
        { _id: catId },
        { isDeleted: true },
        { new: true },
      );

      return catDeleted;
    }
    catch (error) {
      this.handleError(error);
    }
  }

}
