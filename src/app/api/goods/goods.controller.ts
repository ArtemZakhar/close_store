import { getSession } from '@/helpers/getSession';
import { connectToDatabase } from '@/lib/mongoDb';
import { NewGoodFormType } from '@/types/goods/good';
import { UserRole } from '@/types/users/userType';

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { ObjectId } from 'mongodb';

import { responseMessages } from '../constants/responseMessages';
import { findCategoryAndUpdate } from './categories/category.sevice';
import { createFirm, findFirm } from './firms/frim.service';
import {
  createNewGoods,
  deleteGoodsById,
  findOneGoodsByParams,
  getGoodsByParams,
} from './goods.service';
import { handleLocationUpdate } from './helpers/handleLocation';
import { handleSearchParams } from './helpers/handleSearchParams';
import { handleSellerData } from './sellers/seller.service';

export const httpGetGoods = async (request: NextRequest) => {
  try {
    const newUrl = new URL(request.url);

    const queryParams = newUrl.searchParams;

    let id = queryParams.get('id');
    let owner = queryParams.get('owner') || undefined;
    let role = queryParams.get('role');

    if (!id || !role) {
      const session = await getSession();

      if (!session) {
        return NextResponse.json(
          { error: true, message: responseMessages.user.forbidden },
          {
            status: responseMessages.codes[401],
          },
        );
      }

      id = session.id;
      role = session.role;
      owner = session.owner || undefined;
    }

    await connectToDatabase();

    const searchParams = await handleSearchParams({ queryParams });

    let goods = [];

    if (role === UserRole.owner) {
      goods = await getGoodsByParams({ ...searchParams, owner: id });
    }

    if (role === UserRole.seller) {
      goods = await getGoodsByParams({ ...searchParams, owner });
    }

    return NextResponse.json(goods, { status: responseMessages.codes[200] });
  } catch (error) {
    console.error('Error during GET goods:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};

export const httpPostNewGoods = async (request: NextRequest) => {
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
      sizeType,
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

    const updatedCategory = await findCategoryAndUpdate({
      searchParam: {
        _id: category,
      },
      dataToUpdate: { $inc: { lastId: 1 } },
    });

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

    const existingGoods = await findOneGoodsByParams({
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

    const existFirm = await findFirm({ name: firm.name });

    if (!existFirm) {
      const newFirm = await createFirm({
        name: firm.name!,
        countryOfOrigin: firm.countryOfOrigin!,
      });

      firmID = newFirm._id;
    } else {
      firmID = existFirm._id;
    }

    console.log(sizeType);

    const newGoods = await createNewGoods({
      category: updatedCategory._id,
      code: `${updatedCategory.uniqueId}-${updatedCategory.lastId}`,
      subCategory: subCategory,
      firm: firmID,
      seller: sellerId,
      model: model,
      description: description ?? '',
      owner: new ObjectId(session.id),
      season: season.name,
      goodsDetails: goodsDetails,
      stored: stored ?? '',
      notes: notes ?? '',
      buyDate: buyDate ?? '',
      sizeType: sizeType,
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
};

export const httpDeleteGoods = async (
  request: NextRequest,
  params: { params: { id: string } },
) => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: true, message: responseMessages.user.forbidden },
      {
        status: responseMessages.codes[401],
      },
    );
  }

  try {
    await connectToDatabase();

    await deleteGoodsById(params.params.id);

    return NextResponse.json({
      status: responseMessages.codes[200],
    });
  } catch (error) {
    console.error('Error during DELETE goods:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};
