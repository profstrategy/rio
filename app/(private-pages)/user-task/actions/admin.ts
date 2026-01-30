"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const rewardPoints = parseInt(formData.get("points") as string);
  const category = formData.get("category") as string;
  const actionUrl = formData.get("url") as string;

  await prisma.task.create({
    data: {
      title,
      description,
      rewardPoints,
      category,
      actionUrl,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/dashboard/tasks"); // Update the user view instantly
}

export async function deleteTask(formData: FormData) {
  const id = formData.get("id") as string;

  // We must delete completions first due to foreign key constraints
  await prisma.taskCompletion.deleteMany({
    where: { taskId: id }
  });

  await prisma.task.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/dashboard/tasks");
}


export async function deleteUser(formData: FormData) {
  const id = formData.get("id") as string;

  // 1. Delete all their task completions
  await prisma.taskCompletion.deleteMany({
    where: { userId: id }
  });

  // 2. Delete all their referrals (where they are the referrer)
  await prisma.referral.deleteMany({
    where: { referrerId: id }
  });

  // 3. Delete the referral record where they were referred
  await prisma.referral.deleteMany({
    where: { referredId: id }
  });

  // 4. Finally, delete the user
  await prisma.user.delete({
    where: { id }
  });

  revalidatePath("/admin/users");
}