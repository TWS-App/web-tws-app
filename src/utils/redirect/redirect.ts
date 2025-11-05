import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const handleErrorRedirect = (status: number) => {
  if (status === 404) NextResponse.rewrite(new URL("/error/not-found"));
  if (status === 401) NextResponse.rewrite(new URL("/error/unauthorized"));
  if (status >= 500) NextResponse.rewrite(new URL("/error/internal"));
};
