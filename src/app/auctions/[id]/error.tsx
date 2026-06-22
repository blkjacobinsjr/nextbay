// Error boundary (client component — required). Catches unexpected failures:
//   • Bad UUID (backend 400 from ParseUUIDPipe)
//   • Network errors, 500s, anything thrown from the server component.
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="p-8 max-w-md mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-gray-500 text-sm">
        {error.message || "Unexpected error loading the auction."}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 border rounded hover:bg-gray-50"
      >
        Try again
      </button>
    </main>
  );
}
