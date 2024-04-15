import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Cart, CartDocument } from './cart.schema';

export class CartRepository extends AbstractRepository<Cart> {
    constructor(
        @InjectModel(Cart.name)
        private readonly cartModel: Model<CartDocument>,
    ) {
        super(cartModel);
    }
}
