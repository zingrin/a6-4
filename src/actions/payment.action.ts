"use server";

import { paymentService } from "@/services/payment.service";

export const createBookingPaymentAction = async (bookingId: string) => {
  return await paymentService.createBookingPaymentSession(bookingId);
};

export const createCoursePaymentAction = async (courseId: string) => {
  return await paymentService.createCoursePaymentSession(courseId);
};

export const getMyPaymentsAction = async () => {
  return await paymentService.getMyPayments();
};

export const getTutorPaymentsAction = async () => {
  return await paymentService.getTutorPayments();
};
