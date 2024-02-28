import {
  Controller,
  Get,
  Query,
  Param
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import {
  FindAllResponse,
  FindOneResponse,
} from '../../common/dto/response.dto';
import { CategoryService } from './category.service';
import { Category } from 'src/models/category/category.schema';
import { FindAllQuery, Role, Roles } from 'src/common';

@Roles(Role.Client)
@ApiTags(swagger.MobileCategory)
@Controller('mobile/category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  async getAll(@Query() query: FindAllQuery) {
    const getAllCategoryResponse = new FindAllResponse<Category>();

    try {
      const categories = await this.categoryService.getAll(query);

      getAllCategoryResponse.success = true;
      getAllCategoryResponse.data = categories.data;
      getAllCategoryResponse.currentPage = categories.currentPage;
      getAllCategoryResponse.numberOfPages = categories.numberOfPages;
      getAllCategoryResponse.numberOfRecords = categories.numberOfRecords;
    } catch (error) {
      getAllCategoryResponse.success = false;
      throw error;
    }

    return getAllCategoryResponse;
  }

  @ApiOperation({ summary: 'Get category' })
  @Get(':categoryId')
  async getOne(@Param('categoryId') categoryId: string) {
    const getOneCategoryResponse = new FindOneResponse<Category>();

    try {
      const category = await this.categoryService.getOne(categoryId);
      getOneCategoryResponse.success = true;
      getOneCategoryResponse.data = category;

    } catch (error) {
      getOneCategoryResponse.success = false;
      throw error;
    }

    return getOneCategoryResponse;
  }


}




