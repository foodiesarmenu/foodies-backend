import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

export type PromotionDocument = Promotion & Document;

@Schema({
    timestamps: true,
})

export class Promotion {
    readonly _id?: Types.ObjectId;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, required: true })
    image: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Restaurant', required: true })
    restaurant: Types.ObjectId;

    @Prop({ type: Boolean, default: true })
    isActive?: boolean

    @Prop({ type: Boolean, default: false })
    isDeleted?: boolean
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);