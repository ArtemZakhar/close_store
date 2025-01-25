import { ObjectId } from 'mongodb';

import { getIcon } from '../../helpers/getIcon';

export type CategoryTypeSchema = {
  _id: ObjectId;
  uniqueId: number;
  owner: ObjectId;
  lastId: number;
  name: string;
  url: string;
  icon: keyof ReturnType<typeof getIcon>;
  subCategory: string[];
};

export type CategoryType = {
  _id: string;
  uniqueId: number;
  owner: string;
  lastId: number;
  name: string;
  url: string;
  icon: keyof ReturnType<typeof getIcon>;
  subCategory: string[];
};
