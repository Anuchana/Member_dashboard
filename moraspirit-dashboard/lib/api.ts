import { Member, AvailabilityResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://task.moraspirit.com";

export async function fetchMembers(): Promise<Member[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/members`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.members || [];
  } catch (error) {
    console.error("Failed to fetch members:", error);
    throw error;
  }
}

export async function checkAvailability(
  msp_id: string,
  date: string
): Promise<AvailabilityResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/availability/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msp_id, date }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: AvailabilityResponse = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to check availability for ${msp_id} on ${date}:`, error);
    throw error;
  }
}
