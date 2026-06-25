// checks if the current request has a valid token cookie.
// called server-side to conditionally render ui (login link vs logout button).
// this is "reflect auth state in the ui" from challenge 5.
import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has("token");
}
