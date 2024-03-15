import { Injectable, Logger } from '@nestjs/common';
import { MealRepository } from 'src/models';

@Injectable()
export class MenuService {
    constructor(
        private readonly mealRepository: MealRepository
    ) { }

    private readonly logger = new Logger(MenuService.name);

    handleError(error: any) {
        this.logger.error(error);
        throw error;
    }


    async findAll(restaurantId: string) {
        try {
            const meals = await this.mealRepository.getAll({
                restaurant: restaurantId,
                isDeleted: false
            });

            const categories = {};

            meals.data.forEach(meal => {
                meal.tags.forEach(tag => {
                    if (!categories[tag]) {
                        categories[tag] = {
                            name: tag,
                            description: `Meals tagged with ${tag}`,
                            meals: [],
                        };
                    }
                    categories[tag].meals.push(meal);
                });
            });

            meals.data = Object.values(categories);
            return meals


        } catch (error) {
            this.handleError(error);
        }
    }
}
