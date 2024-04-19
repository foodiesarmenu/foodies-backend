import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartRepository, CartSchema, Order, OrderRepository, OrderSchema } from 'src/models';
import { OrderFactoryService } from './factory/order.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Cart.name,
        schema: CartSchema,
      }
    ],
    ),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, CartRepository, OrderFactoryService],
  exports: [OrderService, OrderRepository, CartRepository, OrderFactoryService]
})
export class OrderModule { }
