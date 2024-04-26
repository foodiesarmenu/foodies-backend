import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartRepository } from 'src/models/cart/cart.repository';
import { Cart, CartSchema } from 'src/models/cart/cart.schema';
import { Meal, MealRepository, MealSchema } from 'src/models';
import { CartFactoryService } from './factory/cart.factory';
import { CartController } from './cart.controller';


@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Cart.name,
                schema: CartSchema,
            },
            {
                name: Meal.name,
                schema: MealSchema,
            }
        ]),
    ],
    controllers: [CartController],
    providers: [CartService, CartRepository, CartFactoryService, MealRepository],
    exports: [CartService, CartRepository, CartFactoryService, MealRepository],
})
export class CartModule { }
