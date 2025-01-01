import { connectToDatabase } from '@/lib/mongoDb';
import Category from '@/models/goods/Categories';
import Goods from '@/models/goods/Goods';
import Seller from '@/models/goods/Sellers';
import { CategoryType } from '@/types/goods/category';
import { PostNewGoodType } from '@/types/goods/good';

import { NextRequest, NextResponse } from 'next/server';

import { responseMessages } from '../constants/responseMessages';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body: PostNewGoodType = await request.json();

    const { category, subCategory, seller, goods } = body;

    if (!seller.email && !seller.phone) {
      return NextResponse.json(
        {
          error: true,
          message: responseMessages.goods.seller.noData,
        },
        { status: responseMessages.codes[503] },
      );
    }

    const updatedCategory = await Category.findOneAndUpdate(
      {
        _id: category,
      },
      { $inc: { lastId: 1 } },
      { new: true },
    );

    if (!updatedCategory) {
      return NextResponse.json(
        {
          error: true,
          message: responseMessages.goods.category.notExist,
        },
        {
          status: responseMessages.codes[404],
        },
      );
    }

    const existingSeller = await Seller.findOne({ name: seller.name });

    let sellerId: string;

    if (!existingSeller) {
      const newSeller = await Seller.create({
        name: seller.name,
        email: seller.email ?? '',
        phone: seller.phone ?? '',
        country: seller.country,
        city: seller.city ?? '',
      });

      await newSeller.save();

      sellerId = newSeller._id;
    } else {
      sellerId = existingSeller._id;
    }

    const existingGoods = await Goods.findOne({
      seller: sellerId,
      model: goods.model,
    });

    if (existingGoods) {
      return NextResponse.json(
        {
          error: true,
          message: responseMessages.goods.exist,
        },
        { status: responseMessages.codes[409] },
      );
    }

    const newGoods = await Goods.create({
      category: updatedCategory._id,
      code: `${updatedCategory.uniqueId}-${updatedCategory.lastId}`,
      subCategory: subCategory,
      firm: goods.firm,
      countryOfOrigin: goods.countryOfOrigin,
      seller: sellerId,
      model: goods.model,
      description: goods.description,
      season: goods.season,
      goodsDetails: goods.goodsDetails,
      stored: goods.stored,
      notes: goods.notes,
      buyDate: goods.buyDate,
      incomePriceGRN: goods.incomePriceGRN,
      incomePriceUSD: goods.incomePriceUSD,
      outcomePrice: goods.outcomePrice,
    });

    await newGoods.save();

    return NextResponse.json({ status: responseMessages.codes[201] });
  } catch (error) {
    console.error('Error during POST new goods:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}
