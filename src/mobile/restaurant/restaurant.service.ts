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

    public async getAll(query: FindAllQuery) {

        try {
            const restaurant = await this.restaurantRepository.getAll(
                { isDeleted: false },
                { populate: [{ path: 'category', select: 'name' }], ...query },
            );
            return restaurant;
        } catch (error) {
            this.handleError(error)
        }
    }

    public async getOne(id: string) {
        try {
            const restaurant = await this.restaurantRepository.getOne(
                {
                    _id: id,
                    isDeleted: false
                },
                {},
                {
                    populate: [{
                        path: 'category',
                        select: 'name'
                    }]
                },
            );
            return restaurant;
        } catch (error) {
            this.handleError(error)
        }
    }

    public async searchByName(name: string) {
        try {
            const restaurants = await this.restaurantRepository.getAll(
                {
                    isDeleted: false,
                    name: { $regex: name, $options: 'i' }
                },
                { populate: [{ path: 'category', select: 'name' }] },
            );
            return restaurants;
        } catch (error) {
            this.handleError(error)
        }
    }

    public async getAllByCategory(categoryId: string) {
        try {
            const restaurants = await this.restaurantRepository.getAll(
                {
                    isDeleted: false,
                    category: categoryId
                },
                { populate: [{ path: 'category', select: 'name' }] },
            );
            return restaurants;
        } catch (error) {
            this.handleError(error)
        }
    }


}
