import { ObjectId } from 'mongodb';

export type SellerSchemaType = {
  _id: string;
  owner: ObjectId;
  name: string;
  phone?: string;
  email?: string;
  country: ObjectId;
  city?: ObjectId;
};

export type SellerType = {
  _id: string;
  owner: string;
  name: string;
  phone?: string;
  email?: string;
  country: string;
  city?: string;
};
