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
import { swagger } from '../../../common/constants/swagger.constant';
import {
  CreateResponse,
  FindAllResponse,
  FindOneResponse,
  RemoveResponse,
  UpdateResponse
} from '../../../common/dto/response.dto';
import { CategoryFactoryService } from './factory/category.factory';
import { CategoryService } from './category.service';
import { Category } from 'src/models/category/category.schema';
import { CreateCatDTO, UpdateCategoryDTO } from './dto';
import { FindAllQuery, Role, Roles } from 'src/common';

@Roles(Role.ADMIN)
@ApiTags(swagger.AdminCategory)
@Controller('dashboard/admin/category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService,
  ) { }

  @ApiOperation({ summary: 'add a new category' })
  @Post()
  async create(@Body() createNewCat: CreateCatDTO) {
    const createCatResponse = new CreateResponse<Category>();

    try {
      const cat = await this.categoryFactoryService.createNewCategory(
        createNewCat,
      );

      const createdCat = await this.categoryService.create(cat);
      createCatResponse.success = true;
      createCatResponse.data = createdCat;
    } catch (error) {
      createCatResponse.success = false;
      throw error;
    }

    return createCatResponse;
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  async getAll(@Query() query: FindAllQuery) {
    const getAllCatResponse = new FindAllResponse<Category>();

    try {
      const cats = await this.categoryService.getAll(query);
      getAllCatResponse.success = true;
      getAllCatResponse.data = cats.data;
      getAllCatResponse.currentPage = cats.currentPage;
      getAllCatResponse.numberOfPages = cats.numberOfPages;
      getAllCatResponse.numberOfRecords = cats.numberOfRecords;
    } catch (error) {
      getAllCatResponse.success = false;
      throw error;
    }

    return getAllCatResponse;
  }

  @ApiOperation({ summary: 'Get specific category' })
  @Get(':catId')
  async getOne(@Param('catId') catId: string) {
    const getOneCatResponse = new FindOneResponse<Category>();

    try {
      const cat = await this.categoryService.getOne(catId);
      getOneCatResponse.success = true;
      getOneCatResponse.data = cat;

    } catch (error) {
      getOneCatResponse.success = false;
      throw error;
    }

    return getOneCatResponse;
  }

  @ApiOperation({ summary: 'Update category' })
  @Patch(':catId')
  async update(
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @Param('catId') catId: string,
  ) {
    const updatecatIdResponse = new UpdateResponse<Category>();
    try {
      const cat =
        this.categoryFactoryService.updateCategory(updateCategoryDTO);

      const catUpdated = await this.categoryService.update(
        catId,
        cat,
      );
      updatecatIdResponse.success = true;
      updatecatIdResponse.data = catUpdated;
    } catch (error) {
      updatecatIdResponse.success = false;
      throw error;
    }
    return updatecatIdResponse;
  }

  @ApiOperation({ summary: 'Delete category' })
  @Delete(':catId')
  async delete(@Param('catId') catId: string) {
    const deleteCatResponse = new RemoveResponse();
    try {
      await this.categoryService.delete(catId);
      deleteCatResponse.success = true;
    } catch (error) {
      deleteCatResponse.success = false;
      throw error;
    }
    return deleteCatResponse;
  }
}




