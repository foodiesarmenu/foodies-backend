import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { AddressDto } from "src/common";

export type OrderDocument = Order & Document;

@Schema({
    timestamps: true,
})
export class Order {
    readonly _id?: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({
        type: [{
            meal: { type: SchemaTypes.ObjectId, ref: "Meal", required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number },
            totalPrice: { type: Number }
        }],
        default: []
    })
    cartItems: {
        meal: Types.ObjectId,
        quantity?: number,
        price?: number,
        totalPrice?: number
    }[];

    @Prop({ type: Number, default: 0 })
    cartTotalPrice?: number;

    @Prop({ type: Number, default: 0 })
    totalPriceAfterDiscount?: number;

    @Prop({ type: Number, default: 0 })
    discount?: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Restaurant', required: true })
    restaurant: Types.ObjectId;

    @Prop({ type: Number, default: 0 })
    noOfCartItems?: number;

    @Prop({
        type: String,
        enum: ['pending', 'preparing', 'rejected', 'delivered'],
        required: true,
        default: 'pending'
    })
    status?: string;

    @Prop({
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    })
    paymentMethod: string;

    @Prop({ type: Boolean, default: false })
    isPaid?: boolean;

    @Prop({ type: AddressDto })
    deliveryAddress?: AddressDto;

    @Prop({ type: Date })
    deliveryTime?: Date;

    @Prop({ type: Boolean, default: false })
    isDeleted?: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
