import { connectToDatabase } from '@/lib/mongoDb';
import Category from '@/models/goods/Categories';
import { CategoryTypeSchema } from '@/types/goods/category';

import { NextRequest, NextResponse } from 'next/server';

import { responseMessages } from '../../../constants/responseMessages';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();

    const { id } = params;

    const body: Partial<CategoryTypeSchema> = await request.json();

    const { ...propertiesForUpdate } = body;

    if (!id || !Object.values(propertiesForUpdate).length) {
      return NextResponse.json(
        {
          error: responseMessages.goods.category.noData,
        },
        { status: responseMessages.codes[503] },
      );
    }

    const category = await Category.findById<CategoryTypeSchema>(id);

    if (!category) {
      return NextResponse.json(
        { error: responseMessages.goods.category.notExist },
        { status: responseMessages.codes[404] },
      );
    }

    if (propertiesForUpdate.subCategory) {
      propertiesForUpdate.subCategory = [
        ...category.subCategory,
        ...propertiesForUpdate.subCategory,
      ];
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id },
      { $set: propertiesForUpdate },
      { new: true },
    );

    return NextResponse.json(updatedCategory, {
      status: responseMessages.codes[201],
    });
  } catch (error) {
    console.error('Error during PATCH request:', error);

    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}
