import Firm from '@/models/goods/Firm';
import { FirmSchemaType, FirmType, FirmTypeFilled } from '@/types/goods/firm';

import { findCountryAndUpdate } from '../../countries/countries.service';

export const findFirm = async (searchParams: Partial<FirmType>) => {
  return await Firm.findOne(searchParams);
};

export const createFirm = async (data: Omit<FirmType, '_id'>) => {
  const newFirm = await Firm.create(data);
  await newFirm.save();

  return newFirm;
};

export const getAllFirms = async ({
  populate,
  searchParams = {},
}: {
  populate?: boolean;
  searchParams?: Partial<FirmType>;
}): Promise<FirmSchemaType[] | FirmTypeFilled[]> => {
  let query = Firm.find(searchParams);
  if (populate) {
    query = query.populate('countryOfOrigin');
  }
  return await query.exec();
};

export const updateFirm = async ({
  searchParam,
  dataToUpdate,
}: {
  searchParam: Partial<FirmType>;
  dataToUpdate: Partial<FirmType> & {
    $inc?: Partial<Record<keyof FirmType, number>>;
    $set?: Partial<FirmType>;
    $push?: Partial<Record<keyof FirmType, any>>;
    $if?: Partial<Record<keyof FirmType, any>>;
  };
}) => {
  const { countryOfOrigin } = dataToUpdate;

  const newDateToUpdate = { ...dataToUpdate };

  if (countryOfOrigin) {
    if (typeof countryOfOrigin === 'string') {
      const newCountry = await findCountryAndUpdate({
        searchParams: { name: countryOfOrigin },
        dataToUpdate: { name: countryOfOrigin },
      });

      newDateToUpdate.countryOfOrigin = newCountry?._id;
    } else {
      newDateToUpdate.countryOfOrigin = countryOfOrigin._id;
    }
  }
  console.log(newDateToUpdate);

  return await Firm.findOneAndUpdate(searchParam, newDateToUpdate).exec();
};
