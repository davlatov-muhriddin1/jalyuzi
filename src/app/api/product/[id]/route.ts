import Product from "@/lib/models/Product";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const singleProduct = await Product.findById(params.id);

    if (!singleProduct) {
      return NextResponse.json({ message: "Mahsulot topilmadi" });
    }

    return NextResponse.json({
      message: "Mahsulot olindi",
      product: singleProduct,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error });
  }
}
