"use server"

import { availabilityService } from "@/services/availability.service";
import { tutorService } from "@/services/tutor.service";
import { AvailabilityData, TutorProfileDashboard } from "@/types";
import { updateTag } from "next/cache";
import { revalidatePath } from "next/cache";

export const updateTutorProfileAction = async (updatedData : Partial<TutorProfileDashboard>, subjectIds : string[]) => {
    const res = await tutorService.updateTutorData(updatedData, subjectIds);
    revalidatePath("/profile");
    return res
}

export const createAvailabilityAction = async (data:Partial<AvailabilityData>) => {
    const res = await availabilityService.createAvailability(data)
    updateTag("availabilities")
    return res
}
export const updateAvailabilityAction = async (data:Partial<AvailabilityData>, availabilityId : string) => {
    const res = await availabilityService.updateAvailability(data, availabilityId)
    return res
}
export const deleteAvailabilityAction = async (availabilityId : string) => {
    const res = await availabilityService.deleteAvailability(availabilityId)
    updateTag("availabilities")
    return res
}