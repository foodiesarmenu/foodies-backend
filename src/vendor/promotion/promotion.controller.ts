import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseInterceptors
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateResponse, FindAllQuery, FindAllResponse, Role, Roles, swagger, UpdateResponse } from 'src/common';
import { PromotionFactoryService } from './factory/promotion.factory';
import { Promotion } from 'src/models';
import { createPromotionDto, UpdatePromotionDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadInterceptor } from 'src/blocks/interceptors/image-upload.interceptor';

Roles(Role.RESTAURANT)
@ApiTags(swagger.RestaurantPromotion)
@Controller('dashboard/restaurant/promotion')
export class PromotionController {
  constructor(
    private readonly promotionService: PromotionService,
    private readonly promotionFactoryService: PromotionFactoryService,
  ) { }


  @ApiOperation({ summary: 'Create new promotion' })
  @Post()
  @UseInterceptors(FileInterceptor('image'), new ImageUploadInterceptor('promotion'))
  async create(
    @Body() createPromotionDto: createPromotionDto,
    @Request() req: Express.Request,
  ) {
    const createPromotionResponse = new CreateResponse<Promotion>();
    try {
      const promotion =
        await this.promotionFactoryService.createNewPromotion(
          createPromotionDto,
          req.user['_id']
        );

      const createdPromotion = await this.promotionService.create(promotion);
      createPromotionResponse.success = true;
      createPromotionResponse.data = createdPromotion.data;
    } catch (error) {
      createPromotionResponse.success = false;
      throw error;
    }

    return createPromotionResponse;
  }

  @ApiOperation({ summary: 'Get all promotions' })
  @Get()
  async getAllPromotions(
    @Query() query: FindAllQuery,
    @Request() req: Express.Request
  ) {
    const findAllResponse = new FindAllResponse<Promotion>();
    try {
      const promotions = await this.promotionService.getAllPromotions(
        query,
        req.user['_id']
      );
      findAllResponse.success = true;
      findAllResponse.data = promotions.data;
      findAllResponse.currentPage = promotions.currentPage;
      findAllResponse.numberOfPages = promotions.numberOfPages;
      findAllResponse.numberOfRecords = promotions.numberOfRecords;
    } catch (error) {
      findAllResponse.success = false;
      throw error;
    }

    return findAllResponse;
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


}
