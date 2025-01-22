import { getSession } from '@/helpers/getSession';
import { connectToDatabase } from '@/lib/mongoDb';
import User from '@/models/Users';
import Category from '@/models/goods/Categories';
import Firm from '@/models/goods/Firm';
import Goods from '@/models/goods/Goods';
import { NewGoodFormType } from '@/types/goods/good';
import { UserRole, UserSchemaType } from '@/types/users/userType';

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { ObjectId } from 'mongodb';

import { responseMessages } from '../constants/responseMessages';
import { handleLocationUpdate } from './helpers/handleLocation';
import { handleSellerData } from './helpers/handleSeller';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: true, message: responseMessages.user.forbidden },
        {
          status: responseMessages.codes[401],
        },
      );
    }

    let ownerId = new ObjectId(session.id);

    if (session.role === UserRole.seller) {
      const existingSeller = await User.findOne<UserSchemaType>({
        _id: session.id,
      });

      if (!existingSeller) {
        return NextResponse.json(
          { error: true, message: responseMessages.user.forbidden },
          {
            status: responseMessages.codes[401],
          },
        );
      }

      ownerId = existingSeller.owner!;
    }

    const url = new URL(request.url);

    const queryParams = new URLSearchParams(url.searchParams);

    const searchParams: { [key: string]: string | string[] | ObjectId } = {
      owner: ownerId,
    };

    if (queryParams.toString()) {
      for (const [key, value] of queryParams.entries()) {
        if (key === 'subCategory') {
          searchParams[key] = value.split(',');
          continue;
        }

        if (key === 'category') {
          const category = await Category.findOne({ url: value });
          searchParams[key] = category._id;
          continue;
        }

        searchParams[key] = value;
      }
    }

    const goods = await Goods.find(searchParams)
      .populate('seller')
      .populate('firm');

    return NextResponse.json(goods, { status: responseMessages.codes[200] });
  } catch (error) {
    console.error('Error during GET goods:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    await connectToDatabase();

    if (!session) {
      return NextResponse.json(
        { error: true, message: responseMessages.user.forbidden },
        {
          status: responseMessages.codes[401],
        },
      );
    }

    const body: NewGoodFormType = await request.json();

    const {
      category,
      subCategory,
      seller,
      firm,
      model,
      goodsDetails,
      buyDate,
      season,
      incomePriceGRN,
      incomePriceUSD,
      outcomePrice,
      description,
      stored,
      notes,
    } = body;

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

    const sellerId = await handleSellerData({ seller, ownerId: session.id });

    const existingGoods = await Goods.findOne({
      seller: sellerId,
      model,
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

    await handleLocationUpdate({
      sellerCountry: seller.country,
      sellerCity: seller.city,
      firmCountry: firm.countryOfOrigin,
    });

    let firmID: ObjectId;

    const existFirm = await Firm.findOne({ name: firm.name });

    if (!existFirm) {
      const newFirm = await Firm.create({
        name: firm.name,
        countryOfOrigin: firm.countryOfOrigin,
      });

      await newFirm.save();

      firmID = newFirm._id;
    } else {
      firmID = existFirm._id;
    }

    const newGoods = await Goods.create({
      category: updatedCategory._id,
      code: `${updatedCategory.uniqueId}-${updatedCategory.lastId}`,
      subCategory: subCategory,
      firm: firmID,
      countryOfOrigin: firm.countryOfOrigin,
      seller: sellerId,
      model: model,
      description: description ?? '',
      owner: session.id,
      season: season.name,
      goodsDetails: goodsDetails,
      stored: stored ?? '',
      notes: notes ?? '',
      buyDate: buyDate,
      incomePriceGRN: incomePriceGRN ?? '',
      incomePriceUSD: incomePriceUSD ?? '',
      outcomePrice: outcomePrice ?? '',
    });

    await newGoods.save();

    revalidateTag('goods-category');

    return NextResponse.json({ status: responseMessages.codes[201] });
  } catch (error) {
    console.error('Error during POST new goods:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}
