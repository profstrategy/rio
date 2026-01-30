"use server";

import prisma from "@/lib/prisma";
import { getDashboardData } from "./user";
import { revalidatePath } from "next/cache";

// Helper: Get strictly the date part (YYYY-MM-DD) to avoid timezone issues
function getDateString(date: Date) {
  return date.toISOString().split('T')[0];
}

export async function getTasks() {
  const user = await getDashboardData();
  if (!user) return [];

  const tasks = await prisma.task.findMany({
    include: {
      completions: {
        where: { userId: user.id },
      },
    },
    orderBy: { rewardPoints: 'asc' }
  });

  return tasks.map((task) => {
    let isCompleted = false;

    if (task.completions.length > 0) {
        const completion = task.completions[0];
        
        if (task.category === 'Daily') {
            const completionDateStr = getDateString(new Date(completion.completedAt));
            const todayStr = getDateString(new Date());
            isCompleted = (completionDateStr === todayStr);
        } else {
            isCompleted = true;
        }
    }

    return { ...task, isCompleted };
  });
}

export async function claimTask(taskId: string) {
  const user = await getDashboardData();
  if (!user) return { error: "Unauthorized" };

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return { error: "Task not found" };

    const existing = await prisma.taskCompletion.findUnique({
      where: {
        userId_taskId: { userId: user.id, taskId },
      },
    });

    // --- DAILY TASK INTELLIGENT LOGIC ---
    if (task.category === "Daily") {
        
        let newStreak = 1; // Default: Reset to 1 if broken

        if (existing) {
            const lastDate = new Date(existing.completedAt);
            const today = new Date();
            
            // Check dates
            const lastDateStr = getDateString(lastDate);
            const todayStr = getDateString(today);
            
            // Get Yesterday String
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = getDateString(yesterday);

            // 1. If already done today, stop.
            if (lastDateStr === todayStr) {
                return { error: "Already claimed today" };
            }

            // 2. If done yesterday, CONTINUE streak
            if (lastDateStr === yesterdayStr) {
                newStreak = user.streakCount + 1;
            }
            // 3. If older than yesterday, it remains 1 (Reset)

            // Update the existing record
            await prisma.$transaction([
                prisma.taskCompletion.update({
                    where: { id: existing.id },
                    data: { completedAt: new Date() } // Mark as done NOW
                }),
                prisma.user.update({
                    where: { id: user.id },
                    data: { 
                        dreamPoints: { increment: task.rewardPoints },
                        streakCount: newStreak, // Set the calculated streak
                        lastLoginDate: new Date() 
                    }
                })
            ]);
            
            revalidatePath("/dashboard");
            revalidatePath("/dashboard/tasks");
            return { success: true };
        }
    } 
    
    else if (existing) {
        return { error: "Already claimed" };
    }

    // NEW RECORD (First time ever)
    await prisma.$transaction([
      prisma.taskCompletion.create({
        data: { userId: user.id, taskId },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { 
            dreamPoints: { increment: task.rewardPoints },
            // Only set streak if it's daily
            ...(task.category === 'Daily' ? { streakCount: 1 } : {}) 
        },
      }),
    ]);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/tasks");
    return { success: true };
    
  } catch (error) {
    console.error(error);
    return { error: "Failed to claim" };
  }
}