import { ObjectId } from 'mongodb';

import { getIcon } from '../../helpers/getIcon';

export type CategoryType = {
  _id: string;
  uniqueId: number;
  owner: ObjectId;
  lastId: number;
  name: string;
  url: string;
  icon: keyof ReturnType<typeof getIcon>;
  subCategory: string[];
};
