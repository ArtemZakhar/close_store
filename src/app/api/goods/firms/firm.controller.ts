import { connectToDatabase } from '@/lib/mongoDb';
import { FirmTypeFilled } from '@/types/goods/firm';

import { NextResponse } from 'next/server';

import { responseMessages } from '../../constants/responseMessages';
import { getAllFirms } from './firm.service';

export const httpGetAllFirms = async () => {
  try {
    await connectToDatabase();

    const firms = (await getAllFirms({
      populate: true,
    })) as FirmTypeFilled[];

    const transformedFirms = firms.map((firm) => ({
      _id: firm._id,
      name: firm.name,
      countryOfOrigin: firm.countryOfOrigin.name,
    }));

    return NextResponse.json(transformedFirms, {
      status: responseMessages.codes[200],
    });
  } catch (error) {
    console.error('Error during GET Firms request:', error);

    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};
