import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const createBookingPaymentSession = async (bookingId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/payments/booking/${bookingId}`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.message };
    }

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || "Failed to create payment session",
    };
  }
};

const createCoursePaymentSession = async (courseId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/payments/course/${courseId}`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.message };
    }

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || "Failed to create payment session",
    };
  }
};

const getMyPayments = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/payments/me`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: {
        tags: ["payment-history"],
      },
    });

    const data = await res.json();

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error?.message || "Something went wrong" },
    };
  }
};

const verifyPaymentSession = async (sessionId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/payments/verify/${sessionId}`, {
      method: "GET",
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    });

    const data = await res.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.message || "Verification failed" };
  }
};

const getTutorPayments = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/payments/tutor`, {
      method: "GET",
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
      next: { tags: ["tutor-payments"] },
    });

    const data = await res.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error?.message || "Failed to load tutor payments" } };
  }
};

const listAllPayments = async (params?: any) => {
  try {
    const url = new URL(`${API_URL}/api/payments`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value as string);
        }
      });
    }

    const cookieStore = await cookies();

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
      next: { tags: ["admin-payments"] },
    });

    const data = await res.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error?.message || "Failed to load admin payments" } };
  }
};

export const paymentService = {
  createBookingPaymentSession,
  createCoursePaymentSession,
  getMyPayments,
  verifyPaymentSession,
  getTutorPayments,
  listAllPayments,
};
