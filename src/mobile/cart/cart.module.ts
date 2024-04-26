import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartRepository } from 'src/models/cart/cart.repository';
import { Cart, CartSchema } from 'src/models/cart/cart.schema';
import { Coupon, CouponRepository, CouponSchema, Meal, MealRepository, MealSchema } from 'src/models';
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
            },
            {
                name: Coupon.name,
                schema: CouponSchema,
            }
        ]),
    ],
    controllers: [CartController],
    providers: [CartService, CartRepository, CartFactoryService, MealRepository, CouponRepository],
    exports: [CartService, CartRepository, CartFactoryService, MealRepository],
})
export class CartModule { }
