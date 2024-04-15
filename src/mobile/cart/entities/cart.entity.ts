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
    restaurant: Types.ObjectId;
    isDeleted?: boolean
}