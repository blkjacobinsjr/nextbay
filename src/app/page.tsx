// Challenge 2 — auction list, server-rendered.
// URL state (searchParams) → service layer → HTML. No client fetching.
import Link from "next/link";
import { getAuctions } from "@/lib/auctionsService";
import type { AuctionStatus } from "@/lib/types";

type SearchParams = {
  page?: string;
  status?: string;
};

// Build a query string from current params + an override (used by pagination
// to preserve filters when moving between pages).
function withPage(sp: SearchParams, page: number): string {
  const next = new URLSearchParams();
  if (sp.status) next.set("status", sp.status);
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

  const { data: auctions, meta } = await getAuctions({
    page,
    status,
    limit: 10,
  });

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold">NextBay</h1>
        <p className="text-sm text-gray-500">{meta.total} auctions</p>
      </header>

      {/* Filter: plain GET form. Submission lands in the URL → server reads
          searchParams. This is the "URL state" answer to the design question. */}
      <form method="get" className="flex gap-2 items-center">
        <label htmlFor="status" className="text-sm">
          Status:
        </label>
        <select id="status" name="status" defaultValue={sp.status ?? ""}>
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <button type="submit" className="px-3 py-1 border rounded text-sm">
          Apply
        </button>
      </form>

      <ul className="space-y-3">
        {auctions.map((a) => (
          <li key={a.id} className="p-4 border rounded">
            <Link
              href={`/auctions/${a.id}`}
              className="font-semibold hover:underline"
            >
              {a.title}
            </Link>
            <div className="text-sm text-gray-500 mt-1">
              {a.seller} · €{a.currentPrice} · {a.status}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination: prev/next as links. Page lives in the URL. */}
      {meta.totalPages > 1 && (
        <nav className="flex gap-4 items-center pt-4 border-t">
          {page > 1 ? (
            <Link href={withPage(sp, page - 1)} className="hover:underline">
              ← Prev
            </Link>
          ) : (
            <span className="text-gray-300">← Prev</span>
          )}
          <span className="text-sm text-gray-500">
            Page {meta.page} of {meta.totalPages}
          </span>
          {page < meta.totalPages ? (
            <Link href={withPage(sp, page + 1)} className="hover:underline">
              Next →
            </Link>
          ) : (
            <span className="text-gray-300">Next →</span>
          )}
        </nav>
      )}
    </main>
  );
}
