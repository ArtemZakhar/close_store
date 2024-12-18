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
    type: String,
    required: true,
  },
  city: String,
});

const Seller =
  mongoose.models.Seller || mongoose.model<SellerType>('Seller', SellerSchema);

export default Seller;
