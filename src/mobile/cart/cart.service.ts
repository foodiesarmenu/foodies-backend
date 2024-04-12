import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { Category } from 'src/models/category/category.schema';
import { CartRepository } from 'src/models/cart/cart.repository';
import { Cart } from 'src/models/cart/cart.schema';
import { MealRepository } from 'src/models';
import { log } from 'console';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
    constructor(
        private cartRepository: CartRepository,
        private mealRepository: MealRepository
    ) { }

    private readonly logger = new Logger(CartService.name);

    handleError(error: any) {
        this.logger.error(error);
        throw error;
    }

    async findMealById(id: Types.ObjectId) {
        const meal = await this.mealRepository.getOne({ _id: id });
        if (!meal) {
            throw new NotFoundException(message.meal.NotFound);
        }
        return meal;
    }

    async findCartByUserId(userId: Types.ObjectId) {
        return this.cartRepository.getOne({
            userId: userId,
            isDeleted: false
        });
    }

    calcTotalPrice(cart: Cart) {
        let totalPrice = 0;
        cart.cartItems.forEach(meal => {
            totalPrice += meal.quantity * meal.price;
        });
        return cart.totalPrice = totalPrice;
    }

    async addMealToCart(cart: Cart) {
        try {
            const meal = await this.findMealById(cart.cartItems[0].meal);
            cart.cartItems[0].price = meal.price;

            let cartExist = await this.findCartByUserId(cart.userId);

            if (!cartExist) {
                const cartCreated = await this.cartRepository.create({
                    userId: cart.userId,
                    cartItems: cart.cartItems,
                    restaurantId: cart.restaurantId
                });
                await this.cartRepository.update(
                    { _id: cartCreated._id },
                    { totalPrice: this.calcTotalPrice(cartCreated) },
                    { new: true });

                return cartCreated;
            }

            const item = cartExist.cartItems.find(item => item.meal.toString() === cart.cartItems[0].meal.toString());

            if (item) {
                item.quantity += cart.cartItems[0].quantity || 1;
            } else {
                cartExist.cartItems.push({ ...cart.cartItems[0], quantity: cart.cartItems[0].quantity || 1 });
            }

            this.calcTotalPrice(cartExist);

            if (cartExist.discount) {
                cartExist.totalPriceAfterDiscount = cartExist.totalPrice - (cartExist.totalPrice * cartExist.discount) / 100;
            }

            const updatedCart = await this.cartRepository.update(
                { _id: cartExist._id },
                cartExist,
                { new: true },
            );
            return updatedCart;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getCart(userId: Types.ObjectId) {
        try {
            const cart = await this.cartRepository.getOne({
                userId: userId,
                isDeleted: false
            }, {}, {
                populate: [
                    {
                        path: 'cartItems.meal',
                    },
                    {
                        path: 'restaurantId',
                        select: '-password'
                    }
                ]
            });
            if (!cart) {
                throw new NotFoundException(message.cart.NotFound);
            }
            return cart;
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateMealQuantity(MealId: string, userId: string, updateCartDTO: number) {
        try {
            const mealExist = await this.findMealById(new Types.ObjectId(MealId));
            console.log(updateCartDTO, 'updateCartDTO');

            if (!mealExist) {
                throw new NotFoundException(message.meal.NotFound);
            }

            let existCart = await this.cartRepository.getOne({ userId: userId })

            const item = existCart.cartItems.find(item => item.meal.toString() == MealId.toString());

            if (item) {
                item.quantity = updateCartDTO['quantity']
            }


            existCart.totalPrice = this.calcTotalPrice(existCart);

            if (existCart.discount) {
                existCart.totalPriceAfterDiscount = existCart.totalPrice - (existCart.totalPrice * existCart.discount) / 100 //NOTE - 100-(100*50)/100
            }

            const updatedCart = await this.cartRepository.update(
                { _id: existCart._id },
                existCart,
                { new: true },
            );

            return updatedCart
        } catch (error) {
            this.handleError(error);
        }
    }

    async removeMealFromCart(MealId: string, userId: Types.ObjectId) {
        try {
            log(MealId, userId);
            let cartExist = await this.findCartByUserId(userId);

            if (!cartExist) {
                throw new NotFoundException(message.cart.NotFound);
            }

            const deleteMeal = await this.cartRepository.update(
                { _id: cartExist._id },
                { $pull: { cartItems: { _id: MealId } } },
                { new: true },
            );

            cartExist = await this.findCartByUserId(userId);
            console.log(cartExist, 'cartExist');

            if (!deleteMeal) {
                throw new NotFoundException(message.meal.NotFound);
            }

            await this.cartRepository.update(
                { _id: cartExist._id },
                { totalPrice: this.calcTotalPrice(cartExist) },
                { new: true });

            if (cartExist.discount) {
                cartExist.totalPriceAfterDiscount = cartExist.totalPrice - (cartExist.totalPrice * cartExist.discount) / 100;
            }

            const updatedCart = await this.cartRepository.update(
                { _id: cartExist._id },
                cartExist,
                { new: true },
            );
            console.log(updatedCart, 'updatedCart');

            if (deleteMeal.cartItems.length === 0) {
                await this.cartRepository.update({ _id: deleteMeal._id },
                    { discount: 0 },
                    { new: true });
            }
            return updatedCart;
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteCart(userId: Types.ObjectId) {
        try {
            const cartExist = await this.findCartByUserId(userId);

            if (!cartExist) {
                throw new NotFoundException(message.cart.NotFound);
            }

            const deleteCart = await this.cartRepository.delete(
                { _id: cartExist._id }
            );

            return deleteCart;
        } catch (error) {
            this.handleError(error);
        }
    }
}
