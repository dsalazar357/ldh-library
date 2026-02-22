import { cookies } from "next/headers";
import bcrypt from "bcrypt";

const SESSION_COOKIE = "ldh-session";
const SALT_ROUNDS = 10;

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function createSession(username: string, admin: boolean) {
  const cookieStore = await cookies();
  const sessionData = Buffer.from(
    JSON.stringify({ username, admin, loggedInAt: Date.now() })
  ).toString("base64");

  cookieStore.set(SESSION_COOKIE, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function getSession(): Promise<{
  username: string;
  admin: boolean;
  loggedInAt: number;
} | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session?.value) return null;

  try {
    return JSON.parse(Buffer.from(session.value, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
