export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { mentorService } from "@/services/mentor.service";
import { userService } from "@/services/user.service";
import StatCards from "@/components/modules/mentor/StatCards";
import MentorCharts from "@/components/modules/mentor/MentorCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Star, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function MentorDashboard() {
  const [sessionRes, overviewRes] = await Promise.all([
    userService.getSession(),
    mentorService.getOverview(),
  ]);

  const user = sessionRes.data?.user;
  const overview = overviewRes.data?.data;

  if (!overview) {
      return (
          <div className="flex items-center justify-center min-h-[400px]">
              <p className="text-muted-foreground">Unable to load dashboard data. Please try again later.</p>
          </div>
      );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashPageHeader
          title={`Welcome back, ${user?.name.split(" ")[0]}!`}
          description="Here is your instructional impact and student growth overview."
        />
        <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold border border-indigo-500/20 animate-pulse">
          <Sparkles className="h-4 w-4" />
          Instructional Mode
        </div>
      </div>

      <StatCards stats={overview.stats} />

      <MentorCharts overview={overview} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        {/* Recent Student Activity */}
        <Card className="lg:col-span-7 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-500" />
              Recent Enrollments
            </CardTitle>
            <Link href="/mentor/rosters" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium bg-primary/5 px-3 py-1.5 rounded-md transition-all">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {overview.recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">No recent enrollments found.</p>
            ) : (
                <div className="space-y-4">
                    {overview.recentActivity.map((activity: any) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-muted/30 rounded-xl transition-colors">
                            <Avatar className="h-10 w-10 border-2 border-primary/10">
                                <AvatarImage src={activity.student.image || undefined} />
                                <AvatarFallback>{activity.student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold truncate">{activity.student.name}</h4>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                    Joined: {activity.course.title}
                                </p>
                            </div>
                            <div className="text-[10px] text-muted-foreground font-semibold">
                                {new Date(activity.enrolledAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </CardContent>
        </Card>

        {/* Top Performing Courses */}
        <Card className="lg:col-span-5 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Popular Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {overview.topCourses.map((c: any, i: number) => (
                    <div key={c.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-xl">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-primary/30 w-4">0{i+1}</span>
                            <span className="text-sm font-bold tracking-tight truncate max-w-[180px]">{c.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black">
                            <Users className="h-3 w-3" />
                            {c.enrollments}
                        </div>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
