import mongoose from 'mongoose';

export class Admin {
  readonly _id?: mongoose.Types.ObjectId;
  name: string;
  image: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  gender: string;
  isDeleted?: boolean;
  isActive?: boolean;
  dateOfBirth: Date;
  type?: string;
}
