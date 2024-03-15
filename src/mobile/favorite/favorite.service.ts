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
            return await this.favoriteRepository.create(favorite);
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

    async delete(id: string, userId: string) {
        try {
            return await this.favoriteRepository.update(
                {
                    _id: id,
                    user: userId
                },
                { isDeleted: true },
                { new: true }
            );
        } catch (error) {
            this.handleError(error);
        }
    }
}
