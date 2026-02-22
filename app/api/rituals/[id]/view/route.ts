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

  // For Cloudinary URLs, transform to enable inline viewing
  // Raw uploads need fl_attachment:false to open in browser
  let viewUrl = ritual.url;

  if (viewUrl.includes("res.cloudinary.com")) {
    // Insert fl_attachment:false flag after /upload/ to force inline display
    viewUrl = viewUrl.replace("/upload/", "/upload/fl_attachment:false/");
  }

  return NextResponse.redirect(viewUrl);
}
