import { ObjectId } from 'mongodb';

export type FirmType = {
  _id: string;
  name: string;
  countryOfOrigin: ObjectId | string;
};
