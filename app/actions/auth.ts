"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  const user = await prisma.user.findFirst({
    where: { username },
  });

  if (!user) {
    return { error: "User not found." };
  }

  const isValid = await verifyPassword(password);

  if (!isValid) {
    return { error: "Invalid password." };
  }

  await createSession(username, user.admin);
  redirect("/");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
