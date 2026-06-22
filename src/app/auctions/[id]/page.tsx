// Challenge 3 — auction detail + bid history.
// Two failure modes, two boundaries:
//   • Bad UUID (400) → throws → caught by error.tsx
//   • Valid UUID, not found (404) → null → notFound() → not-found.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuctionById, getOffersForAuction } from "@/lib/auctionsService";

type Params = { id: string };

export default async function AuctionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const auction = await getAuctionById(id);
  if (!auction) notFound(); // 404 → renders not-found.tsx

  const offers = await getOffersForAuction(id);

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to auctions
      </Link>

      <header>
        <h1 className="text-3xl font-bold">{auction.title}</h1>
        <p className="text-gray-500 mt-1">by {auction.seller}</p>
      </header>

      <dl className="grid grid-cols-2 gap-4 p-4 border rounded">
        <div>
          <dt className="text-xs uppercase text-gray-500">Current price</dt>
          <dd className="text-xl font-semibold">€{auction.currentPrice}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-gray-500">Starting price</dt>
          <dd className="text-xl">€{auction.startingPrice}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-gray-500">Status</dt>
          <dd className="capitalize">{auction.status}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-gray-500">Ends</dt>
          <dd>
            {new Date(auction.endDate).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </dd>
        </div>
      </dl>

      <section>
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{auction.description}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Bid history ({offers.length})</h2>
        {offers.length === 0 ? (
          <p className="text-sm text-gray-500">No bids yet. Be the first.</p>
        ) : (
          <ul className="space-y-2">
            {offers.map((offer) => (
              <li
                key={offer.id}
                className="flex justify-between p-3 border rounded text-sm"
              >
                <span className="font-medium">{offer.bidder}</span>
                <span>€{offer.amount}</span>
                <span className="text-gray-500">
                  {new Date(offer.createdAt).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
