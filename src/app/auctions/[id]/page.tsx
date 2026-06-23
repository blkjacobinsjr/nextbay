// Challenge 4 — Styled Auction Detail page using Radix/Nova Shadcn UI components.
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuctionById, getOffersForAuction } from "@/lib/auctionsService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Params = { id: string };

export default async function AuctionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const auction = await getAuctionById(id);
  if (!auction) notFound();

  const offers = await getOffersForAuction(id);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 max-w-4xl mx-auto space-y-6">
      <Link href="/snippets" className="text-xs uppercase font-mono text-neutral-400 hover:text-white transition flex items-center gap-1">
        &larr; Back to list
      </Link>

      {/* TOP ROW: TITLE & METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT: TITLE & DESCRIPTION */}
        <div className="lg:col-span-2 space-y-6">
          <header className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] uppercase font-mono font-extrabold px-2 py-0.5 rounded ${
                auction.status === "open" ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/50" : "bg-neutral-900 text-neutral-400 border border-neutral-800"
              }`}>
                {auction.status}
              </span>
              <span className="text-xs font-mono text-neutral-500">Listed by @{auction.seller}</span>
            </div>
            <h1 className="text-3xl font-black text-neutral-50 uppercase tracking-tight">{auction.title}</h1>
          </header>

          <Card className="border-neutral-800 bg-neutral-900/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono uppercase text-neutral-500">Contraband Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">{auction.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: LIVE TELEMETRY CARD */}
        <Card className="border-neutral-800 bg-neutral-950 flex flex-col justify-between">
          <CardHeader className="pb-0">
            <CardTitle className="text-xs font-mono uppercase text-neutral-500 tracking-wider">Market Telemetry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-mono text-neutral-500 uppercase">Current Price</span>
              <span className="text-2xl font-black text-red-500 font-mono">€{auction.currentPrice}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-neutral-900 pt-3">
              <span className="text-xs font-mono text-neutral-500 uppercase">Starting Price</span>
              <span className="text-sm text-neutral-300 font-mono">€{auction.startingPrice}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-neutral-900 pt-3">
              <span className="text-xs font-mono text-neutral-500 uppercase">Auctions Ends</span>
              <span className="text-xs font-mono text-neutral-300">
                {new Date(auction.endDate).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            
            {/* Action placeholder (Challenge 6) */}
            <div className="pt-2">
              <Button disabled variant="outline" className="w-full text-xs font-mono uppercase border-neutral-800 bg-neutral-900 text-neutral-500">
                🔒 Bidding Requires Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BID HISTORY SECTION */}
      <section className="pt-6 border-t border-neutral-900 space-y-4">
        <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-200 font-heading">
          Bid Ledger <span className="font-mono text-sm text-neutral-500">({offers.length})</span>
        </h2>
        
        {offers.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-neutral-800 rounded-xl">
            <p className="text-xs font-mono text-neutral-500">NO TRANSACTION RECORDS FOUND IN LEDGER.</p>
          </div>
        ) : (
          <div className="overflow-hidden border border-neutral-800 rounded-xl bg-neutral-950/50">
            <ul className="divide-y divide-neutral-900">
              {offers.map((offer) => (
                <li
                  key={offer.id}
                  className="flex justify-between items-center p-4 text-xs font-mono hover:bg-neutral-900/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400">@{offer.bidder}</span>
                    <span className="text-neutral-600">|</span>
                    <span className="text-neutral-500">
                      {new Date(offer.createdAt).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <div className="font-black text-neutral-200">€{offer.amount}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
