import { NextResponse } from "next/server";
import Threads_Contents_Category from "../../../models/Threads_Contents_Category";

export async function GET() {
  try {
    const threads_contents_categories = await Threads_Contents_Category.findAll();
    return NextResponse.json(threads_contents_categories);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { threadsContentsId, categoriesId } = await request.json();
  try {
    const threads_contents_category = await Threads_Contents_Category.create({
      threadsContentsId: threadsContentsId,
      categoriesId: categoriesId
    });
    return NextResponse.json(threads_contents_category);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
