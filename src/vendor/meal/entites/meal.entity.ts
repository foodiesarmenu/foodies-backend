import { Types } from 'mongoose';

export class Meal {
  readonly _id?: Types.ObjectId;
  image: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  rate?: number;
  tags: string[];
  isDeleted?: boolean;
}
