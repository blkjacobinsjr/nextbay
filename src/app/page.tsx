// Challenge 4 — Styled Auction List page using Radix/Nova Shadcn UI components.
// Uses Card, Button, and Input/Select for filters.
import Link from "next/link";
import { getAuctions } from "@/lib/auctionsService";
import type { AuctionStatus } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SearchParams = {
  page?: string;
  status?: string;
  "min-price"?: string;
  "max-price"?: string;
};

function withPage(sp: SearchParams, page: number): string {
  const next = new URLSearchParams();
  if (sp.status) next.set("status", sp.status);
  if (sp["min-price"]) next.set("min-price", sp["min-price"]);
  if (sp["max-price"]) next.set("max-price", sp["max-price"]);
  next.set("page", String(page));
  const qs = next.toString();
  return qs ? `/?${qs}` : "/";
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const status = (sp.status as AuctionStatus | undefined) ?? undefined;
  const minPrice = sp["min-price"] ? Number(sp["min-price"]) : undefined;
  const maxPrice = sp["max-price"] ? Number(sp["max-price"]) : undefined;

  const { data: auctions, meta } = await getAuctions({
    page,
    status,
    "min-price": minPrice,
    "max-price": maxPrice,
    limit: 9, // Grid friendly 3x3 layout
  });

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <header className="flex justify-between items-end border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-50 uppercase">
            NextBay <span className="text-red-500 font-mono text-base">.API</span>
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Browse live black-market listings · <span className="font-mono text-red-400">{meta.total}</span> active items
          </p>
        </div>
        <Link href="/auctions/new">
          <Button variant="default" className="bg-red-600 text-white hover:bg-red-700 uppercase font-mono tracking-wider text-xs px-4 py-2">
            + Create Auction
          </Button>
        </Link>
      </header>

      {/* FILTER BAR (Server GET form — simple URL state) */}
      <form method="get" className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-neutral-900/50 p-4 border border-neutral-800 rounded-xl">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="text-xs uppercase font-mono text-neutral-400">
            Lifecycle
          </label>
          <select
            id="status"
            name="status"
            defaultValue={sp.status ?? ""}
            className="h-8 rounded-lg border border-neutral-800 bg-neutral-950 px-2 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="">All listings</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="min-price" className="text-xs uppercase font-mono text-neutral-400">
            Min Price (€)
          </label>
          <input
            type="number"
            id="min-price"
            name="min-price"
            placeholder="0"
            defaultValue={sp["min-price"] ?? ""}
            className="h-8 rounded-lg border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="max-price" className="text-xs uppercase font-mono text-neutral-400">
            Max Price (€)
          </label>
          <input
            type="number"
            id="max-price"
            name="max-price"
            placeholder="99999"
            defaultValue={sp["max-price"] ?? ""}
            className="h-8 rounded-lg border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div className="flex items-end">
          <Button type="submit" variant="secondary" className="w-full h-8 uppercase font-mono text-xs border border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white">
            Apply Filters
          </Button>
        </div>
      </form>

      {/* AUCTION GRID */}
      {auctions.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-neutral-800 rounded-xl">
          <p className="text-neutral-500 font-mono text-sm">NO CONTRABAND FOUND MATCHING YOUR CRITERIA.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((a) => (
            <Card key={a.id} className="border-neutral-800 bg-neutral-950 flex flex-col justify-between hover:border-neutral-700 transition group relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[10px] uppercase font-mono font-extrabold px-2 py-0.5 rounded ${
                    a.status === "open" ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/50" : "bg-neutral-900 text-neutral-400 border border-neutral-800"
                  }`}>
                    {a.status}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">@{a.seller}</span>
                </div>
                <CardTitle className="text-lg font-bold text-neutral-200 group-hover:text-red-500 transition mt-2">
                  <Link href={`/auctions/${a.id}`} className="focus:outline-none after:absolute after:inset-0">
                    {a.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-xs text-neutral-400 line-clamp-2 mt-1">
                  {a.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-4">
                <div className="flex justify-between items-baseline border-t border-neutral-900 pt-4 mt-2">
                  <div className="text-xs text-neutral-500 uppercase font-mono">Current Bid</div>
                  <div className="text-xl font-black text-neutral-200 font-mono">€{a.currentPrice}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {meta.totalPages > 1 && (
        <nav className="flex justify-between items-center pt-6 border-t border-neutral-900">
          {page > 1 ? (
            <Link href={withPage(sp, page - 1)}>
              <Button variant="outline" size="sm" className="font-mono text-xs uppercase text-neutral-400 border-neutral-800 bg-neutral-950 hover:bg-neutral-900 hover:text-white">
                &larr; Prev
              </Button>
            </Link>
          ) : (
            <div className="w-[74px]" /> // Placeholder for alignment
          )}
          <span className="text-xs font-mono text-neutral-500">
            Page {meta.page} of {meta.totalPages}
          </span>
          {page < meta.totalPages ? (
            <Link href={withPage(sp, page + 1)}>
              <Button variant="outline" size="sm" className="font-mono text-xs uppercase text-neutral-400 border-neutral-800 bg-neutral-950 hover:bg-neutral-900 hover:text-white">
                Next &rarr;
              </Button>
            </Link>
          ) : (
            <div className="w-[74px]" />
          )}
        </nav>
      )}
    </main>
  );
}
