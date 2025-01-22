import { ObjectId } from 'mongodb';

export type SellerType = {
  _id: string;
  owner: ObjectId;
  name: string;
  phone?: string;
  email?: string;
  country: ObjectId | string;
  city?: ObjectId | string;
};
