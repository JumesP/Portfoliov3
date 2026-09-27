import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { config } from "@/env"

/**
 * Stores contact information to DynamoDB
 */
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { foodName } = body;

    if (!foodName) {
        return NextResponse.json({ error: "Missing foodName field" }, { status: 400 });
    }

    const API = `${config.callAi}`;
    const payload = {
        "model": "micro",
        "prompt": `Can a hamster eat "${foodName}"? Answer with strict JSON only, no other text: {"name": string, "isSafe": boolean, "amount": string, "frequency": string, "reason": string}`
    }

    try {
        const response = await axios.post(API, payload);

        if (response.data && response.data.isSafe) {
            if (response.data.isSafe === "yes" || response.data.isSafe === "true") {
                response.data.isSafe = true;
            } else if (response.data.isSafe === "no" || response.data.isSafe === "false") {
                response.data.isSafe = false;
            }
        }

        console.log("Response from AI check:", response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error checking with ai:", error);
        return NextResponse.json({ error: "Failed to check with ai" }, { status: 500 });
    }
}
