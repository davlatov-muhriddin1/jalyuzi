import Product from "@/lib/models/Product";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { imgs, title, description, price } = await req.json();

    if (!imgs || !title || !description || !price) {
      return NextResponse.json({
        message: "Iltimos barcha bo'limlarni to'ldiring",
      });
    }

    const newProduct = await Product.create({
      imgs,
      title,
      description,
      price,
    });

    return NextResponse.json({ message: "Mahsulod ro'yxatga qo'shildi" });
  } catch (error) {
    NextResponse.json({ message: "Server Error", error });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const allProducts = await Product.find({});

    return NextResponse.json({
      message: "Mahsulotlar olindi",
      products: allProducts,
    });
  } catch (error) {
    NextResponse.json({ message: "Server Error", error });
  }
}