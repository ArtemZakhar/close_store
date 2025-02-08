import City from '@/models/Location/City';
import { CityType } from '@/types/location/location';

export const findCityAndUpdate = async ({
  searchParams,
  dataToUpdate,
}: {
  searchParams: Partial<CityType>;
  dataToUpdate: Partial<CityType> & {
    $setOnInsert?: Partial<CityType>;
    $if?: Partial<Record<keyof CityType, any>>;
  };
}) => {
  return await City.findOneAndUpdate(searchParams, dataToUpdate, {
    upsert: true,
  });
};
