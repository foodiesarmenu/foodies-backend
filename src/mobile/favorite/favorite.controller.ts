import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Request
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import {
  CreateResponse,
  FindAllResponse,
} from '../../common/dto/response.dto';
import { FavoriteFactoryService } from './factory/favorite.factory';
import { FavoriteService } from './favorite.service';
import { Favorite } from 'src/models/favorite/favorite.schema';
import { CreateFavoriteDto } from './dto';
import { FindAllQuery, Role, Roles } from 'src/common';

@Roles(Role.Client)
@ApiTags(swagger.MobileFavorite)
@Controller('mobile/favorite')
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly favoriteFactoryService: FavoriteFactoryService,
  ) { }

  @ApiOperation({ summary: 'Add restaurant to favorite ' })
  @Post()
  async create(
    @Body() createNewFavoriteDto: CreateFavoriteDto,
    @Request() req: Express.Request
  ) {
    const createFavoriteResponse = new CreateResponse<Favorite>();

    try {
      const favorite = await this.favoriteFactoryService.createNewFavorite(
        createNewFavoriteDto,
        req.user['_id']
      );

      const createdFavorite = await this.favoriteService.create(favorite);
      createFavoriteResponse.success = true;
      createFavoriteResponse.data = createdFavorite;
    } catch (error) {
      createFavoriteResponse.success = false;
      throw error;
    }

    return createFavoriteResponse;
  }

  @ApiOperation({ summary: 'Get all favorites' })
  @Get()
  async getAll(
    @Query() query: FindAllQuery,
    @Request() req: Express.Request
  ) {
    const getAllFavoritesResponse = new FindAllResponse<Favorite>();

    try {
      const favorites = await this.favoriteService.getAll(query, req.user['_id']);
      getAllFavoritesResponse.success = true;
      getAllFavoritesResponse.data = favorites.data;
      getAllFavoritesResponse.currentPage = favorites.currentPage;
      getAllFavoritesResponse.numberOfPages = favorites.numberOfPages;
      getAllFavoritesResponse.numberOfRecords = favorites.numberOfRecords;
    } catch (error) {
      getAllFavoritesResponse.success = false;
      throw error;
    }

    return getAllFavoritesResponse;
  }


  @ApiOperation({ summary: 'Is Favorite' })
  @Get('is-favorite/:restaurantId')
  async isFavorite(
    @Param('restaurantId') restaurantId: string,
    @Request() req: Express.Request
  ) {
    const isFavoriteResponse = new CreateResponse<boolean>();

    try {
      const isFavorite = await this.favoriteService.isFavorite(restaurantId, req.user['_id']);
      isFavoriteResponse.success = isFavorite;
    } catch (error) {
      isFavoriteResponse.success = false;
      throw error;
    }

    return isFavoriteResponse;
  }

}




