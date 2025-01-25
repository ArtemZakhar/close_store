import { connectToDatabase } from '@/lib/mongoDb';
import Firm from '@/models/goods/Firm';

import { NextResponse } from 'next/server';

import { responseMessages } from '../../constants/responseMessages';

export async function GET() {
  try {
    await connectToDatabase();

    const firms = await Firm.find().populate('countryOfOrigin').lean();

    const transformedFirms = firms.map((firm) => ({
      ...firm,
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
}
