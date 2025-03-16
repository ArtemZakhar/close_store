import { getSession } from '@/helpers/getSession';
import { connectToDatabase } from '@/lib/mongoDb';
import {
  CartTableGoodsType,
  GoodsDetails,
  GoodsDetailsItemType,
  GoodsQuantityAndCount,
  GoodsSchemaType,
  NewGoodFormType,
  SoldGoodsSchema,
  UpdateGoodsFormType,
} from '@/types/goods/good';
import { SellerType } from '@/types/goods/seller';
import { GoodsInCartType } from '@/types/localStorage/goods';
import { UserRole } from '@/types/users/userType';

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

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
  getPopulatedGoods,
  updateGoods,
  updateMany,
} from './goods.service';
import { handleLocationUpdate } from './helpers/handleLocation';
import { handleSearchParams } from './helpers/handleSearchParams';
import { handleSellerData, updateSeller } from './sellers/seller.service';
import { sellGoods } from './sold/soldGoods.service';

export const httpGetGoods = async (request: NextRequest) => {
  try {
    const newUrl = new URL(request.url);

    const queryParams = newUrl.searchParams;

    let owner = queryParams.get('owner') || undefined;
    let role = queryParams.get('role');

    if (!role || !owner) {
      const session = await getSession();
      if (!session || !session.owner) {
        return NextResponse.json(
          { error: true, message: responseMessages.user.forbidden },
          {
            status: responseMessages.codes[401],
          },
        );
      }

      role = session.role;
      owner = session.owner;
    }

    await connectToDatabase();

    const searchParams = await handleSearchParams({ queryParams });

    let goods: GoodsSchemaType[] = [];

    if (role === UserRole.owner) {
      goods = await getPopulatedGoods({ ...searchParams, owner: owner });
    }

    if (role === UserRole.seller) {
      goods = await getPopulatedGoods({ ...searchParams, owner });
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

export const httpGetGoodsById = async (
  request: NextRequest,
  params: { params: { id: string } },
) => {
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

    const owner = session.owner ? session.owner : session.id;

    const goods = await findOneGoodsByParams({
      _id: params.params.id,
      owner: new ObjectId(owner),
    });

    return NextResponse.json(goods, { status: responseMessages.codes[200] });
  } catch (error) {
    console.error('Error during GET goods by id:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};

export const httpPutNewGoods = async (request: NextRequest) => {
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
      sellerCode,
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
      owner: new ObjectId(session.id),
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
      sellerCode: sellerCode ?? '',
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
  const isAllowedToDelete =
    session?.role === UserRole.seller || session?.role === UserRole.owner;

  if (!session || !isAllowedToDelete) {
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

    return NextResponse.json(
      { message: responseMessages.goods.delete },
      {
        status: responseMessages.codes[200],
      },
    );
  } catch (error) {
    console.error('Error during DELETE goods:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};

export const httpUpdateGoods = async (
  request: NextRequest,
  params: { params: { id: string } },
) => {
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
      sellerCode,
    } = body;

    if (!_id || _id !== params.params.id) {
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

    if (sellerCode) {
      goodsToUpdate['sellerCode'] = sellerCode;
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
      const normalizedGoodsDetails = Object.entries(goodsDetails).reduce(
        (acc, [key, value]) => {
          const newValue: GoodsDetailsItemType = {
            color: value.color,
            incomePriceGRN: value.incomePriceGRN,
            incomePriceUSD: value.incomePriceUSD,
            outcomePrice: value.outcomePrice,
            countAndSizes: value.countAndSizes.filter((item) => item.count > 0),
          };
          acc[key] = newValue;

          return acc;
        },
        {} as GoodsDetails,
      );

      goodsToUpdate['goodsDetails'] = normalizedGoodsDetails;
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

    await updateGoods(
      _id,
      session.owner ? session.owner : session.id,
      goodsToUpdate,
    );

    return NextResponse.json({ status: responseMessages.codes[200] });
  } catch (error) {
    console.error('Error during Updating goods:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};

export const httpGetGoodsForCart = async (request: NextRequest) => {
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
    const data: GoodsInCartType[] = await request.json();

    const searchParams = {
      $or: data.map((param) => ({
        _id: param._id,
        [`goodsDetails.${param.goodsDetailsKey}.color`]: param.color,
        [`goodsDetails.${param.goodsDetailsKey}.countAndSizes`]: {
          $elemMatch: { size: param.size },
        },
      })),
    };

    const goods = await getPopulatedGoods(searchParams);

    return NextResponse.json(goods, { status: responseMessages.codes[200] });
  } catch (error) {
    console.error('Error during FETCHING goods for cart:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};

export const httpPatchSellGoods = async (request: NextRequest) => {
  await connectToDatabase();

  const mongooseSession = await mongoose.startSession();
  mongooseSession.startTransaction();

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

    const data: CartTableGoodsType[] = await request.json();

    const searchParams = {
      $or: data.map(({ goods, key, size, color }) => ({
        _id: goods._id,
        owner: session.owner ? session.owner : session.id,
        [`goodsDetails.${key}.color`]: color,
        [`goodsDetails.${key}.countAndSizes`]: {
          $elemMatch: { size },
        },
      })),
    };

    const existingGoods: GoodsSchemaType[] =
      await getGoodsByParams(searchParams).lean();

    const dataForSellingGoods: SoldGoodsSchema[] = data.map(
      ({ goods, key, size, count }) => {
        const details = goods.goodsDetails[key];
        return {
          code: goods.code,
          model: goods.model,
          sellerCode: goods.sellerCode,
          firm: goods.firm.name,
          category: new ObjectId(goods.category._id),
          owner: new ObjectId(goods.owner),
          seller: new ObjectId(goods.seller._id),
          color: details.color,
          incomePriceGRN: details.incomePriceGRN,
          incomePriceUSD: details.incomePriceUSD,
          outcomePrice: details.outcomePrice,
          size,
          count,
        };
      },
    );

    const goodsToUpdate = existingGoods.reduce(
      (acc, elem) => {
        const changes = data.filter((item) => item._id === elem._id.toString());
        if (changes.length) {
          const newGoodsDetails = elem.goodsDetails;

          for (const change of changes) {
            for (const [key, value] of Object.entries(elem.goodsDetails)) {
              if (newGoodsDetails[key]._id?.toString() !== change.itemId)
                continue;

              const newCountAndSizes = value.countAndSizes.reduce((acc, i) => {
                if (i.size === change.size) {
                  const newValue = i.count - change.count;

                  if (newValue === 0) {
                    return acc;
                  }

                  acc.push({ count: newValue, size: i.size });
                } else {
                  acc.push(i);
                }
                return acc;
              }, [] as GoodsQuantityAndCount[]);

              newGoodsDetails[key] = {
                ...newGoodsDetails[key],
                countAndSizes: newCountAndSizes,
              };
            }
          }

          acc.push({
            _id: elem._id,
            owner: elem.owner,
            goodsDetails: newGoodsDetails,
          });
        }

        return acc;
      },
      [] as Pick<GoodsSchemaType, '_id' | 'owner' | 'goodsDetails'>[],
    );

    await sellGoods(dataForSellingGoods, mongooseSession);

    await updateMany(goodsToUpdate, mongooseSession);

    await mongooseSession.commitTransaction();
    await mongooseSession.endSession();

    return NextResponse.json({ status: responseMessages.codes[200] });
  } catch (error) {
    await mongooseSession.abortTransaction();
    await mongooseSession.endSession();
    console.error('Error during SELLING goods:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};
