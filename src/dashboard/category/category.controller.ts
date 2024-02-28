import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import {
  CreateResponse,
  FindAllResponse,
  FindOneResponse,
  RemoveResponse,
  UpdateResponse
} from '../../common/dto/response.dto';
import { CategoryFactoryService } from './factory/category.factory';
import { CategoryService } from './category.service';
import { Category } from 'src/models/category/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { FindAllQuery, Role, Roles } from 'src/common';

@Roles(Role.ADMIN)
@ApiTags(swagger.AdminCategory)
@Controller('dashboard/admin/category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService,
  ) { }

  @ApiOperation({ summary: 'add new category' })
  @Post()
  async create(@Body() createNewCategory: CreateCategoryDto) {
    const createCategoryResponse = new CreateResponse<Category>();

    try {
      const category = await this.categoryFactoryService.createNewCategory(
        createNewCategory,
      );

      const createdCategory = await this.categoryService.create(category);
      createCategoryResponse.success = true;
      createCategoryResponse.data = createdCategory;
    } catch (error) {
      createCategoryResponse.success = false;
      throw error;
    }

    return createCategoryResponse;
  }

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

  @ApiOperation({ summary: 'Update category' })
  @Patch(':categoryId')
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('categoryId') categoryId: string,
  ) {
    const updateRestaurantResponse = new UpdateResponse<Category>();
    try {
      const category =
        this.categoryFactoryService.updateCategory(updateCategoryDto);

      const catUpdated = await this.categoryService.update(
        categoryId,
        category,
      );

      updateRestaurantResponse.success = true;
      updateRestaurantResponse.data = catUpdated;
    } catch (error) {
      updateRestaurantResponse.success = false;
      throw error;
    }
    return updateRestaurantResponse;
  }

  @ApiOperation({ summary: 'Delete category' })
  @Delete(':categoryId')
  async delete(@Param('categoryId') categoryId: string) {
    const deleteCategoryResponse = new RemoveResponse();
    try {
      await this.categoryService.delete(categoryId);

      deleteCategoryResponse.success = true;
    } catch (error) {
      deleteCategoryResponse.success = false;
      throw error;
    }
    return deleteCategoryResponse;
  }
}




