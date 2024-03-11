import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({
    timestamps: true,
})
export class Favorite {

    readonly _id?: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Restaurant', required: true })
    restaurantId: Types.ObjectId;

    @Prop({ type: Boolean, default: false })
    isDeleted?: boolean
}

export const FavouiteSchema = SchemaFactory.createForClass(Favorite);