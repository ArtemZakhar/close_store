import { FirmType } from '@/types/goods/firm';

import mongoose from 'mongoose';

const FirmSchema = new mongoose.Schema<FirmType>({
  name: {
    type: String,
    required: true,
  },
  countryOfOrigin: {
    type: String,
    required: true,
  },
});

const Firm = mongoose.models.Firm || mongoose.model('Firm', FirmSchema);

export default Firm;
