// challenge 5 — login page.
// uses a server action (loginAction) as the form action. no client-side js.
// on submit: loginAction calls darkbay, stores jwt in httpOnly cookie, redirects home.
import { loginAction } from "@/lib/authActions";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 max-w-md mx-auto flex flex-col justify-center">
      <h1 className="text-2xl font-bold uppercase tracking-tight mb-6">
        Access <span className="text-red-500 font-mono">Terminal</span>
      </h1>

      {/* the form action is a server function. next.js handles the post automatically.
          no fetch, no usestate, no onsubmit. just action={loginaction}. */}
      <form action={loginAction}>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs uppercase font-mono text-neutral-400">
              Username
            </label>
            {/* name="username" → loginaction reads it via formData.get("username") */}
            <input
              id="username"
              name="username"
              type="text"
              required
              className="h-8 rounded-lg border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs uppercase font-mono text-neutral-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="h-8 rounded-lg border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700 uppercase font-mono tracking-wider text-xs">
            Authenticate
          </Button>
        </div>
      </form>

      <p className="text-xs text-neutral-500 mt-6 text-center">
        No access?{" "}
        <a href="/register" className="text-red-400 hover:underline">Request entry</a>
      </p>
    </main>
  );
}
