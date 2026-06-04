"use server"

import { bookingService } from "@/services/booking.service";
import { reviewService } from "@/services/review.service";
import { tutorService } from "@/services/tutor.service";
import { CreateBookingPayload, LeaveReviewPayload } from "@/types";
import { updateTag } from "next/cache";

export const getTutorByIdAction = async (tutorId : string) => {
    const res = await tutorService.getTutorById(tutorId);
    return res
}
export const createBookingAction = async (data : CreateBookingPayload) => {
    const res = await bookingService.createBooking(data);
    return res
}
export const leaveReviewAction = async (data : LeaveReviewPayload) => {
    const res = await reviewService.createReview(data);
    updateTag("booking")
    return res
}
