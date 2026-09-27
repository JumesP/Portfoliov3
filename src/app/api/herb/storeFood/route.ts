import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { config } from "@/env"

/**
 * Stores contact information to DynamoDB
 */
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { foodName, isSafe, amount, frequency, reason } = body;

    if (!foodName) {
        return NextResponse.json({ error: "Missing foodName field" }, { status: 400 });
    }

    if (isSafe === undefined || !amount || !frequency || !reason) {
        return NextResponse.json({ error: "Missing one or more required fields: canEat, amount, frequency, reason" }, { status: 400 });
    }

    const API = `${config.EatDB}/food`;
    const payload = {
        "name": foodName,
        "isSafe": isSafe,
        "amount": amount,
        "frequency": frequency,
        "reason": reason
    }

    try {
        const response = await axios.post(API, payload);
        console.log("Response from store/update check:", response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error storing/updating check:", error);
        return NextResponse.json({ error: "Error storing/updating check" }, { status: 500 });
    }
}
