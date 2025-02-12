import { getSession } from '@/helpers/getSession';
import { connectToDatabase } from '@/lib/mongoDb';
import {
  GoodsDetails,
  GoodsDetailsItemType,
  GoodsSchemaType,
  NewGoodFormType,
  UpdateGoodsFormType,
} from '@/types/goods/good';
import { SellerType } from '@/types/goods/seller';
import { UserRole } from '@/types/users/userType';

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { ObjectId } from 'mongodb';

import { findCityAndUpdate } from '../cities/cities.serivce';
import { responseMessages } from '../constants/responseMessages';
import { findCountryAndUpdate } from '../countries/countries.service';
import { findCategoryAndUpdate } from './categories/category.sevice';
import { createFirm, findFirm, updateFirm } from './firms/firm.service';
import {
  createNewGoods,
  deleteGoodsById,
  findOneGoodsByParams,
  getGoodsByParams,
  updateGoods,
} from './goods.service';
import { handleLocationUpdate } from './helpers/handleLocation';
import { handleSearchParams } from './helpers/handleSearchParams';
import { handleSellerData, updateSeller } from './sellers/seller.service';

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
      arrivalDate,
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

    if (!firm.name && !firm.countryOfOrigin) {
      return NextResponse.json(
        {
          error: true,
          message: responseMessages.goods.firm.noData,
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

    const normalizedGoodsDetails: GoodsDetails = {};

    for (const color in goodsDetails) {
      const value = goodsDetails[color];

      const newValue: GoodsDetailsItemType = {
        color: value.color,
        incomePriceGRN: value.incomePriceGRN,
        incomePriceUSD: value.incomePriceUSD,
        outcomePrice: value.outcomePrice,
        countAndSizes: value.countAndSizes.filter((item) => item.count > 0),
      };

      normalizedGoodsDetails[color] = newValue;
    }

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
      goodsDetails: normalizedGoodsDetails,
      stored: stored ?? '',
      notes: notes ?? '',
      buyDate: buyDate ?? '',
      sizeType: sizeType,
      arrivalDate: arrivalDate ?? '',
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

export const httpUpdateGoods = async (request: NextRequest) => {
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
    await connectToDatabase();

    const body: Partial<UpdateGoodsFormType> = await request.json();

    const {
      _id,
      seller,
      subCategory,
      firm,
      description,
      model,
      goodsDetails,
      season,
      buyDate,
      arrivalDate,
      notes,
      stored,
    } = body;

    if (!_id) {
      return NextResponse.json(
        { error: true, message: responseMessages.goods.exist },
        {
          status: responseMessages.codes[404],
        },
      );
    }

    const goodsToUpdate: Partial<GoodsSchemaType> = {};

    if (seller) {
      const { _id, phone, email, city, country, name } = seller;

      const dataToUpdate: Partial<SellerType> = {
        email,
        phone,
        name,
      };

      if (city) {
        const newCity = await findCityAndUpdate({
          searchParams: { name: city },
          dataToUpdate: { name: city },
        });

        if (newCity) {
          dataToUpdate['city'] = newCity._id;
        }
      }

      if (country) {
        const newCountry = await findCountryAndUpdate({
          searchParams: { name: country },
          dataToUpdate: { name: country },
        });

        if (newCountry) {
          dataToUpdate['country'] = newCountry._id;
        }
      }

      await updateSeller({
        searchParam: { _id },
        dataToUpdate: { $set: dataToUpdate },
      });
    }

    if (subCategory) {
      goodsToUpdate['subCategory'] = subCategory;
    }

    if (firm) {
      const { _id, ...dataToUpdate } = firm;

      if (_id) {
        const updatedFirm = await updateFirm({
          searchParam: { _id },
          dataToUpdate,
        });

        if (updatedFirm) {
          goodsToUpdate['firm'] = updatedFirm._id;
        }
      } else {
        if (dataToUpdate.name && dataToUpdate.countryOfOrigin) {
          let countryId;

          if (typeof dataToUpdate.countryOfOrigin === 'string') {
            const newCountry = await findCountryAndUpdate({
              searchParams: { name: dataToUpdate.countryOfOrigin },
              dataToUpdate: { name: dataToUpdate.countryOfOrigin },
            });

            if (newCountry) {
              countryId = newCountry._id;
            } else {
              throw new Error('Failed to create the firm country');
            }
          } else {
            countryId = dataToUpdate.countryOfOrigin._id;
          }

          const newFirm = await createFirm({
            name: dataToUpdate.name,
            countryOfOrigin: countryId,
          });

          goodsToUpdate['firm'] = newFirm._id;
        } else {
          return NextResponse.json(
            {
              error: true,
              message: responseMessages.goods.firm.noData,
            },
            { status: responseMessages.codes[503] },
          );
        }
      }
    }

    if (description) {
      goodsToUpdate['description'] = description;
    }

    if (model) {
      goodsToUpdate['model'] = model;
    }

    if (goodsDetails) {
      goodsToUpdate['goodsDetails'] = goodsDetails;
    }

    if (season) {
      goodsToUpdate['season'] = season.name;
    }

    if (buyDate) {
      goodsToUpdate['buyDate'] = buyDate;
    }

    if (arrivalDate) {
      goodsToUpdate['arrivalDate'] = arrivalDate;
    }

    if (notes) {
      goodsToUpdate['notes'] = notes;
    }

    if (stored) {
      goodsToUpdate['stored'] = stored;
    }

    await updateGoods(_id, goodsToUpdate);

    return NextResponse.json({ status: responseMessages.codes[200] });
  } catch (error) {
    console.error('Error during Updating goods:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};
