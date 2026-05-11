export const dynamic = "force-dynamic";

import DashPageHeader from '@/components/layout/DashPageHeader'
import CourseCard from "@/components/modules/course/coursePage/CourseCard";
import { getEnrolledCoursesAction } from "@/actions/course.action"

export default async function StudentCoursesPage() {
  const result = await getEnrolledCoursesAction();
  
  // The API returns { success: true, data: { data: [...], pagination: {...} } } based on standard parsing,
  // or maybe it's just the direct prisma payload for enrolled courses. Let's safely access it.
  const enrollments = result?.data?.data?.data || result?.data?.data || [];

  return (
    <div className="space-y-6">
      <DashPageHeader 
        title="My Courses" 
        description="View and continue managing the courses you are enrolled in."
      />

      {enrollments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-secondary/20">
          <p className="text-muted-foreground text-center">You haven't enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrollments.map((enrollment: any) => {
             const course = enrollment.course;
             return <CourseCard key={course.id} course={course} />
          })}
        </div>
      )}
    </div>
  )
}
