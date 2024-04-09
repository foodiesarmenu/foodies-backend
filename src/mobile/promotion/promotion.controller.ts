import { Controller, Get, Param, Query } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { FindAllQuery, FindAllResponse, FindOneResponse, Role, Roles, swagger } from 'src/common';
import { Promotion } from 'src/models';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

Roles(Role.Client)
@ApiTags(swagger.MobilePromotion)
@Controller('mobile/promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) { }

  @ApiOperation({ summary: 'Get All promotion ' })
  @Get()
  async getAllPromotions(@Query() query: FindAllQuery) {
    const getPromotionsResponse = new FindAllResponse<Promotion>();

    try {
      const promotions = await this.promotionService.findAll(query);
      getPromotionsResponse.success = true;
      getPromotionsResponse.data = promotions.data;
      getPromotionsResponse.currentPage = promotions.currentPage;
      getPromotionsResponse.numberOfPages = promotions.numberOfPages;
      getPromotionsResponse.numberOfRecords = promotions.numberOfRecords;
    } catch (error) {
      getPromotionsResponse.success = false;
      throw error;
    }
    return getPromotionsResponse;
  }
}
