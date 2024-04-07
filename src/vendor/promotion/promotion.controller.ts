import { Controller } from '@nestjs/common';
import { PromotionService } from './promotion.service';

@Controller('dashboard/restaurant/promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}
}
