import { CityType } from '@/types/location/location';

import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema<CityType>({
  name: {
    type: String,
    required: true,
  },
});

const City =
  mongoose.models.City || mongoose.model<CityType>('City', CitySchema);

export default City;
