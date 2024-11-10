export enum UserRole {
  admin = 'admin',
  owner = 'owner',
  seller = 'seller',
  buyer = 'buyer',
}

export enum UserStatus {
  pending = 'pending',
  expired = 'expired',
  created = 'created',
  deleted = 'deleted',
}

export type User = {
  _id: string;
  name: string;
  email: string;
  status: UserStatus;
  role: UserRole;
};

export type NewUserType = {
  name: string;
  email: string;
  role: UserRole;
};
