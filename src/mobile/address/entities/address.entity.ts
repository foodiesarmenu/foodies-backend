import { Types } from 'mongoose';

export class Address {
  readonly _id?: Types.ObjectId;
  user: Types.ObjectId;
  firstAddress: string;
  secondAddress: string;
  buildingNumber: string;
  streetName: string;
  floorNumber: string;
  apartmentNumber: string;
  note: string;
  isPrimary?: boolean;
  isDeleted?: boolean;
}
