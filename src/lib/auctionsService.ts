// the single server-side module that talks to darkbay.
// challenge 1: plain fetch. challenge 5: now uses fetchAPI (cookie→bearer).
// components call these functions — they never know darkbay exists.
import { fetchAPI } from "./fetchAPI";
import type { Auction, Offer, PaginatedAuctions } from "./types";

// list auctions with optional filters (page, status, min/max price).
// public route — no token needed. fetchAPI adds bearer only if a cookie exists.
export async function getAuctions(
  params: Record<string, string | number | undefined> = {},
): Promise<PaginatedAuctions> {
  const url = new URL(`${process.env.DARKBAY_API_URL}/auctions`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  // fetchAPI strips the base url (it adds its own), so we pass just the path + query.
  const path = url.pathname.replace("/auctions", "/auctions") + url.search;
  const res = await fetchAPI(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`getAuctions failed: ${res.status}`);
  return res.json();
}

// single auction by id. returns null on 404 (valid uuid, not in db).
// null triggers notFound() → not-found.tsx on the detail page.
export async function getAuctionById(id: string): Promise<Auction | null> {
  const res = await fetchAPI(`/auctions/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`getAuctionById failed: ${res.status}`);
  return res.json();
}

// bid history for one auction. nested restful route /auctions/:id/offers.
// public route — anyone can see who bid what.
export async function getOffersForAuction(auctionId: string): Promise<Offer[]> {
  const res = await fetchAPI(`/auctions/${auctionId}/offers`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`getOffersForAuction failed: ${res.status}`);
  return res.json();
}
