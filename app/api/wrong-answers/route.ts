import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

    const wrongAnswers = await prisma.wrongAnswer.findMany({
        where: { userId, isCorrected: false },
        include: { word: true },
        orderBy: { lastTriedAt: "desc" },
    });

    return NextResponse.json(wrongAnswers);
} 