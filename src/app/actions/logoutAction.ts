"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token"); // Elimina la cookie
  redirect("/login"); // Redirige al login o donde prefieras
}
