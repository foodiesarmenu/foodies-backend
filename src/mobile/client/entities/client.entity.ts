import mongoose from 'mongoose';


export class Client {
  readonly _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  countryCode?: string;
  phoneNumber: string;
  password: string;
  gender?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  dateOfBirth?: Date;
  type?: string;
  addresses?: {
    firstAddress: string;
    secondAddress: string;
    buildingNumber: string;
    streetName: string;
    floorNumber: string;
    apartmentNumber?: string;
    note?: string;
  }[];
};

