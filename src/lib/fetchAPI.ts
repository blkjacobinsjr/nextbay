// the one bridge between nextbay and darkbay.
// reads the jwt from the httpOnly cookie and injects it as a bearer header.
// this is "the tricky gel" — the cookie→header translation felix stressed.
import { cookies } from "next/headers";

// the base url from .env. server-side only, never reaches the browser.
const API_URL = process.env.DARKBAY_API_URL;

// generic fetch wrapper. every darkbay call goes through here.
// path = "/auctions", options = { method, body, headers, ... }
export async function fetchAPI(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  // cookies() is async in next 15+. reads the incoming request's cookie header.
  // the cookie was set by loginAction after a successful login.
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // clone existing headers so we don't mutate the caller's object
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  // if a token exists, attach it as bearer. darkbay's jwt guard reads this.
  // public routes (list, detail) work without it. protected routes (create, bid) need it.
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // forward the request to darkbay. the browser never sees the token — only the server does.
  return fetch(`${API_URL}${path}`, { ...options, headers });
}
