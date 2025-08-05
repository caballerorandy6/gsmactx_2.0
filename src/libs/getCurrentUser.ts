import { cookies } from "next/headers";
import { verifyToken } from "@/libs/verifyToken";
import { prisma } from "@/libs/prisma";
import { CurrentAdmin } from "@/libs/types";

export async function getCurrentUser(): Promise<CurrentAdmin | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  // Verify the token
  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Fetch the user from the database
  const admin = await prisma.admin.findUnique({
    where: { id: decoded.id.toString() },
  });

  if (!admin) return null;

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
  };
}
