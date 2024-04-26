import { Types } from "mongoose";

export class Promotion {
    readonly _id?: Types.ObjectId;
    title: string;
    description: string;
    image: string;
    restaurant: Types.ObjectId;
    isActive?: boolean;
    isDeleted?: boolean;
}