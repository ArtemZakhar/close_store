import { connectToDatabase } from '@/lib/mongoDb';
import Seller from '@/models/goods/Sellers';
import { SellerSchemaType } from '@/types/goods/seller';

import { NextResponse } from 'next/server';

import { responseMessages } from '../../constants/responseMessages';

export async function GET() {
  try {
    await connectToDatabase();

    const sellers = await Seller.find<SellerSchemaType>()
      .populate('country', 'name')
      .populate('city', 'name')
      .lean();

    const transformedSellers = sellers.map((seller) => ({
      ...seller,
      country: seller.country?.name || '',
      city: seller.city?.name || '',
    }));

    return NextResponse.json(transformedSellers, {
      status: responseMessages.codes[200],
    });
  } catch (error) {
    console.error('Error during GET Sellers request:', error);

    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}
