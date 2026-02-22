"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSession, hashPassword } from "@/lib/auth";

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

export async function createUserAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
) {
  const session = await getSession();
  if (!session || !session.admin) {
    return { error: "Unauthorized. Admin access required." };
  }

  const username = (formData.get("username") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();
  const degree = Number(formData.get("degree"));
  const admin = formData.get("admin") === "on";

  if (!username) {
    return { error: "Username is required." };
  }

  if (!email) {
    return { error: "Email is required." };
  }

  if (!password) {
    return { error: "Password is required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (isNaN(degree) || degree < 0) {
    return { error: "Degree must be a valid number (0 or greater)." };
  }

  try {
    const existing = await prisma.user.findFirst({
      where: { email },
    });

    if (existing) {
      return { error: "A user with that email already exists." };
    }

    const existingUsername = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUsername) {
      return { error: "A user with that username already exists." };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: { username, email, password: hashedPassword, degree, admin },
    });

    revalidatePath("/users");
    revalidatePath("/users/create");
    return { success: `User "${username}" created successfully.` };
  } catch {
    return { error: "Failed to create user. Please try again." };
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

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    revalidatePath("/users");
    return { success: `Password updated successfully for "${user.username}".` };
  } catch {
    return { error: "Failed to change password. Please try again." };
  }
}
