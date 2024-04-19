import { Injectable } from '@nestjs/common';
import { CreateCartDTO } from '../dto/cart-dto';
import { Cart } from '../entities/cart.entity';
import { Types } from 'mongoose';

@Injectable()
export class CartFactoryService {
    async createNewCart(createCartDto: CreateCartDTO, userId: Types.ObjectId) {
        const createCart = new Cart();
        createCart.userId = userId;
        createCart.cartItems = [];
        createCart.cartItems.push({ meal: createCartDto.meal });
        createCart.restaurant = createCartDto.restaurant;
        return createCart
    }

}




