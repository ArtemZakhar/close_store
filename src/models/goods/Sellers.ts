import { SellerSchemaType } from '@/types/goods/seller';

import mongoose from 'mongoose';

import '../Location/City';
import '../Location/Country';

const SellerSchema = new mongoose.Schema<SellerSchemaType>({
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
  mongoose.models.Seller ||
  mongoose.model<SellerSchemaType>('Seller', SellerSchema);

export default Seller;
