export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { mentorService } from "@/services/mentor.service";
import MentorProfileForm from "@/components/modules/mentor/MentorProfileForm";

export default async function MentorSettingsPage() {
  const { data, error } = await mentorService.getOverview(); // Wait, I added getMyProfile
  // Let's use getMyProfile
  const profileRes = await mentorService.getMyProfile();
  const profile = profileRes.data?.data;

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Unable to fetch profile settings. Please check your connection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashPageHeader
        title="Account Settings"
        description="Refine your professional instructional presence and pedagogical identity."
      />

      <MentorProfileForm initialData={profile} />
    </div>
  );
}
