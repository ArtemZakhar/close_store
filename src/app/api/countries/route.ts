import { connectToDatabase } from '@/lib/mongoDb';
import Country from '@/models/Location/Country';
import { CountryType } from '@/types/location/location';

import { NextResponse } from 'next/server';

import { responseMessages } from '../constants/responseMessages';

export async function GET() {
  try {
    await connectToDatabase();

    const countries = await Country.find<CountryType>();

    return NextResponse.json(countries, {
      status: responseMessages.codes[200],
    });
  } catch (error) {
    console.error('Error during GET Countries request:', error);

    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}
