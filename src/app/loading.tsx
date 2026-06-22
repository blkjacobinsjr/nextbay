// loading.tsx — Next.js auto-wraps the route in <Suspense fallback={...}>.
// Shows while getAuctions() is in flight. Replaces Challenge 1's implicit
// "nothing renders until done" with an explicit fallback.
export default function Loading() {
  return (
    <main className="p-8 max-w-3xl mx-auto space-y-6">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
      <ul className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="p-4 border rounded">
            <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse mt-2" />
          </li>
        ))}
      </ul>
    </main>
  );
}
