"use server";

import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function uploadStudyDocumentAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized. Please sign in." };
  }

  const title = (formData.get("title") as string)?.trim();
  const organization = (formData.get("organization") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const file = formData.get("file") as File | null;

  if (!title) {
    return { error: "Title is required." };
  }
  if (!organization) {
    return { error: "Organization is required." };
  }
  if (!description) {
    return { error: "Description is required." };
  }
  if (!file || file.size === 0) {
    return { error: "Please select a file to upload." };
  }

  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    return { error: "File must be smaller than 50MB." };
  }

  try {
    const user = await prisma.user.findFirst({
      where: { username: session.username },
    });

    if (!user) {
      return { error: "User not found." };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "ldh-library/study-documents",
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

    await prisma.studyDocument.create({
      data: {
        title,
        organization,
        description,
        url: uploadResult.secure_url,
        cloudinaryPublicId: uploadResult.public_id,
        authorId: user.id,
      },
    });

    revalidatePath("/");
    revalidatePath("/study-documents");
    revalidatePath("/study-documents/upload");
    return { success: `Study document "${title}" uploaded successfully.` };
  } catch (err) {
    console.error("Upload error:", err);
    return { error: "Failed to upload document. Please try again." };
  }
}

export async function deleteStudyDocumentAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
) {
  const session = await getSession();
  if (!session || !session.admin) {
    return { error: "Unauthorized. Admin access required." };
  }

  const documentId = Number(formData.get("documentId"));

  if (isNaN(documentId)) {
    return { error: "Invalid document ID." };
  }

  try {
    const doc = await prisma.studyDocument.findUnique({
      where: { id: documentId },
    });

    if (!doc) {
      return { error: "Document not found." };
    }

    if (doc.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(doc.cloudinaryPublicId, {
          resource_type: "raw",
        });
      } catch {
        try {
          await cloudinary.uploader.destroy(doc.cloudinaryPublicId);
        } catch {
          console.error(
            "Failed to delete from Cloudinary:",
            doc.cloudinaryPublicId
          );
        }
      }
    }

    await prisma.studyDocument.delete({
      where: { id: documentId },
    });

    revalidatePath("/");
    revalidatePath("/study-documents");
    return { success: `Document "${doc.title}" deleted successfully.` };
  } catch (err) {
    console.error("Delete error:", err);
    return { error: "Failed to delete document. Please try again." };
  }
}
