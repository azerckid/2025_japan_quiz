import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function POST(req: NextRequest) {
    const { userId, wordId, hintUsed } = await req.json();

    // 이미 오답 기록이 있는지 확인
    const existing = await prisma.wrongAnswer.findFirst({
        where: { userId, wordId, isCorrected: false },
    });

    if (existing) {
        // hintUsed가 새로 true가 되면 업데이트
        if (hintUsed && !existing.hintUsed) {
            await prisma.wrongAnswer.update({
                where: { id: existing.id },
                data: { hintUsed: true, lastTriedAt: new Date() },
            });
        } else {
            await prisma.wrongAnswer.update({
                where: { id: existing.id },
                data: { lastTriedAt: new Date() },
            });
        }
        return NextResponse.json({ ok: true, updated: true });
    } else {
        // 새 오답 기록 생성
        await prisma.wrongAnswer.create({
            data: {
                userId,
                wordId,
                hintUsed: !!hintUsed,
            },
        });
        return NextResponse.json({ ok: true, created: true });
    }
} 