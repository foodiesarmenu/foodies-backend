import { Types } from 'mongoose';

export class Promotion {
  readonly _id?: Types.ObjectId;
  restaurantId?: Types.ObjectId;
  description: string;
  image: string;
  isDeleted?: boolean;
}
