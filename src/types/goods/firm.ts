import { ObjectId } from 'mongodb';

export type FirmSchemaType = {
  _id: ObjectId;
  name: string;
  countryOfOrigin: ObjectId;
};

export type FirmType = {
  _id: string;
  name: string;
  countryOfOrigin: string;
};
