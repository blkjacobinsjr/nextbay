// challenge 5 — register page.
// same pattern as login: server action as form action.
// on submit: registerAction calls darkbay register, redirects to login on success.
import { registerAction } from "@/lib/authActions";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 max-w-md mx-auto flex flex-col justify-center">
      <h1 className="text-2xl font-bold uppercase tracking-tight mb-6">
        Request <span className="text-red-500 font-mono">Entry</span>
      </h1>

      {/* server action. registerAction creates the user on darkbay, redirects to /login. */}
      <form action={registerAction}>
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs uppercase font-mono text-neutral-400">
              Username
            </label>
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
            Register
          </Button>
        </div>
      </form>

      <p className="text-xs text-neutral-500 mt-6 text-center">
        Already have access?{" "}
        <a href="/login" className="text-red-400 hover:underline">Login</a>
      </p>
    </main>
  );
}
