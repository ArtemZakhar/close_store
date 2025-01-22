import { ObjectId } from 'mongodb';

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
  owner?: ObjectId;
};

export type NewUserType = {
  name: string;
  email: string;
  role: UserRole;
};

export type UserSchemaType = {
  _id: string;
  name: string;
  email: string;
  token: string;
  status: UserStatus;
  role: UserRole;
  owner?: ObjectId;
  password?: string;
};
