import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UsePipes
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
import { PromotionFactoryService } from './factory/promotion.factory';
import { PromotionsService } from './promotions.service';
import { Promotion } from 'src/models/restaurant/promotion/promotion.schema';
import { CreatePromotionDto, UpdatePromotionDto } from './dto';
import { FindAllQuery, Role, Roles } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadInterceptor } from 'src/blocks/interceptors/image-upload.interceptor';

@Roles(Role.RESTAURANT)
@ApiTags(swagger.RestaurantPromotions)
@Controller('dashboard/vendor/promotion')
export class PromotionsController {
  constructor(
    private readonly promotionService: PromotionsService,
    private readonly promotionFactoryService: PromotionFactoryService,
  ) { }

  @ApiOperation({ summary: 'Register a new promotion' })
  @Post()
  @UseInterceptors(FileInterceptor('image'), new ImageUploadInterceptor('promotion'))
  async create(@Body() createPromotion: CreatePromotionDto) {
    const createPromotionResponse = new CreateResponse<Promotion>();

    try {
      const promotion = await this.promotionFactoryService.createNewPromotion(
        createPromotion,
      );

      const createdPromotion = await this.promotionService.create(promotion);
      createPromotionResponse.success = true;
      createPromotionResponse.data = createdPromotion;
    } catch (error) {
      createPromotionResponse.success = false;
      throw error;
    }

    return createPromotionResponse;
  }

  @ApiOperation({ summary: 'Get all promotions' })
  @Get()
  async getAll(@Query() query: FindAllQuery) {
    const getAllPromotionsResponse = new FindAllResponse<Promotion>();

    try {
      const promotions = await this.promotionService.getAll(query);
      getAllPromotionsResponse.success = true;
      getAllPromotionsResponse.data = promotions.data;
      getAllPromotionsResponse.currentPage = promotions.currentPage;
      getAllPromotionsResponse.numberOfPages = promotions.numberOfPages;
      getAllPromotionsResponse.numberOfRecords = promotions.numberOfRecords;
    } catch (error) {
      getAllPromotionsResponse.success = false;
      throw error;
    }

    return getAllPromotionsResponse;
  }

  @ApiOperation({ summary: 'Get specific promotion' })
  @Get(':promotionId')
  async getOne(@Param('promotionId') promotionId: string) {
    const getOnePromotionResponse = new FindOneResponse<Promotion>();

    try {
      const promotion = await this.promotionService.getOne(promotionId);
      getOnePromotionResponse.success = true;
      getOnePromotionResponse.data = promotion;

    } catch (error) {
      getOnePromotionResponse.success = false;
      throw error;
    }

    return getOnePromotionResponse;
  }

  @ApiOperation({ summary: 'Update promotion' })
  @Patch(':promotionId')
  async update(
    @Body() updatePromotionDto: UpdatePromotionDto,
    @Param('promotionId') promotionId: string,
  ) {
    const updatePromotionResponse = new UpdateResponse<Promotion>();
    try {
      const promotion =
        this.promotionFactoryService.updatePromotion(updatePromotionDto);

      const promotionUpdated = await this.promotionService.update(
        promotionId,
        promotion,
      );
      updatePromotionResponse.success = true;
      updatePromotionResponse.data = promotionUpdated;
    } catch (error) {
      updatePromotionResponse.success = false;
      throw error;
    }
    return updatePromotionResponse;
  }

  @ApiOperation({ summary: 'Delete promotion' })
  @Delete(':promotionId')
  async delete(@Param('promotionId') promotionId: string) {
    const deletePromotionResponse = new RemoveResponse();
    try {
      await this.promotionService.delete(promotionId);
      deletePromotionResponse.success = true;
    } catch (error) {
      deletePromotionResponse.success = false;
      throw error;
    }
    return deletePromotionResponse;
  }
}




