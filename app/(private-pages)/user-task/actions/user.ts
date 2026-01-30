"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function getDashboardData() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {} },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // 1. Try to find the user in DB
  let dbUser = await prisma.user.findUnique({
    where: { twitterId: user.id },
  });

  // 2. IF NEW USER (or recently deleted) -> Create safely
  if (!dbUser) {
    try {
        // Check for referral cookie
        const referralId = cookieStore.get("referral_code")?.value;
        
        // ATTEMPT CREATE
        dbUser = await prisma.user.create({
          data: {
            twitterId: user.id,
            username: user.user_metadata.user_name || user.user_metadata.full_name,
            avatarUrl: user.user_metadata.avatar_url,
            dreamPoints: 0,
          },
        });

        // If creation succeeded, Process Referral
        if (referralId && dbUser && referralId !== dbUser.id) {
           // Validate referrer exists
           const referrer = await prisma.user.findUnique({ where: { id: referralId }});
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
        username: user.user_metadata.user_name || user.user_metadata.full_name,
        avatarUrl: user.user_metadata.avatar_url,
      }
    });
  }

  return dbUser;
}