import City from '@/models/Location/City';
import Country from '@/models/Location/Country';

import { ObjectId } from 'mongodb';

export const handleLocationUpdate = async ({
  sellerCountry,
  firmCountry,
  sellerCity,
}: {
  sellerCountry: string | ObjectId;
  firmCountry?: string | ObjectId;
  sellerCity?: string | ObjectId;
}) => {
  if (sellerCity && typeof sellerCity === 'string') {
    await City.findOneAndUpdate(
      {
        name: sellerCity,
      },
      {
        $setOnInsert: { name: sellerCity },
      },
      { upsert: true },
    );
  }

  if (typeof sellerCountry === 'string') {
    await Country.findOneAndUpdate(
      {
        name: sellerCountry,
      },
      {
        $setOnInsert: { name: sellerCountry },
      },
      { upsert: true },
    );
  }

  if (firmCountry && typeof firmCountry === 'string') {
    await Country.updateOne(
      {
        name: firmCountry,
      },
      {
        $setOnInsert: { name: firmCountry },
      },
      { upsert: true },
    );
  }
};
