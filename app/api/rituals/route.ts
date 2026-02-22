import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth"; // adjust path if needed

export async function POST(req: NextRequest) {
  try {
    // Get session and resolve authorId from username
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { username: session.username },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const degree = formData.get("degree") as string;
    const country = formData.get("country") as string;

    if (!file || !title || !degree || !country) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
      "video/webm",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF and video files are allowed." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const { url } = await uploadToCloudinary(buffer, file.name);

    const ritual = await prisma.ritual.create({
      data: {
        title,
        degree: parseInt(degree, 10),
        country,
        url,
        authorId: user.id,
      },
    });

    return NextResponse.json({ success: true, ritual }, { status: 201 });
  } catch (err: unknown) {
    console.error("[ritual upload error]", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}