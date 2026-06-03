export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { mentorService } from "@/services/mentor.service";
import MentorStudentTable from "@/components/modules/mentor/MentorStudentTable";

export default async function MentorRostersPage() {
  const { data } = await mentorService.getStudents({});

  // Response shape: { success, data: { data: Enrollment[], pagination: {...} } }
  const enrollments = Array.isArray(data?.data?.data) ? data.data.data : [];

  return (
    <div className="space-y-6">
      <DashPageHeader
        title="Student Rosters"
        description="Unified view of all students enrolled in your instructional programs."
      />

      <MentorStudentTable enrollments={enrollments} />
    </div>
  );
}
