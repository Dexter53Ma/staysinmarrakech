import { createSupabaseServer } from "@/lib/supabase-server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { UserRole } from "@prisma/client";

export async function getUser() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
  });

  return dbUser;
}

export async function requireAdmin() {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  if (user.role !== "ADMIN" as UserRole) {
    throw new Error("Forbidden");
  }
  return user;
}

export async function requireApiAuth() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, dbUser: null, error: NextResponse.json({ error: "Non autorisé" }, { status: 401 }) };
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
  });

  return { user, dbUser, error: null };
}

export async function requireAdminApi() {
  const { user, dbUser, error } = await requireApiAuth();
  if (error) return { user: null, dbUser: null, error };
  if (!dbUser || dbUser.role !== "ADMIN" as UserRole) {
    return { user: null, dbUser: null, error: NextResponse.json({ error: "Accès refusé" }, { status: 403 }) };
  }
  return { user, dbUser, error: null };
}

export async function requireRole(role: UserRole) {
  const dbUser = await requireAdmin();
  if (dbUser.role !== role) {
    throw new Error("Forbidden");
  }
  return dbUser;
}
