import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
    const { params } = context;
    const id = Number(params.id);
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    await prisma.wrongAnswer.update({
        where: { id },
        data: { isCorrected: true },
    });

    return NextResponse.json({ ok: true });
} 