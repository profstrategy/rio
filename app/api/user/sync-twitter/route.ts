import { authOptions } from "@/_lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    }

    try {
        const account = await prisma.account.findFirst({
            where: {
                userId: session.user.id,
                provider: 'twitter',
            }
        });

        if (!account) {
            return NextResponse.json({ error: "No Twitter account linked" }, { status: 400 })
        }

        prisma.user.update({
            where: { id: session.user.id },
            data: {
                twitterId: account.providerAccountId,
            }
        })

        return NextResponse.json({ message: 'Twitter connected successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}