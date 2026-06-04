import { env } from "@/env";
import { AvailabilityData } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const availabilityService = {
  getAvailabilities: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/availability`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: {
          tags: ["availabilities"],
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
  },

    createAvailability: async function (
    data: Partial<AvailabilityData>,
  ) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/api/availability/create`,
        {
          method: "POST",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const resData = await res.json();

      if (!resData.success) {
        return { data: resData, error: resData.message };
      }

      return { data: resData, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateAvailability: async function (
    data: Partial<AvailabilityData>,
    availabilityId: string,
  ) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/api/availability/update/${availabilityId}`,
        {
          method: "PUT",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const resData = await res.json();

      if (!resData.success) {
        return { data: resData, error: resData.message };
      }

      return { data: resData, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  deleteAvailability: async function (availabilityId: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/api/availability/delete/${availabilityId}`,
        {
          method: "DELETE",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();

      if (!data.success) {
        return { data: data, error: data.message };
      }

      return { data: data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
