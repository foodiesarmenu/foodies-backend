import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

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
    orderItems: {
        meal: Types.ObjectId,
        quantity?: number,
        price?: number,
        totalPrice?: number
    }[];

    @Prop({ type: Number, default: 0 })
    orderTotalPrice?: number;

    @Prop({ type: Number, default: 0 })
    totalPriceAfterDiscount?: number;

    @Prop({ type: Number, default: 0 })
    discount?: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Restaurant', required: true })
    restaurant: Types.ObjectId;

    @Prop({ type: Number, default: 0 })
    noOfOrderItems?: number;

    @Prop({
        type: {
            enum: ['pending', 'accepted', 'rejected', 'delivered'],
        }, required: true,
        default: 'pending'
    })
    status: string;

    @Prop({
        type: {
            enum: ['cash', 'card'],
            default: 'cash'
        },
    })
    paymentMethod?: string;

    @Prop({ type: Boolean, default: false })
    isPaid?: boolean;

    @Prop({ type: String })
    deliveryAddress?: string;

    @Prop({ type: Date })
    deliveryTime?: Date;

    @Prop({ type: Boolean, default: false })
    isDeleted?: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
