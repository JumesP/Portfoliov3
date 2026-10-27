import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { config } from "@/env"

/**
 * Stores chess win information to DynamoDB
 */
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { username, finalFen, gameHistory } = body;

    if (!username) {
        return NextResponse.json({ error: "Missing username field" }, { status: 400 });
    }

    if (!finalFen) {
        return NextResponse.json({ error: "Missing finalFen field" }, { status: 400 });
    }

    if (!gameHistory) {
        return NextResponse.json({ error: "Missing gameHistory field" }, { status: 400 });
    }

    const API = `${config.ChessEngineDB}/storeChessWin`;

    try {
        const response = await axios.post(API, {
            username,
            finalFen,
            gameHistory
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error storing chess game:", error);
        return NextResponse.json({ error: "Failed to store chess game" }, { status: 500 });
    }
}
