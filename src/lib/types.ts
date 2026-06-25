// shared types — mirror darkbay's response dtos exactly.
// source of truth: nextbay-backend/src/*/dto/*-response.dto.ts
// if these don't match the backend, the app compiles but crashes at runtime.

// auction status is derived from the end date on the backend. open = not ended yet.
export type AuctionStatus = "open" | "closed";

export type Auction = {
  id: string;           // uuid — parseuuidpipe on the backend validates format
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number; // = highest bid, or starting price if no bids yet (backend computes)
  endDate: string;      // iso date string over the wire. backend derives status from this.
  createdAt: string;
  seller: string;       // username — derived from the jwt, never sent by the client
  status: AuctionStatus;
};

export type Offer = {
  id: string;
  amount: number;
  createdAt: string;
  bidder: string;       // username — derived from jwt, same as seller
  auctionId: string;
};

// ⚠️ starter shape: { page, limit, total, totalPages } — not the group's { totalItems, currentPage }
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

// ⚠️ starter uses "data" not "items" for the array key
export type PaginatedAuctions = {
  data: Auction[];
  meta: PaginationMeta;
};

// ⚠️ snake_case "access_token" — not camelCase. confirmed against auth-response.dto.ts.
// this is the shape darkbay returns from POST /auth/login.
export type AuthResponse = {
  access_token: string;
};

export type User = {
  id: string;
  username: string;
  createdAt: string;
};
