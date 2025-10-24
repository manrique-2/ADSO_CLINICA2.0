import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = new URLSearchParams();

  const page = searchParams.get("page");
  const selectedDate = searchParams.get("date");

  if (page) {
    query.set("page", page);
  }
  if (selectedDate) {
    query.set("date", selectedDate);
  }

  const url = `/api/cierre-de-caja/?${query.toString()}`;
  console.log("Fetching cierre de caja from URL:", url);

  return await authFetchWithCookies(url);
}