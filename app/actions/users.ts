"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function updateUserAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
) {
  const session = await getSession();
  if (!session || !session.admin) {
    return { error: "Unauthorized. Admin access required." };
  }

  const userId = Number(formData.get("userId"));
  const username = (formData.get("username") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const degree = Number(formData.get("degree"));
  const admin = formData.get("admin") === "on";

  if (!username || !email) {
    return { error: "Username and email are required." };
  }

  if (isNaN(degree) || degree < 0) {
    return { error: "Degree must be a valid number." };
  }

  try {
    const existing = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: userId },
      },
    });

    if (existing) {
      return { error: "A user with that email already exists." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { username, email, degree, admin },
    });

    revalidatePath("/users");
    return { success: `User "${username}" updated successfully.` };
  } catch {
    return { error: "Failed to update user. Please try again." };
  }
}

export async function changePasswordAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
) {
  const session = await getSession();
  if (!session || !session.admin) {
    return { error: "Unauthorized. Admin access required." };
  }

  const userId = Number(formData.get("userId"));
  const newPassword = (formData.get("newPassword") as string)?.trim();
  const confirmPassword = (formData.get("confirmPassword") as string)?.trim();

  if (!newPassword || !confirmPassword) {
    return { error: "Both password fields are required." };
  }

  if (newPassword.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { error: "User not found." };
    }

    // Note: In this simple auth system, the password is shared (admin123).
    // This action is a placeholder for when per-user passwords are added to the schema.
    // For now, it validates the form and returns success.
    return { success: `Password change acknowledged for user ID ${userId}. Per-user passwords require a schema update.` };
  } catch {
    return { error: "Failed to change password. Please try again." };
  }
}
