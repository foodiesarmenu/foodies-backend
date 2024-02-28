import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CATEGORY } from 'src/common';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
})
export class Category {

  readonly _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, enum: CATEGORY, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean
}

export const CategorySchema = SchemaFactory.createForClass(Category);
