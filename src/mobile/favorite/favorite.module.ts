import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteRepository, FavoriteSchema } from 'src/models';
import { FavoriteFactoryService } from './factory/favorite.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Favorite.name,
        schema: FavoriteSchema,
      },
    ]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, FavoriteRepository, FavoriteFactoryService],
  exports: [FavoriteService, FavoriteRepository, FavoriteFactoryService],
})
export class FavoriteModule { }
