import { Types } from 'mongoose';
import { Size } from 'src/common';

export class Meal {
  readonly _id?: Types.ObjectId;
  restaurant: Types.ObjectId;
  image: string;
  name: string;
  price: number;
  description: string;
  currency: string;
  rate?: number;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  tags: string[];
  sizes: { size: Size, price: number }[];
  isDeleted?: boolean;
}
