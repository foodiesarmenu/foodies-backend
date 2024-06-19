import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClientDocument = Client & Document;



@Schema({
  timestamps: true,
  discriminatorKey: 'type',
})
export class Client {
  readonly _id?: Types.ObjectId;
  name: string;

  email: string;

  @Prop(
    {
      type: String,
      default: 'http://res.cloudinary.com/dlvndc08a/image/upload/v1718631096/client/d0svujuorpom6ay60ias.jpg'
    }
  )
  image?: string;

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

  @Prop({
    type: [{
      firstAddress: { type: String, required: true },
      secondAddress: { type: String },
      buildingNumber: { type: String },
      streetName: { type: String },
      floorNumber: { type: String },
      apartmentNumber: { type: String },
      note: { type: String }
    }
    ]
  })
  addresses?: {
    firstAddress: string;
    secondAddress: string;
    buildingNumber: string;
    streetName: string;
    floorNumber: string;
    apartmentNumber?: string;
    note?: string;
  }[];

  @Prop({})
  emailCode?: string;
}




export const ClientSchema = SchemaFactory.createForClass(Client);