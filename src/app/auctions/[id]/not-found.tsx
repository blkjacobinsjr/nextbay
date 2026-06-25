// 404 boundary for the auction detail route.
// triggered by notfound() in [id]/page.tsx when darkbay returns 404.
// this means: the uuid was valid format, but no auction with that id exists in the db.
// expected absence = calm page. different from error.tsx (unexpected failure).
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 max-w-md mx-auto text-center space-y-4 flex flex-col justify-center">
      <h1 className="text-2xl font-bold uppercase">Listing not found</h1>
      <p className="text-neutral-500 text-sm">
        This item doesn&apos;t exist or was removed from the market.
      </p>
      <Link href="/" className="text-red-400 hover:underline text-sm">
        &larr; Back to listings
      </Link>
    </main>
  );
}
