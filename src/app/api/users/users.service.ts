import User from '@/models/Users';
import { UserSchemaType, UserType } from '@/types/users/userType';

export const findOneUser = async (
  params: Partial<UserType>,
): Promise<UserSchemaType | null> => {
  return await User.findOne(params).exec();
};

export const updateUser = async ({
  searchParam,
  dataToUpdate,
}: {
  searchParam: Partial<UserType>;
  dataToUpdate: Partial<UserSchemaType> & {
    $inc?: Partial<Record<keyof UserSchemaType, number>>;
    $set?: Partial<Record<keyof UserSchemaType, any>>;
    $push?: Partial<Record<keyof UserSchemaType, any>>;
    $if?: Partial<Record<keyof UserSchemaType, any>>;
  };
}): Promise<UserSchemaType | null> => {
  return User.findOneAndUpdate(searchParam, dataToUpdate).exec();
};
