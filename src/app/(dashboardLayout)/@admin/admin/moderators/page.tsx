export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { userService } from "@/services/user.service";
import ModeratorTable from "@/components/modules/admin/ModeratorTable";
import InviteModeratorModal from "@/components/modules/admin/InviteModeratorModal";

export default async function ModeratorManagementPage() {
  const { data, error } = await userService.listUsers({ role: "MODERATOR", limit: 50 });

  // Response shape: { success, data: { data: User[], pagination: {...} } }
  const moderators = Array.isArray(data?.data?.data) ? data.data.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashPageHeader
          title="Moderator Management"
          description="View and invite platform moderators."
        />
        <InviteModeratorModal />
      </div>

      <ModeratorTable moderators={moderators} />
    </div>
  );
}
