import { Body, Controller, Post, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateResponse, Role, Roles, swagger } from 'src/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderFactoryService } from './factory/order.factory';
import { CreateOrderDto } from './dto';
import { Order } from 'src/models';

@Roles(Role.Client)
@ApiTags(swagger.MobileOrder)
@Controller('client/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderFactoryService: OrderFactoryService
  ) { }


  @Post('createCashOrder')
  async createCashOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req: Express.Request
  ) {
    const createOrderResponse = new CreateResponse<Order>();
    try {
      const order =
        await this.orderFactoryService.createNewOrder(createOrderDto,
          req.user['_id']);
      const orderCreated = await this.orderService.createCashOrder(order);
      createOrderResponse.success = true;
      createOrderResponse.data = orderCreated;
    } catch (error) {
      createOrderResponse.success = false;
      throw error;
    }

    return createOrderResponse;
  }

  @Post('createOnlineOrder')
  async createOnlineOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req: Express.Request
  ) {
    const createOrderResponse = new CreateResponse<Order>();
    try {
      const order =
        await this.orderFactoryService.createNewOrder(createOrderDto,
          req.user['_id']);
      const orderCreated = await this.orderService.createOnlineOrder(order,
        req.user
      );
      createOrderResponse.success = true;
      createOrderResponse.data = orderCreated;
    } catch (error) {
      createOrderResponse.success = false;
      throw error;
    }



    return createOrderResponse;
  }
}
