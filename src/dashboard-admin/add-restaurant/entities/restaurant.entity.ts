import mongoose from 'mongoose';

export class Restaurant {
  readonly _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  isDeleted?: boolean;
  isActive?: boolean;
  registerationDate: Date;
  address?: string;
  avatar?: string;
  canDeliver: boolean;
  city: string;
}
