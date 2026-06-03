"use server";

import { mentorService } from "@/services/mentor.service";
import { revalidatePath } from "next/cache";

export const updateMentorProfileAction = async (data: any) => {
  const res = await mentorService.updateProfile(data);
  revalidatePath("/mentor/dashboard");
  revalidatePath("/mentor/settings");
  return res;
};
