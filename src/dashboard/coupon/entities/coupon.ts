import { Types } from 'mongoose';

export class Coupon {
  readonly _id?: Types.ObjectId;
  code: string;
  expires: Date;
  discount: number;
  isDeleted?: boolean;
}
