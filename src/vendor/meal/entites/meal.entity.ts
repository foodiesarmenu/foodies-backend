import { Types } from 'mongoose';

export class Meal {
  readonly _id?: Types.ObjectId;
  restaurant: Types.ObjectId;
  image: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  rate?: number;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  tags: string[];
  isDeleted?: boolean;
}
