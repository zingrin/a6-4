export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { courseService } from "@/services/course.service";
import { instituteService } from "@/services/institute.service";
import { categoryService } from "@/services/category.service";
import CourseTable from "@/components/modules/institute/CourseTable";
import CreateCourseModal from "@/components/modules/institute/CreateCourseModal";

export default async function CourseManagementPage() {
  const { data, error } = await courseService.getInstituteCourses({});

  // Response shape: { success, data: { data: Course[], pagination: {...} } }
  const courses = Array.isArray(data?.data?.data) ? data.data.data : [];

  const mentorsRes = await instituteService.listMentors({});
  const mentors = Array.isArray(mentorsRes.data?.data?.data) ? mentorsRes.data.data.data : [];

  const categoriesRes = await categoryService.getAllCategories();
  const categories = Array.isArray(categoriesRes.data?.data) ? categoriesRes.data.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashPageHeader
          title="My Courses"
          description="Manage your institute's catalog and track performance."
        />
        <CreateCourseModal mentors={mentors} categories={categories} />
      </div>

      <CourseTable courses={courses} mentors={mentors} categories={categories} />
    </div>
  );
}
