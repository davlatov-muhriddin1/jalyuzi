import { pinata } from "@/utils/config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("images") as unknown as File;
    const uploadData = await pinata.upload.file(file);

    const url = await pinata.gateways.createSignedURL({
      cid: uploadData.cid,
      expires: 3600,
    });

    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error });
  }
}
