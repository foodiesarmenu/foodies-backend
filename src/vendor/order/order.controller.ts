import { Controller, Get, Param, Patch, Query, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { FindAllQuery, FindAllResponse, FindOneResponse, Role, Roles, swagger } from 'src/common';
import { Order } from 'src/models';
import { ApiTags } from '@nestjs/swagger';

@Roles(Role.RESTAURANT)
@ApiTags(swagger.RestaurantOrder)
@Controller('dashboard/vendor/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  async getAllOrders(
    @Request() req: Express.Request,
    @Query() query: FindAllQuery
  ) {

    const ordersResponse = new FindAllResponse<Order>();
    try {

      const orders = await this.orderService.getAllOrders(
        query,
        req.user['_id']
      );
      ordersResponse.success = true;
      ordersResponse.data = orders.data;
      ordersResponse.currentPage = orders.currentPage;
      ordersResponse.numberOfPages = orders.numberOfPages;
      ordersResponse.numberOfRecords = orders.numberOfRecords;
    } catch (error) {

      ordersResponse.success = false;
      throw error;
    }
    return ordersResponse;
  }

  @Get(':orderId')
  async getOneOrder(
    @Request() req: Express.Request,
    @Param('orderId') orderId: string
  ) {
    const orderResponse = new FindOneResponse<Order>();
    try {
      const order = await this.orderService.getOneOrder(orderId);
      orderResponse.success = true;
      orderResponse.data = order;
    } catch (error) {
      orderResponse.success = false;
      throw error;
    }

    return orderResponse;
  }

  @Patch(':orderId')
  async updateOrder(
    @Request() req: Express.Request,
    @Param('orderId') orderId: string
  ) {
    const updateOrderResponse = new FindOneResponse<Order>();
    try {
      const order = await this.orderService.updateOrder(orderId);
      updateOrderResponse.success = true;
      updateOrderResponse.data = order;
    } catch (error) {
      updateOrderResponse.success = false;
      throw error;
    }

    return updateOrderResponse;
  }
}
