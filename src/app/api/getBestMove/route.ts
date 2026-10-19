import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { config } from "@/env"

/**
 * Stores contact information to DynamoDB
 */
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { fen } = body;

    if (!fen) {
        return NextResponse.json({ error: "Missing fen field" }, { status: 400 });
    }

    const API = `${config.getBestMove}`;
    const payload = {
        "fen": fen,
        "depth": 3,
    }

    try {
        const response = await axios.post(API, payload);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error checking with ai:", error);
        return NextResponse.json({ error: "Failed to check with ai" }, { status: 500 });
    }
}
