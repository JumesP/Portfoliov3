import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { config } from "@/config"

/**
 * Stores contact information to DynamoDB
 */
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name) {
        return NextResponse.json({ error: "Missing name field" }, { status: 400 });
    }

    if (!email) {
        return NextResponse.json({ error: "Missing email field" }, { status: 400 });
    }

    if (!message) {
        return NextResponse.json({ error: "Missing message field" }, { status: 400 });
    }

    const API = `${config.contactMe}/storeContact`;

    try {
        const response = await axios.post(API, {
            name,
            email,
            subject,
            message
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error storing contact information:", error);
        return NextResponse.json({ error: "Failed to store contact information" }, { status: 500 });
    }
}
