import { Types } from 'mongoose';

export class Restaurant {

  readonly _id?: Types.ObjectId;
  name: string;
  email: string;
  address: string;
  description: string;
  image: string;
  phoneNumber: string;
  password: string;
  canDeliver?: boolean;
  city: string;
  category: Types.ObjectId[];
  qrCode?: string;
  status: string;
  isDeleted?: boolean;
}
