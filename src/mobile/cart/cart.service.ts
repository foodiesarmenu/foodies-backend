import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from 'src/models/cart/cart.schema';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) { }

    async getById(id: string): Promise<Cart> {
        return this.cartModel.findById(id);
    }

    async add(cart: Cart): Promise<Cart> {
        const newCart = new this.cartModel(cart);
        return newCart.save();
    }

    async delete(id: string): Promise<Cart> {
        return this.cartModel.findByIdAndDelete(id);
    }

    async update(id: string, updatedCart: Partial<Cart>): Promise<Cart> {
        return this.cartModel.findByIdAndUpdate(id, updatedCart, { new: true });
    }
}


export default CartService;
