import { connectToDatabase } from '@/lib/mongoDb';
import City from '@/models/Location/City';
import { CityType } from '@/types/location/location';

import { NextResponse } from 'next/server';

import { responseMessages } from '../constants/responseMessages';

export async function GET() {
  try {
    await connectToDatabase();

    const cities = await City.find<CityType>();

    return NextResponse.json(cities, {
      status: responseMessages.codes[200],
    });
  } catch (error) {
    console.error('Error during GET Cities request:', error);

    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}
