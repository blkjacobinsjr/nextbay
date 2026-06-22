// Triggered by notFound() in page.tsx — when DarkBay returns 404 for a
// valid UUID that doesn't exist in the database.
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8 max-w-md mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold">Auction not found</h1>
      <p className="text-gray-500">
        This listing doesn&apos;t exist or was removed.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to auctions
      </Link>
    </main>
  );
}
