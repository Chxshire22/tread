import { NextResponse } from "next/server";
import Threads_Contents_Category from "../../../models/Threads_Contents_Category";

export async function GET() {
  try {
    const threads_contents_categories =
      await Threads_Contents_Category.findAll();
    return NextResponse.json(threads_contents_categories);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { threadContentCategories } = await request.json();
  try {
    const uploadListingImages = await Threads_Contents_Category.bulkCreate(
      listingImages.map((listingImage) => ({
        threadsContentsId: listingImage.threadsContentsId,
        categoriesId: listingImage.categoriesId,
      }))
    );
    if (uploadListingImages) console.log("images uploaded to backend");
    return res.json({ success: true, msg: "images uploaded to backend" });
  } catch (err) {
    return res.json({ success: false, msg: err });
  }

}
