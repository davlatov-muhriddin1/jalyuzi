import Product from "@/lib/models/Product";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { id: string } }) {
  try {
    dbConnect();

    const singleProduct = await Product.findById(route.params.id);

    if (!singleProduct) {
      return NextResponse.json({ message: "Mahsulot topilmadi" });
    }

    return NextResponse.json({
      message: "Mahsulot olindi",
      product: singleProduct,
    });
  } catch (error) {
    NextResponse.json({ message: "Server Error", error });
  }
}

export async function DELETE(req: Request, route: { params: { id: string } }) {
  try {
    await dbConnect();

    await Product.findByIdAndDelete(route.params.id);

    return NextResponse.json({ message: "Mahsulot ochirildi" });
  } catch (error) {
    NextResponse.json({ message: "Server Error", error });
  }
}
