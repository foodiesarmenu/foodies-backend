import { Types } from "mongoose";

export class Favorite {
    userId: Types.ObjectId;
    restaurantId: Types.ObjectId;
}