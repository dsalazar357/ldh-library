import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ritualId = Number(id);

  if (isNaN(ritualId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const ritual = await prisma.ritual.findUnique({
    where: { id: ritualId },
  });

  if (!ritual) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Fetch the file from Cloudinary and serve it inline
  const fileResponse = await fetch(ritual.url);

  if (!fileResponse.ok) {
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 502 }
    );
  }

  const contentType =
    fileResponse.headers.get("content-type") || "application/octet-stream";
  const body = fileResponse.body;

  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${encodeURIComponent(ritual.title)}"`,
    },
  });
}
