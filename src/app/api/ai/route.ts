import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { openai, DEFAULT_MODEL } from '@/app/lib/openai';

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "5 m"),
});

export async function POST(req: NextRequest) {
    try {

        const forwardedFor = req.headers.get("x-forwarded-for");

        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous";

        const { success, remaining, limit, reset } =
            await ratelimit.limit(ip);

        console.log({
            success,
            remaining,
            limit,
            reset,
        });

        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests.' },
                { status: 429 }
            );
        }

        const { messages } = await req.json();

        const response = await openai.responses.create({
            model: DEFAULT_MODEL,
            input: messages,
        });

        return NextResponse.json({
            reply: response.output_text,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}