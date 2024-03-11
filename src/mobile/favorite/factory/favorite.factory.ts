import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from '../dto';
import { Favorite } from '../entities/favorite.entity';
import { Types } from 'mongoose';

@Injectable()
export class FavoriteFactoryService {
    async createNewFavorite(createFavoriteDto: CreateFavoriteDto, userId: Types.ObjectId) {
        const favorite = new Favorite();
        favorite.user = userId;
        favorite.restaurant = createFavoriteDto.restaurant;

        return favorite;
    }
}