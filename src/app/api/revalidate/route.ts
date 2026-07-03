import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth";

export async function POST() {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
