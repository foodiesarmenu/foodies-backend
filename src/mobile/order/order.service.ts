import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { message } from 'src/common/constants/message.constant';
import { CartRepository, Order, OrderRepository } from 'src/models';
import Stripe from 'stripe';
@Injectable()
export class OrderService {
    public readonly stripe: Stripe;
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly cartRepository: CartRepository,

    ) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });
    }

    private readonly logger = new Logger(OrderService.name);

    handleError(error: any) {
        this.logger.error(error);
        throw error;
    }

    async createCashOrder(createOrderDto: Order) {

        try {
            const cart = await this.cartRepository.getOne({
                userId: createOrderDto.userId,
            });

            if (!cart) {
                throw new NotFoundException(message.cart.NotFound);
            }

            const totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.cartTotalPrice

            console.log('createOrderDto', createOrderDto);

            const order = await this.orderRepository.create({
                userId: createOrderDto.userId,
                orderItems: cart.cartItems,
                restaurant: cart.restaurant,
                status: 'pending',
                paymentMethod: 'cash',
                noOfOrderItems: cart.noOfCartItems,
                discount: cart.discount,
                orderTotalPrice: cart.cartTotalPrice,
                totalPriceAfterDiscount: totalPrice,
                deliveryAddress: createOrderDto.deliveryAddress,
            });

            if (order) {
                await this.cartRepository.delete({
                    userId: createOrderDto.userId,
                });
            }
            return await this.orderRepository.getOne({ _id: order._id }, {}, {
                populate: [
                    {
                        path: 'orderItems.meal',

                    },
                    {
                        path: 'restaurant',
                        select: '-password -category'
                    }
                ]
            });
        } catch (error) {
            this.handleError(error);
        }
    }



    async createOnlineOrder(order: Order, user: any) {
        try {
            const cart = await this.cartRepository.getOne({ userId: order.userId }
                , {},
                {
                    populate: [
                        {
                            path: 'cartItems.meal',
                        },
                        {
                            path: 'restaurant',
                            select: '-password -category'
                        }
                    ],
                    lean: false
                }
            );

            if (!cart) {
                throw new NotFoundException(message.cart.NotFound);
            }

            const totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.cartTotalPrice;

            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            unit_amount: totalPrice * 100, // Convert to cents
                            product_data: {
                                name: cart.restaurant['name'],
                                images: [cart.restaurant['image']],
                            },

                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `https://www.google.com/`,
                cancel_url: `https://www.yahoo.com/`,
                customer_email: user.email,
                client_reference_id: cart._id.toString(),
                metadata: {
                    ...order.deliveryAddress,
                }
            });

            return session;
        } catch (error) {
            this.handleError(error);
        }
    }


}
