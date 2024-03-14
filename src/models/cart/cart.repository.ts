import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';

@Injectable()
export class CartRepository {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) { }

  async create(cart: Cart): Promise<Cart> {
    const createdCart = new this.cartModel(cart);
    return createdCart.save();
  }

  async findById(id: string): Promise<Cart | null> {
    return this.cartModel.findById(id).exec();
  }

  async update(id: string, update: Cart): Promise<Cart | null> {
    return this.cartModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  // async delete(id: string): Promise<Cart | null> {
  //   return this.cartModel.(id).exec();
  // }
}
