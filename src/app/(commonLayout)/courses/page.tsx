export const dynamic = "force-dynamic";

import CourseFilterSidebar from "@/components/modules/course/coursePage/CourseFilterSidebar";
import CourseCard from "@/components/modules/course/coursePage/CourseCard";
import PaginationControls from "@/components/ui/pagination-controls";
import { categoryService } from "@/services/category.service";
import { courseService } from "@/services/course.service";

interface CourseSearchParams {
  search?: string;
  categoryId?: string;
  level?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<CourseSearchParams>;
}) {
  const filters = await searchParams;

  const [coursesRes, categoriesRes] = await Promise.all([
    courseService.getPublicCourses({ ...filters }, { cache: "no-store" }),
    categoryService.getAllCategories(),
  ]);

  console.log(coursesRes)

  const courses = coursesRes?.data?.data?.data || [];
  const pagination = coursesRes?.data?.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  return (
    <div className="mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="flex-shrink-0">
          <CourseFilterSidebar categories={categoriesRes?.data?.data || []} />
        </div>

        {/* Right Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Available Courses</h1>
            <p className="text-muted-foreground text-sm">
              Found {pagination.total} course{pagination.total !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <CourseCard key={course.id} course={course} />
            ))}

            {courses.length === 0 && (
              <div className="col-span-full text-center py-20 border-2 border-dashed rounded-xl">
                <p className="text-muted-foreground">
                  No courses match your current filters.
                </p>
              </div>
            )}
          </div>

          <PaginationControls meta={pagination} />
        </div>
      </div>
    </div>
  );
}
