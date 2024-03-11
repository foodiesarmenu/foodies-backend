

import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from '../dto';
import { Favorite } from '../entities/favorite.entity';

@Injectable()
export class FavoriteFactoryService {
    async createNewFavorite(createFavoriteDto: CreateFavoriteDto) {

        const favorite = new Favorite();
        createFavoriteDto.userId = favorite.userId;
        createFavoriteDto.restaurantId = favorite.restaurantId;
        
        return Favorite;
    }



}
