import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../common/user.schema'; // Import the User model
export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true
  })
  userId: User;

  @Prop([
    {
      product: {
        type: Types.ObjectId,
        ref: 'Product'
      },
      price: Number,
      totalProductDiscount: Number,
    }
  ])
  cartItems: Record<string, any>[];

  @Prop()
  totalPrice: number;

  @Prop()
  totalPriceAfterDiscount: number;

  @Prop()
  discount: number;
}
export const CartSchema = SchemaFactory.createForClass(Cart);

