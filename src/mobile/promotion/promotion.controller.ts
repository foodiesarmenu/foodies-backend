import { Controller, Get, Param } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { FindAllResponse, FindOneResponse } from 'src/common';
import { Promotion } from 'src/models';

@Controller('mobile/promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  async getAllPromotions() {
    const getPromotionsResponse = new FindAllResponse<Promotion>();

    try {
      const promotions = await this.promotionService.findAll(); 
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
