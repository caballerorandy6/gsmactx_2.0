import { verifyToken } from "@/libs/verifyToken";
import { prisma } from "@/libs/prisma";
import { CurrentAdmin } from "@/libs/types";

export async function getCurrentUser(
  token: string | undefined
): Promise<CurrentAdmin | null> {
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

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
