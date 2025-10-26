import { redirect } from "next/navigation";

export const handleErrorRedirect = (status: number) => {
  if (status === 404) redirect("/error/not-found");
  if (status === 401) redirect("/error/unauthorized");
  if (status >= 500) redirect("/error/server-error");
};
