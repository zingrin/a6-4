export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import StudentDashboardCharts from "@/components/modules/student/DashboardCharts";
import StudentStatCards from "@/components/modules/student/StatCards";

export default async function StudentDashboard() {
  const [userRes, statsRes] = await Promise.all([
    userService.getSession(),
    userService.getStudentStats(),
  ]);

  const user = userRes?.data?.user;

  const stats = statsRes?.data?.data ?? {
    recentEnrollments: [],
    upcomingBookings: [],
    totalCourses: 0,
    completedCourses: 0,
  };

  const recentEnrollments = stats.recentEnrollments ?? [];
  const upcomingBookings = stats.upcomingBookings ?? [];

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20 animate-pulse">
          <Sparkles className="h-4 w-4" />
          Learning Growth
        </div>
      </div>

      {/* CHARTS */}
      {stats && <StudentDashboardCharts stats={stats} />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        {/* RECENT ENROLLMENTS */}
        <Card className="lg:col-span-8 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              Recent Enrollments
            </CardTitle>

            <Link
              href="/dashboard/courses"
              className="text-xs text-primary hover:underline flex items-center gap-1 font-bold bg-primary/5 px-3 py-1.5 rounded-md"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>

          <CardContent>
            {recentEnrollments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 bg-muted/20 rounded-xl border border-dashed">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>

                <div>
                  <h5 className="font-semibold">No enrollments yet</h5>
                  <p className="text-sm text-muted-foreground">
                    Start your learning journey by exploring courses.
                  </p>
                </div>

                <Link href="/courses">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Browse Catalog
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentEnrollments.map((enrollment: any) => (
                  <div
                    key={enrollment.id}
                    className="group flex items-center gap-4 p-4 border border-transparent hover:border-border/50 bg-background/50 hover:bg-background/80 rounded-xl transition-all"
                  >
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-6 w-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold truncate">
                          {enrollment.course?.title ?? "Untitled Course"}
                        </h4>

                        <Badge variant="secondary" className="text-[10px]">
                          {enrollment.course?.category?.name ?? "General"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {enrollment.course?.institute?.name ?? "Institute"}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />

                        <span>
                          {enrollment.enrolledAt
                            ? new Date(
                                enrollment.enrolledAt,
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/dashboard/courses"
                      className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded"
                    >
                      Continue
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ACCELERATOR */}
        <Card className="lg:col-span-4 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Accelerator</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl text-white">
              <h4 className="font-bold flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4" />
                Power Up
              </h4>

              <p className="text-xs text-white/80 mb-4">
                Book a 1-on-1 session with an expert mentor.
              </p>

              <Link
                href="/tutors"
                className="block text-center py-2 bg-white text-indigo-700 rounded-xl text-xs font-bold"
              >
                <PlusCircle className="h-4 w-4 inline mr-1" />
                Book a Mentor
              </Link>
            </div>

            {/* UPCOMING BOOKINGS */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-black text-muted-foreground uppercase">
                Upcoming Sessions
              </h5>

              {upcomingBookings.length === 0 ? (
                <div className="p-4 border border-dashed rounded-xl text-center">
                  <p className="text-[11px] text-muted-foreground">
                    No sessions scheduled.
                  </p>
                </div>
              ) : (
                upcomingBookings.map((booking: any) => (
                  <Link
                    href="/dashboard/bookings"
                    key={booking.id}
                    className="flex items-center gap-3 p-3 bg-background/50 hover:bg-background rounded-xl"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={booking.tutor?.user?.image} />
                      <AvatarFallback>
                        {booking.tutor?.user?.name?.charAt(0) ?? "T"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold truncate">
                        {booking.subject?.name ?? "Session"}
                      </div>

                      <div className="text-[9px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {booking.availability?.day ?? ""},{" "}
                        {booking.availability?.startTime ?? ""}
                      </div>
                    </div>

                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </Link>
                ))
              )}
            </div>

            {/* QUICK ACCESS */}
            <div className="pt-2 border-t border-border/40">
              <h5 className="text-[10px] font-black text-muted-foreground uppercase mb-2">
                Quick Access
              </h5>

              <Link
                href="/dashboard/payments"
                className="flex items-center justify-between p-3 bg-background/50 hover:bg-background rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold">Payment History</span>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
