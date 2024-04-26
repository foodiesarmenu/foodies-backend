import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Order, OrderDocument } from './order.schema';

export class OrderRepository extends AbstractRepository<Order> {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDocument>,
    ) {
        super(orderModel);
    }
}
