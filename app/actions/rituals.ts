"use server";

import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function uploadRitualAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
) {
  const session = await getSession();
  if (!session || !session.admin) {
    return { error: "Unauthorized. Admin access required." };
  }

  const title = (formData.get("title") as string)?.trim();
  const degree = Number(formData.get("degree"));
  const country = (formData.get("country") as string)?.trim();
  const file = formData.get("file") as File | null;

  if (!title) {
    return { error: "Title is required." };
  }
  if (isNaN(degree) || degree < 0) {
    return { error: "Degree must be a valid number (0 or greater)." };
  }
  if (!country) {
    return { error: "Country is required." };
  }
  if (!file || file.size === 0) {
    return { error: "Please select a file to upload." };
  }

  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    return { error: "File must be smaller than 50MB." };
  }

  try {
    // Find the admin user to set as author
    const user = await prisma.user.findFirst({
      where: { username: session.username },
    });

    if (!user) {
      return { error: "User not found." };
    }

    // Upload to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "ldh-library/rituals",
            resource_type: "auto",
            public_id: `${title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`,
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Upload failed"));
            } else {
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
            }
          }
        )
        .end(buffer);
    });

    await prisma.ritual.create({
      data: {
        title,
        degree,
        country,
        url: uploadResult.secure_url,
        cloudinaryPublicId: uploadResult.public_id,
        authorId: user.id,
      },
    });

    revalidatePath("/");
    revalidatePath("/rituals");
    revalidatePath("/rituals/upload");
    return { success: `Ritual "${title}" uploaded successfully.` };
  } catch (err) {
    console.error("Upload error:", err);
    return { error: "Failed to upload ritual. Please try again." };
  }
}

export async function deleteRitualAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
) {
  const session = await getSession();
  if (!session || !session.admin) {
    return { error: "Unauthorized. Admin access required." };
  }

  const ritualId = Number(formData.get("ritualId"));

  if (isNaN(ritualId)) {
    return { error: "Invalid ritual ID." };
  }

  try {
    const ritual = await prisma.ritual.findUnique({
      where: { id: ritualId },
    });

    if (!ritual) {
      return { error: "Ritual not found." };
    }

    // Delete from Cloudinary if we have a public ID
    if (ritual.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(ritual.cloudinaryPublicId, {
          resource_type: "raw",
        });
      } catch {
        // Try image type if raw fails
        try {
          await cloudinary.uploader.destroy(ritual.cloudinaryPublicId);
        } catch {
          // Continue with DB deletion even if Cloudinary fails
          console.error(
            "Failed to delete from Cloudinary:",
            ritual.cloudinaryPublicId
          );
        }
      }
    }

    // Delete from database
    await prisma.ritual.delete({
      where: { id: ritualId },
    });

    revalidatePath("/");
    revalidatePath("/rituals");
    return { success: `Ritual "${ritual.title}" deleted successfully.` };
  } catch (err) {
    console.error("Delete error:", err);
    return { error: "Failed to delete ritual. Please try again." };
  }
}
