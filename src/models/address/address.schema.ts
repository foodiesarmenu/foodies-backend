import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({
  timestamps: true,
})
export class Address {
  readonly _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  firstAddress: string;

  @Prop({ type: String })
  secondAddress: string;

  @Prop({ type: String })
  buildingNumber: string;

  @Prop({ type: String })
  streetName: string;

  @Prop({ type: String })
  floorNumber: string;

  @Prop({ type: String })
  apartmentNumber: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Client', required: true })
  user: Types.ObjectId;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: Boolean, default: true })
  isPrimary?: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
