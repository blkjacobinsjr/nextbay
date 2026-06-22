// Proof page: confirms Challenge 1 end-to-end.
// Next.js server → auctionsService → DarkBay → render.
// Replaced by the real list page in Challenge 2.
import { getAuctions } from "@/lib/auctionsService";

export default async function Home() {
  const { data: auctions, meta } = await getAuctions();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">NextBay</h1>
      <p className="text-sm text-gray-500 mb-6">
        Connected to DarkBay · {meta.totalItems} auctions
      </p>
      <ul className="space-y-2">
        {auctions.map((a) => (
          <li key={a.id} className="p-3 border rounded">
            <div className="font-semibold">{a.title}</div>
            <div className="text-sm text-gray-500">
              {a.seller} · €{a.currentPrice} · {a.status}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
