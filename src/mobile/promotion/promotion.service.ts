import { Injectable, Logger } from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { PromotionRepository } from 'src/models';

@Injectable()
export class PromotionService {
  constructor(
    private readonly promotionRepository: PromotionRepository
  ) { }

  private readonly logger = new Logger(PromotionService.name);

  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  async findAll(query: FindAllQuery) {
    try {
      const promotions = await this.promotionRepository.getAll(
        {
          isActive: true,
          isDeleted: false
        },
        query
      );
      return promotions;
    } catch (error) {
      this.handleError(error);
    }
  }
}
