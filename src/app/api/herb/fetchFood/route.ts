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

    // foodId is replace space with - and convert to lowercase
    // all special characters are already moved in the validator removed

    const foodId = foodName.replace(/\s+/g, '-').toLowerCase();
    const API = `${config.EatDB}/food/${foodId}`;

    try {
        const response = await axios.get(API,);
        console.log("Response from storing to db check:", response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error checking with db:", error);
        return NextResponse.json({ error: "Failed to check with db" }, { status: 500 });
    }
}
