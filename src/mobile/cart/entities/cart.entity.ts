import { Types } from "mongoose";



export class Cart {
    userId: Types.ObjectId;
    cartItems: {
        meal: Types.ObjectId,
        quantity?: number,
        size: string,
        price?: number,
        totalPrice?: number
    }[];
    cartTotalPrice?: number;
    totalPriceAfterDiscount?: number;
    discount?: number;
    restaurant: Types.ObjectId;
    isDeleted?: boolean
}