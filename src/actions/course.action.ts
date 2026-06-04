"use server"

import { courseService } from "@/services/course.service";
import { revalidatePath } from "next/cache";

export const createCourseAction = async (formData: FormData) => {
  const res = await courseService.createCourse(formData);
  revalidatePath("/institute/courses");
  return res;
};

export const updateCourseAction = async (courseId: string, formData: FormData) => {
  const res = await courseService.updateCourse(courseId, formData);
  revalidatePath("/institute/courses");
  return res;
};

export const deleteCourseAction = async (courseId: string) => {
  const res = await courseService.deleteCourse(courseId);
  revalidatePath("/institute/courses");
  return res;
};

export const getEnrolledCoursesAction = async (params?: any) => {
    return await courseService.getEnrolledCourses(params);
};
