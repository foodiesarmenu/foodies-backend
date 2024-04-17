import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Address {
  @Prop({ required: true })
  firstAddress: string;

  @Prop({ required: true })
  secondAddress: string;

  @Prop({ required: true })
  buildingNumber: string;

  @Prop({ required: true })
  streetName: string;

  @Prop({ required: true })
  floorNumber: string;

  @Prop({ required: true })
  apartmentNumber: string;

  @Prop()
  note?: string;
}

@Schema({
  timestamps: true,
  discriminatorKey: 'type',
})
export class Client {
  readonly _id?: Types.ObjectId;
  name: string;
  email: string;

  @Prop()
  avatar?: string;

  @Prop()
  countryCode?: string;

  phoneNumber: string;
  password: string;

  @Prop()
  gender?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;

  @Prop({ type: Boolean, default: true })
  isActive?: boolean;

  @Prop([Address])
  addresses?: Address[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);