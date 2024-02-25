import mongoose from 'mongoose';

export class Meal {
  readonly _id?: mongoose.Types.ObjectId;
  name: string;
  price: number;
  description: string;
  image: string;
  rate: number;
  tags?: string[];
  isDeleted?: boolean;
}
