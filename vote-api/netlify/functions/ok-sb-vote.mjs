// Vote tally for the OK SB page. GET returns the counts, POST {choice:0-3} adds one vote.
// The page only ever shows percentages, never the raw counts.
import { getStore } from "@netlify/blobs";

const CHOICES = 4;
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
  "cache-control": "no-store",
  "content-type": "application/json",
};

export default async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

  const store = getStore("ok-sb-votes");
  let counts = (await store.get("tally", { type: "json" })) || [];
  counts = Array.from({ length: CHOICES }, (_, i) => Number(counts[i]) || 0);

  if (req.method === "POST") {
    let choice = -1;
    try {
      choice = Number(JSON.parse(await req.text()).choice);
    } catch (e) {}
    if (!Number.isInteger(choice) || choice < 0 || choice >= CHOICES) {
      return new Response(JSON.stringify({ error: "bad choice" }), { status: 400, headers: CORS });
    }
    counts[choice] += 1;
    await store.setJSON("tally", counts);
  } else if (req.method !== "GET") {
    return new Response(null, { status: 405, headers: CORS });
  }

  return new Response(JSON.stringify({ counts }), { status: 200, headers: CORS });
};

export const config = { path: "/api/ok-sb-vote" };
