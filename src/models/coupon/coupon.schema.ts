import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type CouponDocument = Coupon & Document;
@Schema({
    timestamps: true,
})
export class Coupon {
    readonly _id?: Types.ObjectId;
    
    @Prop({ type: String, required: true, unique: true })
    code: string;

    @Prop({ type: Date, required: true })
    expires: Date;

    @Prop({ type: Number, required: true })
    discount: Number;

    @Prop({ type: Boolean, default: false })
    isDeleted?: boolean
}
export const CouponSchema = SchemaFactory.createForClass(Coupon);
