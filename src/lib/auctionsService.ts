// ============================================================================
// auctionsService — the SINGLE server-side module that talks to DarkBay.
// Challenge 1: plain fetch. Challenge 5 swaps fetch → fetchAPI (cookie→Bearer).
// ============================================================================

import type {
  Auction,
  Offer,
  PaginatedAuctions,
} from "./types";

const API_URL = process.env.DARKBAY_API_URL;

if (!API_URL) {
  throw new Error("DARKBAY_API_URL is not set. Check your .env file.");
}

// Public — list auctions with optional page/limit + filters (Challenge 2 / Bonus)
export async function getAuctions(
  params: Record<string, string | number | undefined> = {},
): Promise<PaginatedAuctions> {
  const url = new URL(`${API_URL}/auctions`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`getAuctions failed: ${res.status}`);
  return res.json();
}

// Public — single auction
export async function getAuctionById(id: string): Promise<Auction | null> {
  const res = await fetch(`${API_URL}/auctions/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`getAuctionById failed: ${res.status}`);
  return res.json();
}

// Public — bid history for one auction (nested route, RESTful)
export async function getOffersForAuction(auctionId: string): Promise<Offer[]> {
  const res = await fetch(
    `${API_URL}/auctions/${auctionId}/offers`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(`getOffersForAuction failed: ${res.status}`);
  return res.json();
}
