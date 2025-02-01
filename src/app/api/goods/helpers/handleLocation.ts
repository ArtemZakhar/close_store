import { ObjectId } from 'mongodb';

import { findCityAndUpdate } from '../../cities/cities.serivce';
import { findCountryAndUpdate } from '../../countries/countries.service';

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
    await findCityAndUpdate({
      searchParams: {
        name: sellerCity,
      },
      dataToUpdate: {
        $setOnInsert: { name: sellerCity },
      },
    });
  }

  if (typeof sellerCountry === 'string') {
    await findCountryAndUpdate({
      searchParams: {
        name: sellerCountry,
      },
      dataToUpdate: {
        $setOnInsert: { name: sellerCountry },
      },
    });
  }

  if (firmCountry && typeof firmCountry === 'string') {
    await findCountryAndUpdate({
      searchParams: {
        name: firmCountry,
      },
      dataToUpdate: {
        $setOnInsert: { name: firmCountry },
      },
    });
  }
};
