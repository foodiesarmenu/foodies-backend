import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({
  timestamps: true,
})
export class Cart {

  readonly _id?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;
  @Prop({ type: Types.ObjectId, ref: "Product", required: true })
  cartItems: [string];
  @Prop({ type: Number, default: 1 })
  quantity?: Number
  @Prop({ type: Number, default: 0 })
  price: Number
  @Prop({ type: Number, default: 0 })
  totalProductDiscount: Number
  @Prop({ type: Number, default: 0 })
  totalPrice: Number
  @Prop({ type: Number, default: 0 })
  totalPriceAfterDiscount: Number
  @Prop({ type: Number, default: 0 })
  discount: Number
}

export const CartSchema = SchemaFactory.createForClass(Cart);
