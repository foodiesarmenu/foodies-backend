import { Injectable, Logger } from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { Favorite, FavoriteRepository } from 'src/models';

@Injectable()
export class FavoriteService {
    constructor(private favoriteRepository: FavoriteRepository) { }

    private readonly logger = new Logger(FavoriteService.name);

    handleError(error: any) {
        this.logger.error(error);
        throw error;
    }

    async create(favorite: Favorite) {
        try {
            console.log(favorite, 'favorite');

            const isExist = await this.favoriteRepository.getOne({
                restaurant: favorite.restaurant,
                user: favorite.user
            });
            console.log(isExist, 'isExist');

            if (isExist) {
                return await this.favoriteRepository.delete(
                    {
                        _id: isExist._id
                    }
                );
            }

            const favoriteCreated = await this.favoriteRepository.create(favorite);

            return await this.favoriteRepository.getOne({
                _id: favoriteCreated._id
            },
                {},
                {
                    populate: [
                        {
                            path: 'restaurant',
                            select: '-password -category'
                        }
                    ]
                }
            );
        } catch (error) {
            this.handleError(error);
        }
    }

    async getAll(query: FindAllQuery, userId: string) {
        try {
            const favorites = await this.favoriteRepository.getAll(
                {
                    user: userId,
                    isDeleted: false
                },
                {
                    populate: [{
                        path: 'restaurant',
                        select: '-password '
                    }], ...query
                }
            );
            console.log(favorites, 'favorites');

            return favorites;
        } catch (error) {
            this.handleError(error);
        }
    }


}
