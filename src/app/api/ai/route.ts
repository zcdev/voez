// app/api/chat/route.ts
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const response = await client.chat.completions.create({
            model: "gpt-5.4-nano",
            messages,
        });

        console.log("response", response);

        return NextResponse.json({
            reply: response.choices[0].message,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}