import { UserRole, UserSchemaType, UserStatus } from '@/types/users/userType';

import mongoose, { Model } from 'mongoose';

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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
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

const User: Model<UserSchemaType> =
  mongoose.models.User || mongoose.model<UserSchemaType>('User', userSchema);

export default User;
