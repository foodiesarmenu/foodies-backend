import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MealDocument = Meal & Document;

@Schema({
  timestamps: true,
})
export class Meal {

  readonly _id?: Types.ObjectId;

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

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}
export const MealSchema = SchemaFactory.createForClass(Meal);
