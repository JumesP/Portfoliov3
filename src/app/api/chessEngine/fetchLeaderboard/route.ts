// app/api/leaderboard/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { config } from "@/env";

export const dynamic = "force-dynamic"; // don't cache the leaderboard

export async function GET() {
    const API = `${config.ChessEngineDB}/fetchChessLeaderboard`;

    try {
        const response = await axios.get(API);
        return NextResponse.json(response.data.leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return NextResponse.json(
            { error: "Failed to fetch leaderboard" },
            { status: 500 }
        );
    }
}
