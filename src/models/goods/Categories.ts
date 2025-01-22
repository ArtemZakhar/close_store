import { CategoryType } from '@/types/goods/category';

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema<CategoryType>({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  uniqueId: {
    type: Number,
    required: true,
  },
  lastId: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  subCategory: {
    type: [String],
    required: true,
    default: [],
  },
});

const Category =
  mongoose.models.Category ||
  mongoose.model<CategoryType>('Category', categorySchema);

export default Category;
