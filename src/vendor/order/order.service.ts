import { Injectable, Logger } from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { OrderRepository } from 'src/models';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) { }
    private readonly logger = new Logger(OrderService.name);

    handleError(error: any) {
        this.logger.error(error);
        throw error;
    }

    public async getAllOrders(query: FindAllQuery, restaurantId: string) {

        try {
            const orders = await this.orderRepository.getAll(
                {
                    restaurant: restaurantId,
                    isDeleted: false
                },
                {
                    populate: [{
                        path: 'userId',
                        select: '-password'
                    },
                    {
                        path: 'cartItems.meal',
                    },
                    ],
                    ...query
                },
            );
            return orders;
        } catch (error) {
            this.handleError(error)
        }
    }

    public async getOneOrder(orderId: string) {
        try {
            console.log(orderId);

            const order = await this.orderRepository.getOne(
                {
                    _id: orderId,
                }, {

            },
                {
                    populate: [{
                        path: 'userId',
                        select: '-password'
                    },
                    {
                        path: 'cartItems.meal',
                    },
                    ],

                },

            );
            console.log(order);

            return order;
        } catch (error) {
            this.handleError(error)
        }
    }


    public async updateOrder(orderId: string) {
        try {
            const order = await this.orderRepository.update(
                {
                    _id: orderId,
                    isDeleted: false
                },
                {
                    status: 'preparing'
                },
                {
                    new: true
                }
            );
            return order;
        } catch (error) {
            this.handleError(error)
        }
    }
}