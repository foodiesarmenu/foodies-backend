import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({
    timestamps: true,
})
export class Favorite {

    readonly _id?: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Client', required: true })
    user: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Restaurant', required: true })
    restaurant: Types.ObjectId;

    @Prop({ type: Boolean, default: false })
    isDeleted?: boolean
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);