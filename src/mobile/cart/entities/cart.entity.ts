import { Types } from "mongoose";



export class Cart {
    userId: Types.ObjectId;
    cartItems: {
        meal: Types.ObjectId,
        quantity?: number,
        price?: number,
    }[];
    totalPrice?: number;
    totalPriceAfterDiscount?: number;
    discount?: number;
    restaurantId: Types.ObjectId;
    isDeleted?: boolean
}