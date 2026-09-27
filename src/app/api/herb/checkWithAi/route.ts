import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { config } from "@/config"

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

    try {
        const response = await axios.post(API, { foodName });
        console.log("Response from AI check:", response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error checking with ai:", error);
        return NextResponse.json({ error: "Failed to check with ai" }, { status: 500 });
    }
}
