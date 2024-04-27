import { Injectable, Logger, NotFoundException, RawBodyRequest } from '@nestjs/common';
import { FindAllQuery } from 'src/common';
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

    
    async getOrders(query: FindAllQuery) {
        try {
            const orders = await this.orderRepository.getAll(
                { isDeleted: false },
                {
                    ...query,
                    populate: [
                        {
                            path: 'orderItems.meal',
                        },
                        {
                            path: 'restaurant',
                            select: '-password -category'
                        }
                    ],
                }
            );
            return orders;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getOrderById(orderId: string) {
        try {
            return await this.orderRepository.getOne(
                { _id: orderId, isDeleted: false },
                {},
                {
                    populate: [
                        {
                            path: 'orderItems.meal',
                        },
                        {
                            path: 'restaurant',
                            select: '-password -category'
                        }
                    ],

                }
            );
        } catch (error) {
            this.handleError(error);
        }
    }


    async handleStripeWebhook(requestBody: RawBodyRequest<Request>, stripeSignature: string) {
        try {
            console.log('requestBodyasdasdasdasdasd', requestBody.rawBody);
            console.log('stripeSignatureasd', stripeSignature);

            console.log('process.env.STRIPE_WEBHOOK_SECRET', process.env.STRIPE_WEBHOOK_SECRET);

            const event = this.stripe.webhooks.constructEvent(
                requestBody.rawBody,
                stripeSignature,
                process.env.STRIPE_WEBHOOK_SECRET
            );


            if (event.type === 'checkout.session.completed') {
                const session = event.data.object as Stripe.Checkout.Session;
                const cartId = session.client_reference_id;
                const cart = await this.cartRepository.getOne({ _id: cartId });

                if (!cart) {
                    throw new NotFoundException(message.cart.NotFound);
                }

                const order = await this.orderRepository.create({
                    userId: cart.userId,
                    orderItems: cart.cartItems,
                    restaurant: cart.restaurant,
                    status: 'pending',
                    paymentMethod: 'card',
                    noOfOrderItems: cart.noOfCartItems,
                    discount: cart.discount,
                    orderTotalPrice: cart.cartTotalPrice,
                    totalPriceAfterDiscount: cart.totalPriceAfterDiscount,
                    deliveryAddress: {
                        firstAddress: session.metadata.firstAddress,
                        secondAddress: session.metadata.secondAddress,
                        buildingNumber: session.metadata.buildingNumber,
                        streetName: session.metadata.streetName,
                        floorNumber: session.metadata.floorNumber,
                    },
                });
                await this.cartRepository.delete({ _id: cartId });

                return order;
            }
        } catch (error) {
            this.handleError(error);
        }
    }
}