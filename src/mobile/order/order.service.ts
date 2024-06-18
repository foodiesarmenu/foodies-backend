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


            console.log('createOrderDto', createOrderDto);

            const order = await this.orderRepository.create({
                userId: createOrderDto.userId,
                cartItems: cart.cartItems,
                restaurant: cart.restaurant,
                status: 'pending',
                paymentMethod: 'cash',
                noOfCartItems: cart.noOfCartItems,
                discount: cart.discount,
                cartTotalPrice: cart.cartTotalPrice,
                totalPriceAfterDiscount: cart.totalPriceAfterDiscount,
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
                        path: 'cartItems.meal',

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
    async createOnlineOrder(createOrderDto: Order) {

        try {
            const cart = await this.cartRepository.getOne({
                userId: createOrderDto.userId,
            });

            if (!cart) {
                throw new NotFoundException(message.cart.NotFound);
            }


            console.log('createOrderDto', createOrderDto);

            const order = await this.orderRepository.create({
                userId: createOrderDto.userId,
                cartItems: cart.cartItems,
                restaurant: cart.restaurant,
                status: 'pending',
                paymentMethod: 'card',
                noOfCartItems: cart.noOfCartItems,
                discount: cart.discount,
                cartTotalPrice: cart.cartTotalPrice,
                totalPriceAfterDiscount: cart.totalPriceAfterDiscount,
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
                        path: 'cartItems.meal',

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


    // async createOnlineOrder(order: Order, user: any) {
    //     try {
    //         const cart = await this.cartRepository.getOne({ userId: order.userId }
    //             , {},
    //             {
    //                 populate: [
    //                     {
    //                         path: 'cartItems.meal',
    //                     },
    //                     {
    //                         path: 'restaurant',
    //                         select: '-password -category'
    //                     }
    //                 ],
    //                 lean: false
    //             }
    //         );

    //         if (!cart) {
    //             throw new NotFoundException(message.cart.NotFound);
    //         }

    //         const totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.cartTotalPrice;

    //         const session = await this.stripe.checkout.sessions.create({
    //             payment_method_types: ['card'],
    //             line_items: [
    //                 {
    //                     price_data: {
    //                         currency: 'usd',
    //                         unit_amount: totalPrice * 100, // Convert to cents
    //                         product_data: {
    //                             name: cart.restaurant['name'],
    //                             images: [cart.restaurant['image']],
    //                         },

    //                     },
    //                     quantity: 1,
    //                 },
    //             ],
    //             mode: 'payment',
    //             success_url: `https://www.google.com/`,
    //             cancel_url: `https://www.yahoo.com/`,
    //             customer_email: user.email,
    //             client_reference_id: cart._id.toString(),
    //             metadata: {
    //                 ...order.deliveryAddress,
    //             }
    //         });

    //         return session;
    //     } catch (error) {
    //         this.handleError(error);
    //     }
    // }

    async getOrders(query: FindAllQuery, userId: string) {
        try {
            const orders = await this.orderRepository.getAll(
                {
                    userId: userId,
                    isDeleted: false
                },
                {
                    ...query,
                    populate: [
                        {
                            path: 'cartItems.meal',
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
            const order = await this.orderRepository.getOne(
                {
                    _id: orderId,
                    isDeleted: false
                },
                {},
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

                }
            );
            if (!order) {
                throw new NotFoundException(message.order.NotFound);
            }
            return order;
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
                    cartItems: cart.cartItems,
                    restaurant: cart.restaurant,
                    status: 'pending',
                    paymentMethod: 'card',
                    noOfCartItems: cart.noOfCartItems,
                    discount: cart.discount,
                    cartTotalPrice: cart.cartTotalPrice,
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


    async reOrder(orderId: string, userId: string) {
        try {
            const order = await this.orderRepository.getOne(
                {
                    _id: orderId,
                    isDeleted: false
                },
                {},
                {
                }
            );

            if (!order) {
                throw new NotFoundException(message.order.NotFound);
            }

            const cart = await this.cartRepository.create({
                userId: order.userId,
                cartItems: order.cartItems,
                restaurant: order.restaurant,
                noOfCartItems: order.noOfCartItems,
                discount: order.discount,
                cartTotalPrice: order.cartTotalPrice,
                totalPriceAfterDiscount: order.totalPriceAfterDiscount,
            });


            return await this.cartRepository.getOne({
                userId: userId,
                isDeleted: false
            }, {}, {
                populate: [
                    {
                        path: 'cartItems.meal',
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
}
