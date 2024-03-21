import { Injectable } from '@nestjs/common';
import { CreateCartDTO, UpdateCartDto } from '../dto/cart-dto';
import { Cart } from 'src/models/cart/cart.schema';

@Injectable()
export class CartFactoryService {
    async createNewCart(createCartDto: CreateCartDTO) {
        const createCart = new Cart()
        createCart.discount = createCartDto.discount
        createCart.price = createCartDto.price
        createCart.quantity = createCartDto.quantity
        createCart.totalPrice = createCartDto.totalPrice
        createCart.totalPriceAfterDiscount = createCartDto.totalPriceAfterDiscount
        createCart.totalProductDiscount = createCartDto.totalProductDiscount

        return createCart
    }



    updateCart(UpdateCartDto: UpdateCartDto) {
        const updateCart = new Cart()
        updateCart.discount = UpdateCartDto.discount
        updateCart.price = UpdateCartDto.price
        updateCart.quantity = UpdateCartDto.quantity
        updateCart.totalPrice = UpdateCartDto.totalPrice
        updateCart.totalPriceAfterDiscount = UpdateCartDto.totalPriceAfterDiscount
        updateCart.totalProductDiscount = UpdateCartDto.totalProductDiscount

        return updateCart
    }

}




