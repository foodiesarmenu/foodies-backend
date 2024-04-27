import { Types } from 'mongoose';

export class Address {
  readonly _id?: Types.ObjectId;
  user: Types.ObjectId;
  firstAddress: string;
  secondAddress: string;
  buildingNumber: Number;
  streetName: string;
  floorNumber: Number;
  apartmentNumber: string;
  note: string;
  isPrimary?: boolean;
  isDeleted?: boolean;
}
