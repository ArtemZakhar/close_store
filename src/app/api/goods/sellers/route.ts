import { connectToDatabase } from '@/lib/mongoDb';
import Seller from '@/models/goods/Sellers';
import { SellerType } from '@/types/goods/seller';

import { NextResponse } from 'next/server';

import { responseMessages } from '../../constants/responseMessages';

export async function GET() {
  try {
    await connectToDatabase();

    const sellers = await Seller.find<SellerType>();

    return NextResponse.json(sellers, {
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
