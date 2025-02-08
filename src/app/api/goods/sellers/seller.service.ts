import Seller from '@/models/goods/Sellers';
import { SellerType } from '@/types/goods/seller';

import { ObjectId } from 'mongodb';

import { findCityAndUpdate } from '../../cities/cities.serivce';
import { findCountryAndUpdate } from '../../countries/countries.service';

export const createSeller = async (
  seller: Omit<SellerType, '_id'>,
  ownerId: string,
) => {
  const newSeller = await Seller.create({
    name: seller.name,
    email: seller.email ?? '',
    phone: seller.phone ?? '',
    country: seller.country,
    city: seller.city ?? '',
    owner: ownerId,
  });

  await newSeller.save();

  return newSeller;
};

export const findSellerByParams = async (params: Partial<SellerType>) => {
  const seller = await Seller.findOne(params);

  return seller;
};

export const updateSeller = async ({
  searchParam,
  dataToUpdate,
}: {
  searchParam: Partial<SellerType>;
  dataToUpdate: Partial<SellerType> & {
    $inc?: Partial<Record<keyof SellerType, number>>;
    $set?: Partial<SellerType>;
    $push?: Partial<Record<keyof SellerType, any>>;
    $if?: Partial<Record<keyof SellerType, any>>;
  };
}) => {
  await Seller.findOneAndUpdate(searchParam, dataToUpdate);
};

export const handleSellerData = async ({
  seller,
  ownerId,
}: {
  seller: Omit<SellerType, '_id'>;
  ownerId: string;
}): Promise<ObjectId> => {
  const existingSeller = await findSellerByParams({ name: seller.name });

  let sellerId: ObjectId;

  if (!existingSeller) {
    const { city, country } = seller;

    if (city) {
      const existingCity = ObjectId.isValid(city);

      if (!existingCity) {
        const newCity = await findCityAndUpdate({
          searchParams: { name: city },
          dataToUpdate: { $setOnInsert: { name: city } },
        });

        seller.city = newCity._id;
      }
    }

    const existingCountry = ObjectId.isValid(country);

    if (!existingCountry) {
      const newCountry = await findCountryAndUpdate({
        searchParams: { name: country },
        dataToUpdate: { name: country },
      });

      seller.country = newCountry._id;
    }

    const newSeller = await createSeller(seller, ownerId);

    sellerId = newSeller._id;
  } else {
    sellerId = existingSeller._id;

    if (!existingSeller.phone && seller.phone) {
      await updateSeller({
        searchParam: {
          _id: existingSeller._id,
        },
        dataToUpdate: {
          $set: {
            phone: seller.phone,
          },
        },
      });
    }

    if (!existingSeller.email && seller.email) {
      await updateSeller({
        searchParam: {
          _id: existingSeller._id,
        },
        dataToUpdate: {
          $set: {
            email: seller.email,
          },
        },
      });
    }
  }

  return sellerId;
};
