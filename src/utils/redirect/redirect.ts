import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const handleErrorRedirect = (status: number) => {
  if (status === 404) NextResponse.rewrite(new URL("/errorpage/not-found"));
  if (status === 401) NextResponse.rewrite(new URL("/errorpage/unauthorized"));
  if (status >= 500) NextResponse.rewrite(new URL("/errorpage/internal"));
};
