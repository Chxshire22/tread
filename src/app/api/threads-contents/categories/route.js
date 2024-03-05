import { NextResponse } from "next/server";
import { Threads_Contents_Category } from "@/app/models";

export async function GET() {
  try {
    const threads_contents_categories = await Threads_Contents_Category.findAll();
    return NextResponse.json(threads_contents_categories);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { threadContentCategories } = await request.json();
  console.log(threadContentCategories);
  try {
    const createContentCategories = await Threads_Contents_Category.bulkCreate(
      threadContentCategories.map((category) => ({
        threadsContentsId: category.threadsContentsId,
        categoriesId: category.categoriesId,
      }))
    );
    if (createContentCategories) console.log("categories successfully stored");
    return NextResponse.json({
      success: true,
      msg: "good job big boy",
    });
  } catch (err) {
    return NextResponse.json({ success: false, msg: err });
  }
}
