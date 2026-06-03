export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { instituteService } from "@/services/institute.service";
import StudentTable from "@/components/modules/institute/StudentTable";

export default async function InstituteStudentsPage() {
  const { data } = await instituteService.listStudents({});

  // Response shape: { success, data: { data: Enrollment[], pagination: {...} } }
  const enrollments = Array.isArray(data?.data?.data) ? data.data.data : [];

  return (
    <div className="space-y-6">
      <DashPageHeader
        title="Student Community"
        description="Monitor student enrollments and academic engagement across your institute."
      />

      <StudentTable enrollments={enrollments} />
    </div>
  );
}
