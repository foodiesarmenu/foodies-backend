import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { CITY } from 'src/common';

export type RestaurantDocument = Restaurant & Document;

@Schema({
  timestamps: true,
})

export class Restaurant {
  readonly _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String })
  description: string

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, default: false })
  canDeliver?: boolean;

  @Prop({ type: String, enum: CITY, required: true })
  city: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Category' }], required: true })
  category: Types.ObjectId[];

  @Prop({ type: String, default: 'active' })
  status: string;

  @Prop({ type: String, default: 'Restaurant' })
  type?: string

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
