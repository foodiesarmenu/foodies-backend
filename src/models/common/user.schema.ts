import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { GENDER } from '../../common/constants/gender.constant';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  discriminatorKey: 'type',
})
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  countryCode: string;

  @Prop({ type: String })
  avatar?: string;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, enum: GENDER })
  gender: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;

  @Prop({ type: Boolean, default: false, required: false })
  isEmailVerified?: boolean;

  @Prop({ type: Boolean, default: false, required: false })
  isPhoneVerified?: boolean;

  @Prop({ type: Date })
  dateOfBirth: Date;

  readonly _id?: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
