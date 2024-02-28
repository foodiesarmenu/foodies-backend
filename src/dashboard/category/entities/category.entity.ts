import { Types } from 'mongoose';

export class Category {

  readonly _id?: Types.ObjectId;
  image: string;
  name: string;
  description: string;
  isDeleted?: boolean;
}
