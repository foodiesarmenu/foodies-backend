import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartRepository } from 'src/models/cart/cart.reposotory';
import { Cart, CartSchema } from 'src/models/cart/cart.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Cart.name,
                schema: CartSchema,
            },
        ]),
    ],
    controllers: [],
    providers: [CartService, CartRepository],
    exports: [CartService, CartRepository ],
})
export class CartModule { }
