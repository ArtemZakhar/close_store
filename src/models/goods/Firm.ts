import { FirmSchemaType } from '@/types/goods/firm';

import mongoose from 'mongoose';

import '../Location/City';
import '../Location/Country';

const FirmSchema = new mongoose.Schema<FirmSchemaType>({
  name: {
    type: String,
    required: true,
  },
  countryOfOrigin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
});

const Firm = mongoose.models.Firm || mongoose.model('Firm', FirmSchema);

export default Firm;
