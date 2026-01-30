"use server";

import prisma from "@/lib/prisma";

export async function getLeaderboard() {
  // Fetch top 50 users sorted by dreamPoints
  const leaderboard = await prisma.user.findMany({
    orderBy: {
      dreamPoints: 'desc',
    },
    take: 50,
    select: {
      id: true,
      username: true,
      avatarUrl: true,
      dreamPoints: true,
      currentLevel: true,
      twitterId: true, // Used to verify ownership if needed
    },
  });

  return leaderboard;
}