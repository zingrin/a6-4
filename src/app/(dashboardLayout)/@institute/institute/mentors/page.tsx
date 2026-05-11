export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { instituteService } from "@/services/institute.service";
import MentorTable from "@/components/modules/institute/MentorTable";
import InviteMentorModal from "@/components/modules/institute/InviteMentorModal";

export default async function MentorManagementPage() {
  const { data, error } = await instituteService.listMentors({});

  // Response shape: { success, data: { data: MentorProfile[], pagination: {...} } }
  const mentors = Array.isArray(data?.data?.data) ? data.data.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashPageHeader
          title="Mentor Management"
          description="View and coordinate with your staff instructors."
        />
        <InviteMentorModal />
      </div>

      <MentorTable mentors={mentors} />
    </div>
  );
}
