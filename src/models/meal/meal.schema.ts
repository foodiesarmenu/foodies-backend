import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Size } from 'src/common';

export type MealDocument = Meal & Document;

@Schema({
  timestamps: true,
})
export class Meal {

  readonly _id?: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Restaurant', required: true })
  restaurant: Types.ObjectId

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number })
  rate?: number;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ type: Number, required: true })
  calories: number;

  @Prop({ type: Number, required: true })
  protein: number;

  @Prop({ type: Number, required: true })
  fat: number;

  @Prop({ type: Number, required: true })
  carbohydrates: number;

  @Prop({ type: [{ size: { type: String, enum: Object.values(Size) }, price: Number }], default: [] }) // Array of objects containing size and price
  sizes?: { size: Size, price: number }[];

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
