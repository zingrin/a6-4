export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import StudentDashboardCharts from "@/components/modules/student/DashboardCharts";
import StudentStatCards from "@/components/modules/student/StatCards";

export default async function StudentDashboard() {
  const [userRes, statsRes] = await Promise.all([
    userService.getSession(),
    userService.getStudentStats(),
  ]);

  // user safe
  const user = userRes?.data?.user;

  // stats safe default (IMPORTANT)
  const stats = statsRes?.data?.data ?? {
    recentEnrollments: [],
    upcomingBookings: [],
    spendingTrend: [],
  };

  const firstName = user?.name?.split(" ")?.[0] ?? "Student";

  return (
    <div className="space-y-8 pb-10">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashPageHeader
          title={`Welcome back, ${firstName}!`}
          description="Track your progress and manage your learning journey"
        />
      </div>

      {/* stat cards */}
      <StudentStatCards stats={stats} />

      {/* charts (only if data exists) */}
      {stats?.spendingTrend?.length > 0 && <StudentDashboardCharts />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        {/* recent enrollments */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>

          <CardContent>
            {/* empty state */}
            {(stats?.recentEnrollments?.length ?? 0) === 0 ? (
              <div className="p-10 text-center border border-dashed rounded-xl">
                <h3 className="font-semibold">No enrollments yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Start learning by joining a course
                </p>

                <Link href="/courses">
                  <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm">
                    Browse Courses
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {stats?.recentEnrollments?.map((enrollment: any) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-4 border rounded-xl"
                  >
                    {/* course info */}
                    <div>
                      <p className="font-semibold text-sm">
                        {enrollment.course?.title}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {enrollment.course?.institute?.name}
                      </p>
                    </div>

                    {/* action */}
                    <Link
                      href="/dashboard/courses"
                      className="text-xs font-bold text-blue-600"
                    >
                      Continue
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* right panel */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Accelerator</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl">
              <h4 className="font-bold">Power Up</h4>

              <p className="text-xs opacity-80 mt-2">
                Book mentor sessions and improve faster
              </p>

              <Link
                href="/tutors"
                className="block mt-3 bg-white text-indigo-700 text-center py-2 rounded-lg text-xs font-bold"
              >
                Book Mentor
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
