import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { file } = body;

  // тут просто повертаємо base64
  // в проді → Cloudinary / S3
  return NextResponse.json({ url: file });
}
