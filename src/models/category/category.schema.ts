import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  discriminatorKey: 'type',
})
export class Category {
  readonly _id?: Types.ObjectId;
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
