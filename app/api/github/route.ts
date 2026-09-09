import { NextResponse } from "next/server";
import { getGitHubMetrics } from "@/lib/github";

export async function GET() {
  try {
    return NextResponse.json(await getGitHubMetrics());
  } catch (error) {
    return NextResponse.json({ error: "Unable to reach GitHub", detail: error instanceof Error ? error.message : "Unknown error" }, { status: 502 });
  }
}
