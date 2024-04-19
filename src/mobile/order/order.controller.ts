import { Body, Controller, Headers, Post, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateResponse, Public, Role, Roles, swagger } from 'src/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderFactoryService } from './factory/order.factory';
import { CreateOrderDto } from './dto';
import { Order } from 'src/models';
import { Request as ExpressRequest } from 'express';
@ApiTags(swagger.MobileOrder)
@Controller('client/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderFactoryService: OrderFactoryService
  ) { }

  @Roles(Role.Client)
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

  @Roles(Role.Client)
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


  @Public()
  @Post('webhook')
  async handleStripeWebhook(
    @Body() request: ExpressRequest,
    @Headers('stripe-signature') stripeSignature: string
  ) {
    return await this.orderService.handleStripeWebhook(Buffer.from(JSON.stringify(request)), stripeSignature);
  }
}
