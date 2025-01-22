import Seller from '@/models/goods/Sellers';
import { SellerType } from '@/types/goods/seller';

import { ObjectId } from 'mongodb';

export const handleSellerData = async ({
  seller,
  ownerId,
}: {
  seller: Omit<SellerType, '_id'>;
  ownerId: string;
}): Promise<ObjectId> => {
  const existingSeller = await Seller.findOne({ name: seller.name });

  let sellerId: ObjectId;

  if (!existingSeller) {
    const newSeller = await Seller.create({
      name: seller.name,
      email: seller.email ?? '',
      phone: seller.phone ?? '',
      country: seller.country,
      city: seller.city ?? '',
      owner: ownerId,
    });

    await newSeller.save();

    sellerId = newSeller._id;
  } else {
    sellerId = existingSeller._id;

    if (!existingSeller.phone && seller.phone) {
      await Seller.findOneAndUpdate(
        {
          _id: existingSeller._id,
        },
        {
          $set: {
            phone: seller.phone,
          },
        },
      );
    }

    if (!existingSeller.email && seller.email) {
      await Seller.findOneAndUpdate(
        {
          _id: existingSeller._id,
        },
        {
          $set: {
            email: seller.email,
          },
        },
      );
    }
  }

  return sellerId;
};
