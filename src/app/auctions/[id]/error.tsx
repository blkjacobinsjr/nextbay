// error boundary — catches unexpected failures.
// triggered when the service layer throws (not when it returns null).
// cases: bad uuid format (backend 400 from parseuuidpipe), network errors, 500s.
// must be a client component ("use client") because it uses the reset() callback.
"use client";

export default function Error({
  error,
  reset,
}: {
  // error = the thrown error object. has a .message and optional .digest (for sentry).
  error: Error & { digest?: string };
  // reset = next.js function to retry rendering the route segment.
  // useful if the error was transient (network blip).
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 max-w-md mx-auto text-center space-y-4 flex flex-col justify-center">
      <h1 className="text-2xl font-bold uppercase">System Error</h1>
      <p className="text-neutral-500 text-sm">
        {error.message || "Unexpected error loading the listing."}
      </p>
      {/* retry button — calls reset(), which re-renders the route segment. */}
      <button
        onClick={reset}
        className="px-4 py-2 border border-neutral-800 rounded-lg hover:bg-neutral-900 text-sm font-mono uppercase"
      >
        Retry
      </button>
    </main>
  );
}
