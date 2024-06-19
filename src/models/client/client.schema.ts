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
      default: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1718791125~exp=1718791725~hmac=9fcf8dc761f8f9b1bd49ea0c7fbbfccf5eb75e77b68d4167ae1a1a431b8516f3'
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