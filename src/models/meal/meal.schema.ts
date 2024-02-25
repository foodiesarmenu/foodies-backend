import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MealDocument = Meal & Document;

@Schema({
  timestamps: true,
})
export class Meal {
  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price?: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  rate: number;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;

  readonly _id?: Types.ObjectId;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
