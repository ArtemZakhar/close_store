import Country from '@/models/Location/Country';
import { CountryType } from '@/types/location/location';

export const findCountryAndUpdate = async ({
  searchParams,
  dataToUpdate,
}: {
  searchParams: Partial<CountryType>;
  dataToUpdate: Partial<CountryType> & {
    $setOnInsert?: Partial<CountryType>;
    $if?: Partial<Record<keyof CountryType, any>>;
  };
}): Promise<CountryType | null> => {
  return await Country.findOneAndUpdate(searchParams, dataToUpdate, {
    upsert: true,
  }).exec();
};
