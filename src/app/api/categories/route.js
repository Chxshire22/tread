import { NextResponse } from "next/server";
import Category from "../../models/Category";

export async function GET() {
  try {
    const categories = await Category.findAll();
    return NextResponse.json(categories);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { name } = await request.json();
  try {
    const category = await Category.create({
      name
    });
    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
