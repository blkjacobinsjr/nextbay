// Shared types — mirror DarkBay's response DTOs exactly.
// Source of truth: nextbay-backend/src/*/dto/*-response.dto.ts

export type AuctionStatus = "open" | "closed";

export type Auction = {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  endDate: string; // ISO date string over the wire
  createdAt: string;
  seller: string;
  status: AuctionStatus;
};

export type Offer = {
  id: string;
  amount: number;
  createdAt: string;
  bidder: string;
  auctionId: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedAuctions = {
  data: Auction[];
  meta: PaginationMeta;
};

export type AuthResponse = {
  access_token: string;
};

export type User = {
  id: string;
  username: string;
  createdAt: string;
};
