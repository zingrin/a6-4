export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { mentorService } from "@/services/mentor.service";
import MentorCourseTable from "@/components/modules/mentor/MentorCourseTable";

export default async function MentorCoursesPage() {
  const { data } = await mentorService.listAssignedCourses({});

  // Response shape: { success, data: { data: Course[], pagination: {...} } }
  const courses = Array.isArray(data?.data?.data) ? data.data.data : [];

  return (
    <div className="space-y-6">
      <DashPageHeader
        title="Assigned Programs"
        description="Manage the courses you are currently instructing across the ecosystem."
      />

      <MentorCourseTable courses={courses} />
    </div>
  );
}
