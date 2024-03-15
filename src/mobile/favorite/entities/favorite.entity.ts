import { Types } from "mongoose";

export class Favorite {
    user: Types.ObjectId;
    restaurant: Types.ObjectId;
}