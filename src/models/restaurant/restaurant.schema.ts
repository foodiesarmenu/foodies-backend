import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema({
  timestamps: true,
  discriminatorKey: 'type',
})
export class Restaurant {
  readonly _id?: Types.ObjectId;
  name: string;
  email: string;
  address?: string;
  avatar?: string;
  phoneNumber: string;
  password: string;
  canDeliver: boolean;
  city: string;
  registerationDate: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
