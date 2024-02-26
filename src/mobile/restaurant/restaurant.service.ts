import { Injectable, Logger } from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { RestaurantRepository } from 'src/models';

@Injectable()
export class RestaurantService {
    constructor(
        private readonly restaurantRepository: RestaurantRepository
    ) { }
    private readonly logger = new Logger(RestaurantService.name);

    handleError(error: any) {
        this.logger.error(error);
        throw error;
    }

    getAll(query: FindAllQuery) {
        try {
            const restaurant = this.restaurantRepository.getAll(
                { isDeleted: false },
                query
            );
            return restaurant;
        } catch (error) {
            this.handleError(error)
        }
    }

}
