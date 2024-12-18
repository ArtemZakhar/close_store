import { CountryType } from '@/types/location/location';

import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema<CountryType>({
  name: {
    type: String,
    required: true,
  },
});

const Country =
  mongoose.models.Country ||
  mongoose.model<CountryType>('Country', CountrySchema);

export default Country;
