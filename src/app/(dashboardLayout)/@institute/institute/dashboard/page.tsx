export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { instituteService } from "@/services/institute.service";
import { userService } from "@/services/user.service";
import StatCards from "@/components/modules/institute/StatCards";
import DashboardCharts from "@/components/modules/institute/DashboardCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function InstituteDashboardPage() {
  const [sessionRes, overviewRes] = await Promise.all([
    userService.getSession(),
    instituteService.getOverview(),
  ]);

  const user = sessionRes.data?.user;
  const overview = overviewRes.data?.data;

  // Fallback for new institutes with no data yet
  const stats = overview?.stats || {
    totalCourses: 0,
    totalMentors: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
  };

  const recentCourses = overview?.recentCourses || [];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashPageHeader
          title={`Institute Dashboard: ${user?.name}`}
          description="Track growth, manage staff, and monitor your educational impact."
        />
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20 animate-pulse">
          <Sparkles className="h-4 w-4" />
          Institute Growth Mode
        </div>
      </div>

      <StatCards stats={stats} />

      {overview && <DashboardCharts overview={overview} />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        <Card className="lg:col-span-8 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              Latest Offerings
            </CardTitle>
            <Link href="/institute/courses" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium bg-primary/5 px-3 py-1.5 rounded-md transition-all">
              Manage All <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 bg-muted/20 rounded-xl border border-dashed">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                   <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <h5 className="font-semibold">No courses created yet</h5>
                    <p className="text-sm text-muted-foreground">Start building your catalog to see insights here.</p>
                </div>
                <Link href="/institute/courses">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                        Create Your First Course
                    </button>
                </Link>
              </div>
            ) : (
                <div className="space-y-3">
                    {recentCourses.map((course: any) => (
                        <div key={course.id} className="group flex items-center gap-4 p-4 border border-transparent hover:border-border/50 bg-background/50 hover:bg-background/80 rounded-xl transition-all duration-300">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-indigo-500 shrink-0 group-hover:scale-110 transition-transform">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-bold truncate tracking-tight">{course.title}</h4>
                                    <Badge variant={course.isPublished ? "default" : "secondary"} className="text-[10px] px-1.5 h-4 font-bold uppercase tracking-tighter">
                                        {course.isPublished ? "Live" : "Draft"}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground font-medium">
                                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {course._count.enrollments} Students</span>
                                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                                    <span>{course.category?.name || "Uncategorized"}</span>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-sm font-black text-indigo-600 tracking-tight">${course.price}</div>
                                <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">{new Date(course.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Accelerator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                <h4 className="font-bold flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4" /> Ready to scale?
                </h4>
                <p className="text-xs text-white/80 leading-relaxed mb-4">
                    Expand your reach by inviting more expert mentors and launching new industry-focused programs.
                </p>
                <div className="flex flex-col gap-2">
                    <Link 
                        href="/institute/courses" 
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-indigo-700 rounded-xl text-xs font-bold hover:bg-white/90 transition-colors"
                    >
                        <PlusIcon className="h-4 w-4" /> Start New Program
                    </Link>
                </div>
            </div>

            <div className="space-y-2">
                <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Management</h5>
                <Link 
                    href="/institute/mentors" 
                    className="flex items-center justify-between p-4 bg-background/50 border border-transparent hover:border-border/50 hover:bg-background rounded-xl transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <User className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-tight">Staff Management</span>
                            <span className="text-[10px] text-muted-foreground font-semibold">Invite & track mentors</span>
                        </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                    href="/institute/courses" 
                    className="flex items-center justify-between p-4 bg-background/50 border border-transparent hover:border-border/50 hover:bg-background rounded-xl transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-tight">Course Catalog</span>
                            <span className="text-[10px] text-muted-foreground font-semibold">Organize curriculum</span>
                        </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PlusIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }
