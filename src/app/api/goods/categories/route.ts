import { getSession } from '@/helpers/getSession';
import { connectToDatabase } from '@/lib/mongoDb';
import Category from '@/models/goods/Categories';
import { CategoryTypeSchema } from '@/types/goods/category';
import { UserRole } from '@/types/users/userType';

import { NextRequest, NextResponse } from 'next/server';

import { responseMessages } from '../../constants/responseMessages';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const newUrl = new URL(request.url);

    const queryParams = newUrl.searchParams;

    let owner = queryParams.get('owner');
    let role = queryParams.get('role');
    let id = queryParams.get('id');

    if (!id) {
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
      owner = session.owner;
    }

    const categoryOwner = role === UserRole.owner ? id : owner;

    const categories = await Category.find({ owner: categoryOwner }).lean();

    return NextResponse.json(categories, {
      status: responseMessages.codes[200],
    });
  } catch (error) {
    console.error('Error during GET Categories request:', error);

    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: true, message: responseMessages.user.forbidden },
        {
          status: responseMessages.codes[401],
        },
      );
    }

    const body: Omit<CategoryTypeSchema, '_id' | 'lastId'> =
      await request.json();

    if (!body.icon || !body.name || !body.uniqueId || !body.url) {
      return NextResponse.json(
        { error: responseMessages.goods.category.noData },
        { status: responseMessages.codes[503] },
      );
    }

    const existingCategory = await Category.findOne({
      $or: [{ name: body.name }, { uniqueId: body.uniqueId }],
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: responseMessages.goods.category.exist },
        { status: responseMessages.codes[409] },
      );
    }

    const newCategory = await Category.create({
      name: body.name,
      uniqueId: body.uniqueId,
      icon: body.icon,
      lastId: 0,
      url: body.url,
      owner: session.id,
    });

    await newCategory.save();

    return NextResponse.json(newCategory, {
      status: responseMessages.codes[201],
    });
  } catch (error) {
    console.error('Error during POST request:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}
