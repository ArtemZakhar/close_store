import { ObjectId } from 'mongodb';

import { CityType, CountryType } from '../location/location';

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

export type PopulatedSellerType = {
  _id: string;
  owner: string;
  name: string;
  phone?: string;
  email?: string;
  country: CountryType;
  city?: CityType;
};
