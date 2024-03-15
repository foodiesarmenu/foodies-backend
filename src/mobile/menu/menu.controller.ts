import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { FindAllResponse } from 'src/common';
import { Meal } from 'src/models';

@Controller('mobile/restaurant/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }


  @Get(':restaurantId')
  async getMenu(@Param('restaurantId') restaurantId: string) {
    const getMenuResponse = new FindAllResponse<Meal>();

    try {
      const menu = await this.menuService.findAll(restaurantId);
      getMenuResponse.success = true;
      getMenuResponse.data = menu.data;
      getMenuResponse.currentPage = menu.currentPage;
      getMenuResponse.numberOfPages = menu.numberOfPages;
      getMenuResponse.numberOfRecords = menu.numberOfRecords;
    } catch (error) {
      getMenuResponse.success = false;
      throw error;
    }
    return getMenuResponse;

  }
}
