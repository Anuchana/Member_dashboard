export interface Member {
  id: string; // e.g. "MSP001"
  name: string; // e.g. "Thisuka Kodithuwakku"
  role: string; // e.g. "CMO"
}

export interface MembersResponse {
  count: number;
  members: Member[];
}

export interface AvailabilityResponse {
  requested_date: string;
  id: string;
  name: string;
  role: string;
  status: "available" | "busy";
  reason: string;
}

export interface MemberAvailabilityStatus {
  status: "available" | "busy" | "loading" | "error";
  reason?: string;
  lastChecked?: string; // e.g., "Sep 17, 2026 01:24 AM"
  error?: string;
}

export type AvailabilityMap = Record<string, MemberAvailabilityStatus>;
