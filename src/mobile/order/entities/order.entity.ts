import { Types } from "mongoose";

export class Order {
    userId: Types.ObjectId;
    orderItems: {
        meal: Types.ObjectId,
        quantity?: number,
        price?: number,
        totalPrice?: number
    }[];
    orderTotalPrice?: number;
    totalPriceAfterDiscount?: number;
    status?: string;
    paymentMethod: string;
    noOfOrderItems?: number;
    discount?: number;
    restaurant: Types.ObjectId;
    isDeleted?: boolean
}