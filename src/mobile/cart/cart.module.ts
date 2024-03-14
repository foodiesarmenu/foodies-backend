import { MongooseModule, Schema } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { Module } from '@nestjs/common';
import { Cart, CartSchema } from 'src/models/cart/cart.schema';
import { CartController } from './cart.controller';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Cart.name, schema: CartSchema }
    ])],
    controllers: [CartController],
    providers: [
        CartService,
    ],
    exports:[CartService]
})
export class CartModule { }