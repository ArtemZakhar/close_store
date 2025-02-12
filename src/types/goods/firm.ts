import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { CountryType } from '../location/location';

export type FirmSchemaType = {
  _id: ObjectId;
  name: string;
  countryOfOrigin: ObjectId;
} & Document;

export type FirmTypeFilled = {
  _id: ObjectId;
  name: string;
  countryOfOrigin: CountryType;
} & Document;

export type FirmType = {
  _id: string;
  name: string;
  countryOfOrigin: CountryType | string;
};
