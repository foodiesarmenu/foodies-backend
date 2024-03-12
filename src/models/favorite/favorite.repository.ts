import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Favorite, FavoriteDocument } from './favorite.schema';

export class FavoriteRepository extends AbstractRepository<Favorite> {
    constructor(
        @InjectModel(Favorite.name)
        private readonly favoriteModel: Model<FavoriteDocument>,
    ) {
        super(favoriteModel);
    }
}
