import Firm from '@/models/goods/Firm';
import { FirmType } from '@/types/goods/firm';

export const findFirm = async (searchParams: Partial<FirmType>) => {
  return await Firm.findOne(searchParams);
};

export const createFirm = async (data: Omit<FirmType, '_id'>) => {
  const newFirm = await Firm.create(data);

  await newFirm.save();

  return newFirm;
};
