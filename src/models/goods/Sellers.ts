import { SellerType } from '@/types/goods/seller';

import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema<SellerType>({
  name: {
    type: String,
    required: true,
  },
  phone: String,
  email: String,
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Seller =
  mongoose.models.Seller || mongoose.model<SellerType>('Seller', SellerSchema);

export default Seller;
