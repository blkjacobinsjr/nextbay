// loading.tsx — next.js auto-wraps this route in <suspense fallback={<loading />}>.
// shows while getauctions() is in flight. replaces "blank screen" with a skeleton.
// this file's existence is what challenge 2 asks for. the name is the convention.
export default function Loading() {
  return (
    <main className="min-h-screen bg-neutral-950 p-8 max-w-5xl mx-auto space-y-8">
      {/* animate-pulse = the throbbing skeleton effect. no data, just shapes. */}
      <div className="h-8 w-40 bg-neutral-800 rounded animate-pulse" />
      {/* 9 placeholder cards = matches the grid (3x3). visual consistency with the real page. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="p-4 border border-neutral-800 rounded-xl">
            <div className="h-5 w-1/2 bg-neutral-800 rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-neutral-800 rounded animate-pulse mt-2" />
          </div>
        ))}
      </div>
    </main>
  );
}
