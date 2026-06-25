// server actions for auth. each function runs on the next.js server, never the browser.
// "use server" at the top makes every exported function a server action.
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthResponse, User } from "./types";

const API_URL = process.env.DARKBAY_API_URL;

// ── LOGIN ──────────────────────────────────────────────────
// called when the login form submits. form action={loginAction}.
// 1. sends credentials to darkbay's login endpoint
// 2. gets back { access_token } (snake_case — starter quirk)
// 3. stores the token in an httpOnly cookie (js can't read it — xss safe)
// 4. redirects to home

type LoginState = { error?: string } | undefined;

export async function loginAction(formData: FormData): Promise<void> {
  const username = formData.get("username");
  const password = formData.get("password");

  // basic gate — darkbay would reject anyway, but we fail fast
  if (!username || !password) {
    throw new Error("Username and password are required.");
  }

  // call darkbay's login endpoint. localAuthGuard validates bcrypt, jwt guard signs the token.
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  // 401 = wrong credentials. throw to surface as error boundary.
  if (!res.ok) {
    throw new Error("Invalid username or password.");
  }

  // extract the token. ⚠️ snake_case "access_token" — not camelCase.
  // this is the starter's dto shape, confirmed against auth-response.dto.ts.
  const { access_token } = (await res.json()) as AuthResponse;

  // store in httpOnly cookie. the browser can't read this via document.cookie.
  // only the next.js server can read it (via cookies()) → fetchAPI injects it as bearer.
  // secure + sameSite for production https on vercel.
  const cookieStore = await cookies();
  cookieStore.set("token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24h — matches jwt_expires_in
  });

  // redirect after successful login. must happen outside try/catch (next.js throws internally).
  redirect("/");
}

// ── REGISTER ───────────────────────────────────────────────
// called when the register form submits.
// 1. sends username + password to darkbay's register endpoint
// 2. on success, redirects to login (user must log in to get a token)
// 3. on failure (e.g. username taken), returns an error message

export async function registerAction(formData: FormData): Promise<void> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    throw new Error("Username and password are required.");
  }

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  // 409 = username already exists. darkbay's validation pipe rejects duplicates.
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message?.[0] ?? "Registration failed. Username may be taken.");
  }

  // redirect to login — registration doesn't return a token, only a user object.
  // the user must log in to get a jwt.
  redirect("/login");
}

// ── LOGOUT ─────────────────────────────────────────────────
// deletes the cookie. the jwt itself is stateless — it lives until expiry.
// but without the cookie, the server can't inject the bearer header → effectively logged out.
// (in production you'd also want a token blacklist, but that's out of scope here.)

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/");
}
