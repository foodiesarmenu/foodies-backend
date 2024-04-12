import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({
  timestamps: true,
  discriminatorKey: 'type',
})
export class Admin {
  readonly _id?: Types.ObjectId;
  name: string;
  image: string;
  email: string;
  address?: string;
  avatar?: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  gender: string;
  isDeleted?: boolean;

  @Prop({ type: Boolean, default: true })
  isActive?: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
