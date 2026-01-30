"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

export async function getDashboardData() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) return null;

  const user = session.user;

  // 1. Try to find the user in DB
  let dbUser = await prisma.user.findUnique({
    where: { twitterId: user.id },
  });

  // 2. IF NEW USER (or recently deleted) -> Create safely
  if (!dbUser) {
    try {
      const cookieStore = await cookies();
      const referralId = cookieStore.get("referral_code")?.value;
      
      // ATTEMPT CREATE
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          username: user.username || user.name,
          avatarUrl: user.avatarUrl,
          dreamPoints: 0,
        },
      });

      // If creation succeeded, Process Referral
      if (referralId && dbUser && referralId !== dbUser.id) {
        // Validate referrer exists
        const referrer = await prisma.user.findUnique({ 
          where: { id: referralId }
        });
        
        if (referrer) {
          // Use a separate try-catch for referrals to prevent blocking login
          try {
            await prisma.$transaction([
              prisma.referral.create({
                data: { referrerId: referrer.id, referredId: dbUser.id }
              }),
              prisma.user.update({
                where: { id: referrer.id },
                data: { dreamPoints: { increment: 100 } }
              })
            ]);
          } catch (refError) {
            console.error("Referral error (ignored):", refError);
          }
        }
      }

    } catch (error: any) {
      // RACE CONDITION CATCHER:
      // If the error code is P2002 (Unique constraint failed), it means 
      // the user was created by a parallel request 1ms ago.
      if (error.code === 'P2002') {
        dbUser = await prisma.user.findUnique({
          where: { twitterId: user.id },
        });
      } else {
        throw error; // If it's another error, actually crash
      }
    }
  } else {
    // EXISTING USER -> Just update details
    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        lastLoginDate: new Date(),
        username: user.username || user.name,
        avatarUrl: user.avatarUrl,
      }
    });
  }

  return dbUser;
}