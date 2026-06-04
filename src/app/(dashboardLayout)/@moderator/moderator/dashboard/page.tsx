export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { userService } from "@/services/user.service";
import UsersTable from "@/components/modules/admin/UsersTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, GraduationCap, BookOpen } from "lucide-react";

export default async function ModeratorDashboard() {
  const [sessionRes, usersRes] = await Promise.all([
    userService.getSession(),
    userService.listUsers({ page: 1, limit: 10 }),
  ]);

  const user = sessionRes.data?.user;
  const usersData = usersRes.data?.data;
  const users = usersData?.users || [];

  return (
    <div className="space-y-6">
      <DashPageHeader
        title={`Moderator Panel`}
        description={`Logged in as ${user?.name}. You have read access to platform activity.`}
      />

      {/* Info Banner */}
      <div className="flex items-center gap-3 p-4 bg-muted border rounded-lg text-sm text-muted-foreground">
        <Shield className="h-5 w-5 shrink-0" />
        <p>
          As a Moderator, you can monitor users and report activity. To take
          restrictive action (e.g., ban users), please contact an Admin.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData?.total ?? "—"}</div>
            <p className="text-xs text-muted-foreground">Registered platform accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u: any) => u.role === "STUDENT").length}
            </div>
            <p className="text-xs text-muted-foreground">On this page</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tutors</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u: any) => u.role === "TUTOR").length}
            </div>
            <p className="text-xs text-muted-foreground">On this page</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table (view-only) */}
      <Card>
        <CardHeader>
          <CardTitle>User Access Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <UsersTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
