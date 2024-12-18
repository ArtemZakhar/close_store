import { UserRole, UserSchemaType, UserStatus } from '@/types/users/userType';

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<UserSchemaType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

const User =
  mongoose.models.User || mongoose.model<UserSchemaType>('User', userSchema);

export default User;
